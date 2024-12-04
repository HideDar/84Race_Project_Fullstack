<template>
    <div v-if="club" class="page-ct2">
      <div class="container">
        <div class="row">
          <div class="col-md-3 clubs-list">
            <h1>{{ club.name }}</h1>
            <p>{{ club.description }}</p>
            <img :src="club.logo" alt="Club Image">
            <p>Số thành viên: {{ club.memberCount }}</p>
          </div>
          
          <div class="col-md-9" style="padding: 10px;">
            <div class="btn-group mb-3" role="group">
              <button 
                @click="activeTab = 'all'" 
                :class="['btn', activeTab === 'all' ? 'btn-primary' : 'btn-secondary']"
              >
                Thành viên 
              </button>
              <button 
                @click="activeTab = 'activities'" 
                :class="['btn', activeTab === 'activities' ? 'btn-primary' : 'btn-secondary']"
              >
                Hoạt động
              </button>
              <div class="bell" v-if="roleActive === 'admin'" style="margin-left: 10px;">
                <i @click="openModal" class="fas fa-bell"></i>
              </div>
            </div>
            <!-- Thành viên -->
            <table v-if="activeTab === 'all'" class="table table-bordered table-hover">
              <thead class="thead-light">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col">Điểm cống hiến</th>
                  <th scope="col">Ảnh đại diện</th>
                  <th v-if="roleActive === 'admin'" scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(users, index) in filteredMembers" :key="users.UserClub.id" >
                  <td>{{ index + 1 }}</td>
                  <td>{{ users.username }}</td>
                  <td>{{ users.UserClub.role }}</td>
                  <td>{{ users.point }}</td>
                  <td>
                    <img :src="users.profile_image" alt="Profile Image" style="width: 50px; height: 50px; border-radius: 50%;" />
                  </td>
                  <td v-if="roleActive === 'admin' && users.UserClub.role !== 'admin'">
                    <button class="btn btn-danger" @click="deleteMember(users.UserClub.id)">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Hoạt động -->
            <div v-if="activeTab === 'activities'">
              <h4>Đang diễn ra</h4>
              <swiper 
                v-if="filteredActivities.length > 0"
                :modules="modules"
                :slides-per-view="3"
                :space-between="50"
                navigation
                :pagination="{ clickable: true }"
                :scrollbar="{ draggable: true }"
              >
                <swiper-slide v-for="activity in filteredActivities" :key="activity.challenge_id">
                  <img class="race-post-img" :src="activity.img" alt="Challenge Image"> 
                  <div @click="showDetail(activity.challenge_id)" style="cursor: pointer;" class="ct">
                    <h3 class="title"><a>{{ activity.name }}</a></h3>
                    <time class="time">{{ activity.start_date }} đến {{ activity.end_date }}</time>
                  </div>
                </swiper-slide>
              </swiper>
              <p v-else>Không có hoạt động nào đang diễn ra.</p>
  
              <h4>Sắp diễn ra</h4>
              <swiper 
                v-if="upcomingActivities.length > 0"
                :modules="modules"
                :slides-per-view="3"
                :space-between="50"
                navigation
                :pagination="{ clickable: true }"
                :scrollbar="{ draggable: true }"
              >
                <swiper-slide v-for="activity in upcomingActivities" :key="activity.challenge_id">
                  <img class="race-post-img" :src="activity.img" alt="Challenge Image"> 
                  <div @click="showDetail(activity.challenge_id)" style="cursor: pointer;" class="ct">
                    <h3 class="title"><a>{{ activity.name }}</a></h3>
                    <time class="time">{{ activity.start_date }} đến {{ activity.end_date }}</time>
                  </div>
                </swiper-slide>
              </swiper>
              <p v-else>Không có hoạt động nào sắp diễn ra.</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal chờ phê duyệt thành viên -->
      <ShowModalPending :isVisible="isModalVisible" @close="closeModal" :pendingMembers="pendingMembers" />
    </div>
  </template>
  
  <script>
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
  import axios from 'axios';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { ref, onMounted } from 'vue';
  import { toast } from 'vue3-toastify';
  import ShowModalPending from './ShowModalPending.vue';  // Đảm bảo đường dẫn đúng
  
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  
  export default {
    name: 'ClubDetail',
    components: {
      Swiper,
      SwiperSlide,
      ShowModalPending
    },
    computed: {
      roleActive() {
        return this.role;
      },
      filteredMembers() {
        return this.club?.users.filter(user => user.UserClub.status === 'approved') || [];
      },
      filteredActivities() {
        const today = new Date();
        return this.activities.filter(activity => {
          const startDate = new Date(activity.start_date);
          const endDate = new Date(activity.end_date);
          return startDate <= today && endDate >= today; // Đang diễn ra
        });
      },
      upcomingActivities() {
        const today = new Date();
        return this.activities.filter(activity => {
          const startDate = new Date(activity.start_date);
          return startDate > today; // Sắp diễn ra
        });
      }
    },
    props: {
      id: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        activeTab: 'all',
        modules: [Navigation, Pagination, Scrollbar, A11y],
        isModalVisible: false 
      };
    },
    setup(props) {
      const club = ref(null);
      const activities = ref([]);
      const role = ref(null);
      const pendingMembers = ref([]);
      onMounted(async () => {
        try {
          const clubResponse = await axios.get(`http://localhost:3000/api/clubs/${props.id}`);
          club.value = clubResponse.data;
  
          const activitiesResponse = await axios.get(`http://localhost:3000/api/challenges/club/${props.id}`);
          activities.value = activitiesResponse.data;
  
          const roleResponse = await axios.get(`http://localhost:3000/api/clubs/${props.id}/user-role/${props.userId}`);
          role.value = roleResponse.data.role;
          
        
        } catch (error) {
          toast.error('Có lỗi xảy ra:', error);
        }
      });
  
      return { club, activities, role };
    },
    methods: {
      async openModal() {
        try {
          const pendingResponse = await axios.get(`http://localhost:3000/api/clubs/${this.id}/pending-members`);
          this.pendingMembers = pendingResponse.data;
          this.isModalVisible = true;
        } catch (error) {
          toast.error('Có lỗi xảy ra:', error);
        }
      },
      closeModal() {
        this.isModalVisible = false;
      },
      showDetail(challengeId) {
        this.$router.push(`/challenge/${challengeId}`);
      },
      async leaveClub() {
            try {
                await axios.delete(`http://localhost:3000/api/clubs/${this.id}/leave/${this.userId}`);
                const confirmLeave = confirm("Bạn có chắc chắn muốn rời câu lạc bộ?");
                if (!confirmLeave) {
                    return;
                }
                this.$router.push('/club');
                setTimeout(() => {
                    toast.success('Rời khỏi câu lạc bộ thành công!');
                }, 0);
            } catch (error) {
                toast.error('Có lỗi xảy ra:', error);
            }
        },
        async deleteMember(id) {
            try {
                await axios.delete(`http://localhost:3000/api/clubs/${id}`);
                setTimeout(() => {
                    toast.success('Xóa thành viên thành công!');
                }, 0);
                this.club.users = this.club.users.filter(user => user.UserClub.id !== id);
            } catch (error) {
                toast.error('Có lỗi xảy ra:', error);
            }
        }
    }
  };
  </script>
  
  <style scoped>
  /* Các style khác của bạn */
  </style>
  

