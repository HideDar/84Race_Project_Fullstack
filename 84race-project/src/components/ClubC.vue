<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Danh sách câu lạc bộ -->
      <div class="col-md-9 clubs-list">
        <div class="btn-group mb-3" role="group">
          <button 
            @click="activeTab = 'all'" 
            :class="['btn', activeTab === 'all' ? 'btn-primary' : 'btn-secondary']"
          >
            Tất cả câu lạc bộ
          </button>
          <button 
            @click="activeTab = 'joined'" 
            :class="['btn', activeTab === 'joined' ? 'btn-primary' : 'btn-secondary']"
          >
            Câu lạc bộ đã tham gia
          </button>
        </div>
        
        <table class="table table-bordered table-hover">
          <thead class="thead-light">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên câu lạc bộ</th>
              <th scope="col">Số thành viên</th>
              <th scope="col">Tình trạng</th>
              <th scope="col">Điều kiện</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(club, index) in filteredClubs" 
              :key="club.club_id" 
              @click="selectClub(club)" 
              :class="{ 'table-active': selectedClub?.club_id === club.club_id }"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ club.name }}</td>
              <td>{{ club.memberCount }}</td>
              <td>{{ isUserJoined(club) ? 'Đã tham gia' : 'Chưa tham gia' }}</td>
              <td>{{ club.active ? 'Tự do' : 'Cần phê duyệt' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Chi tiết câu lạc bộ -->
      <div class="col-md-3 club-preview" v-if="selectedClub">
        <img 
          :src="selectedClub.logo || 'default-logo.png'" 
          alt="Club Logo" 
          class="img-fluid mb-3 rounded" 
          style="max-width: 100px;"
        />
        <h3 class="club-name text-center">{{ selectedClub.name }}</h3>
        <p>{{ selectedClub.description }}</p>

        <!-- Chỉ hiển thị nút "Vào" hoặc "Chờ xác nhận" -->
        <button 
          class="btn btn-primary btn-block" 
          v-if="isUserJoined(selectedClub) && !isPending(selectedClub)"
          @click="showClubDetail"
        >
          Vào
        </button>
        <!-- Hiển thị nút tham gia nếu chưa tham gia và trạng thái không phải là pending -->
        <button 
          class="btn btn-danger btn-block" 
          v-if="!isPending(selectedClub) && !isUserJoined(selectedClub)"
          @click="joinClub(selectedClub)"
        >
          Tham gia
        </button>

        <!-- Nếu người dùng chưa tham gia và trạng thái đang chờ xác nhận -->
        <div v-if="isPending(selectedClub)" class="alert alert-warning">
          Chờ xác nhận
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import ClubDetail from './ClubDetail.vue';
import { toast } from 'vue3-toastify';


export default {
  components: {
    ClubDetail
  },
  data() {
    return {
      activeTab: 'all', // Tab hiện tại ('all' hoặc 'joined')
      selectedClub: null, // Câu lạc bộ được chọn
      clubs: [], // Danh sách câu lạc bộ
      userId: null,
    };
  },
  computed: {
    filteredClubs() {
      return this.activeTab === 'all' 
        ? this.clubs 
        : this.clubs.filter(club => this.isUserJoined(club));
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
        return;
      }

      const userResponse = await axios.get('http://localhost:3000/api/users/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.userId = userResponse.data.user_id;

      const clubsResponse = await axios.get('http://localhost:3000/api/clubs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.clubs = clubsResponse.data;
    } catch (error) {
      if (error.response?.status === 401) {
        setTimeout(() => {
          toast.error('Vui lòng đăng nhập lại.');
        }, 0);
        this.$router.push('/login');
      } else {
        toast.error('Lỗi kết nối, vui lòng thử lại.');
      }
    }
  },
  methods: {
    selectClub(club) {
      this.selectedClub = club;
    },
    isUserJoined(club) {
      if (!this.userId || !club.UserClubs) return false;
      return club.UserClubs.some(userClub => userClub.user_id === this.userId && userClub.status === 'approved');
    },
    isPending(club) {
      if (!club.UserClubs) return false;
      const userClub = club.UserClubs.find(userClub => userClub.user_id === this.userId);
      return userClub && userClub.status === 'pending'; 
    },
    async joinClub(club) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(`http://localhost:3000/api/clubs/${club.club_id}/join/${this.userId}`, null, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }); 
          if (!club.active) {
              toast.success('Bạn đã gửi yêu cầu tham gia câu lạc bộ, chờ phê duyệt.');
              club.UserClubs.push({ user_id: this.userId, role: 'member', joined_at: new Date().toISOString(), status: 'pending' });
              this.selectedClub = null;
          } else {
              toast.success('Tham gia câu lạc bộ thành công!');
              club.memberCount += 1; 
              club.UserClubs.push({ user_id: this.userId, role: 'member', joined_at: new Date().toISOString(), status: 'approved' });
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 404:
                        toast.error('Câu lạc bộ không tồn tại.');
                        break;
                    case 403:
                        toast.error('Bạn không có quyền tham gia câu lạc bộ này.');
                        break;
                    default:
                        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.'); // Xử lý trường hợp không có response
            }
        }
    },
    showClubDetail() {
      this.$router.push({ 
        name: 'ClubDetail', 
        params: { 
          id: this.selectedClub.club_id, 
          userId: this.userId 
        } 
      });
    }
  },
};
</script>

<style scoped >
.row {
  padding: 30px;
}
.club-preview {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.table-active {
  background-color: #f8f9fa !important;
}
</style>