<style scoped>
/* Swiper container */
.swiper {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Swiper slide */
.swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #ffffff;
    border-radius: 10px;
    padding: 15px;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.swiper-slide:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Swiper image */
.race-post-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
    max-height: 180px;
    object-fit: cover;
}

/* Slide title */
.ct h3.title {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 8px;
}

.ct time.time {
    font-size: 14px;
    color: #555;
    text-align: center;
}

/* Swiper navigation buttons */
.swiper-button-next,
.swiper-button-prev {
    color: #007bff; /* Màu xanh lam tương ứng với theme Bootstrap */
    transition: color 0.3s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
    color: #0056b3; /* Màu xanh đậm hơn khi hover */
}

/* Swiper pagination */
.swiper-pagination-bullet {
    background-color: #007bff;
    opacity: 0.7;
}

.swiper-pagination-bullet-active {
    background-color: #0056b3;
    opacity: 1;
}

/* Scrollbar customization */
.swiper-scrollbar {
    background: #e9ecef;
    border-radius: 5px;
}

.swiper-scrollbar-drag {
    background: #007bff;
    border-radius: 5px;
}

.bell {
    cursor: pointer;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 20px;
    color: #007bff;
    transition: color 0.3s;
}

.bell:hover {
    color: #0056b3;
}
.modal-content {
    border-radius: 10px;
}
.modal-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}


</style>
