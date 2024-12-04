<template>
  <div class="page-ct">
    <div class="container">
      <div class="blog-tab race-p-tab active">
        <ul class="nav nav-tabs">
          <li :class="{ active: activeTab === '84race' }">
            <a @click.prevent="changeTab('84race')" class="smooth" href="#">
              <span>
                <i class="ic ic-84race" style="display: block; width: 21px; height: 18px;"></i>
              </span>
              Thử thách từ 84RACE 
            </a>
          </li>

          <li :class="{ active: activeTab === 'member' }">
            <a @click.prevent="changeTab('member')" class="smooth" href="#">
              <span>
                <i class="ic ic-run" style="display: block; width: 21px; height: 23px;"></i>
              </span>
              Thử thách từ thành viên
            </a>
          </li>
        </ul>
        <div style="border-bottom: 1px solid #c6cfd1; padding-bottom: 10px;"></div>
        <div style="padding-top: 20px;"></div>
        <div v-if="activeTab === '84race'">

          <div class="title_name_container">
          <div class="title_name">Đang diễn ra</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="challenge in ongoingChallenges.filter(ch => ch.challenge_type === 'club')" :key="challenge.id" >
              <img class="race-post-img" :src="challenge.img" alt="Challenge Image"> 
              <div @click="showDetail(challenge.challenge_id)" style="cursor: pointer;" class="ct">
                <h3 class="title"><a>{{ challenge.name }}</a></h3>
                <time class="time">{{ challenge.start_date }}  đến  {{ challenge.end_date }}</time>
              </div>
            </swiper-slide>

          </swiper>
          </div>

          <div class="title_name_container">
          <div class="title_name">Sắp diễn ra</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="challenge in upcomingChallenges.filter(ch => ch.challenge_type === 'club')" :key="challenge.id">
              <img class="race-post-img" :src="challenge.img" alt="Challenge Image"> 
              <div @click="showDetail(challenge.challenge_id)" style="cursor: pointer;" class="ct">
                <h3 class="title"><a>{{ challenge.name }}</a></h3>
                <time class="time">{{ challenge.start_date }}  đến  {{ challenge.end_date }}</time>
              </div>
            </swiper-slide>
          </swiper>
          </div>

          <div class="title_name_container">
          <div class="title_name">Đã kết thúc</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="challenge in endedChallenges.filter(ch => ch.challenge_type === 'club')" :key="challenge.id">
              <img class="race-post-img" :src="challenge.img" alt="Challenge Image"> 
              <div @click="showDetail(challenge.challenge_id)" style="cursor: pointer;" class="ct">
                <h3 class="title"><a>{{ challenge.name }}</a></h3>
                <time class="time">{{ challenge.start_date }}  đến  {{ challenge.end_date }}</time>
              </div>
            </swiper-slide>
          </swiper>
          </div>
        </div>
        
        <div v-if="activeTab === 'member'">
          <div class="title_name_container">
          <div class="title_name">Đang diễn ra</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="challenge in ongoingChallenges.filter(ch => ch.challenge_type === 'individual')" :key="challenge.id">
              <img class="race-post-img" :src="challenge.img" alt="Challenge Image"> 
              <div @click="showDetail(challenge.challenge_id)" style="cursor: pointer;" class="ct">
                <h3 class="title"><a>{{ challenge.name }}</a></h3>
                <time class="time">{{ challenge.start_date }}  đến  {{ challenge.end_date }}</time>
              </div>
            </swiper-slide>
          </swiper>
          </div>

          <div class="title_name_container">
          <div class="title_name">Sắp diễn ra</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="challenge in upcomingChallenges.filter(ch => ch.challenge_type === 'individual')" :key="challenge.id">
              <img class="race-post-img" :src="challenge.img" alt="Challenge Image"> 
              <div @click="showDetail(challenge.challenge_id)" style="cursor: pointer;" class="ct">
                <h3 class="title"><a>{{ challenge.name }}</a></h3>
                <time class="time">{{ challenge.start_date }}  đến  {{ challenge.end_date }}</time>
              </div>
            </swiper-slide>
          </swiper>
          </div>

          <div class="title_name_container">
          <div class="title_name">Đã kết thúc</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            :space-between="50"
            navigation
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="challenge in endedChallenges.filter(ch => ch.challenge_type === 'individual')" :key="challenge.id">
              <img class="race-post-img" :src="challenge.img" alt="Challenge Image"> 
              <div @click="showDetail(challenge.challenge_id)" style="cursor: pointer;" class="ct">
                <h3 class="title"><a>{{ challenge.name }}</a></h3>
                <time class="time">{{ challenge.start_date }}  đến  {{ challenge.end_date }}</time>
              </div>
            </swiper-slide>
          </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, onMounted } from 'vue';
import ChallengeDetail from './ChallengeDetail.vue';
import { useRouter } from 'vue-router';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default {
name: "ChallengeC",
components: {
  Swiper,
  SwiperSlide,
  ChallengeDetail,
},


data() {
  return {
    activeTab: "84race", 
    ongoingChallenges: ref([]),
    upcomingChallenges: ref([]),
    endedChallenges: ref([]),
  };
},
setup() {
  const ongoingChallenges = ref([]);
  const upcomingChallenges = ref([]);
  const endedChallenges = ref([]);
  const router = useRouter();
  const onSwiper = (swiper) => {
    console.log(swiper);
  };
  const onSlideChange = () => {
    console.log('slide change');
  };

  const getChallenge = async () => {
    try {
        let allChallenges = [];  // Mảng chứa tất cả thử thách
        let currentPage = 1;  // Bắt đầu với trang 1
        let hasMore = true;  // Biến kiểm tra nếu còn trang để lấy dữ liệu

        while (hasMore) {
            const response = await axios.get('http://localhost:3000/api/challenges/user-challenges', {
                params: { page: currentPage, limit: 7 }  // Gửi yêu cầu với phân trang
            });

            const challenges = response.data.data;
            allChallenges = [...allChallenges, ...challenges];  // Thêm thử thách vào mảng

            // Kiểm tra xem còn dữ liệu hay không (dựa vào số lượng thử thách nhận được)
            hasMore = challenges.length > 0;  

            if (hasMore) {
                currentPage += 1;  // Tăng trang khi còn dữ liệu
            }
        }

        // Phân loại thử thách
        const categorizedChallenges = {
            ongoing: [],
            upcoming: [],
            ended: []
        };

        const today = new Date();

        allChallenges.forEach(challenge => {
            const startDate = new Date(challenge.start_date).getTime();
            const endDate = new Date(challenge.end_date).getTime();
            const todayTime = today.getTime();

            if (startDate > todayTime) {
                categorizedChallenges.upcoming.push(challenge);
            } else if (endDate < todayTime) {
                categorizedChallenges.ended.push(challenge);
            } else {
                categorizedChallenges.ongoing.push(challenge);
            }
        }); 

        // Cập nhật biến với các thử thách đã phân loại
        ongoingChallenges.value = categorizedChallenges.ongoing;
        upcomingChallenges.value = categorizedChallenges.upcoming;
        endedChallenges.value = categorizedChallenges.ended;

    } catch (error) {
        console.error('Error fetching challenges:', error);
    }
};


  const showDetail = (id) => {
    console.log(id);
    router.push({ name: 'ChallengeDetail', params: { id } });
  };

  onMounted(() => {
    getChallenge();
  });

  return {
    onSwiper,
    onSlideChange,
    modules: [Navigation, Pagination, Scrollbar, A11y],
    ongoingChallenges,
    upcomingChallenges,
    endedChallenges,
    showDetail,
  };
},
methods: {
  changeTab(tab) {
    this.activeTab = tab; 
  },
},
};
</script>


  <style scoped>
  .page-ct {
    background-color: #dde7e9;
    padding: 1px 0;
  }
  
  .blog-tab {
    border-bottom: solid 1px #c6cfd1;
    text-align: center;
    font-family: "SFUFutura", sans-serif;
    margin-bottom: 30px;
    padding-top: 10px;
  }
  
  .blog-tab .nav {
    display: block;
  }
  
  .blog-tab .nav-tabs {
    border: none;
  }
  
  .blog-tab li {
    display: inline-block;
    vertical-align: bottom;
    margin: 0 40px;
    font-size: 14px;
  }
  
  .blog-tab li a {
    display: block;
    text-transform: uppercase;
    color: #1b1b1b;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
    transition: none;
  }
  
  .blog-tab li a.smooth {
    transition: all 0.2s ease-in-out;
  }
  
  .blog-tab li.active a {
    color: #ffbd0a;
  }
  
  .blog-tab li a:hover {
    color: #ffbd0a;
  }
  
  .blog-tab li.active a:before {
    opacity: 1;
  }
  
  .blog-tab li a:before {
    content: "";
    position: absolute;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #ffbd0a;
    left: 50%;
    margin-left: -6px;
    bottom: -7px;
    transition: inherit;
    opacity: 0;
  }
  
  .blog-tab li a span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    line-height: 40px;
    position: relative;
    margin-bottom: 4px;
  }
  
  .blog-tab li.active a span i.ic-84race {
    background-image: url(../assets/ic-84race2.png);
  }
  
  .blog-tab li.active a span i.ic-run {
    background-image: url(../assets/ic-run2.png);
  }
  
  .ic-84race {
    background-image: url(../assets/ic-84race.png);
  }
  
  .ic-run {
    background-image: url(../assets/ic-run.png);
  }
  
  .blog-tab li.active a:after {
    opacity: 1;
  }
  
  .blog-tab li a:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background-color: #ffbd0a;
    transition: inherit;
    opacity: 0;
  }
  
  a {
    text-decoration: none;
    outline: none;
  }
  .ct {
    background: #fff;
}
 .ct {
    border-top: none;
    overflow: hidden;
    font-family: "SFUFutura", sans-serif;
    padding: 6px 18px 15px 18px;
    margin-bottom: 30px;
}
.ct:hover{
  cursor: pointer;
  background-color: #82d5df;
}

.ct .title {
    font-weight: bold;
    font-size: 14px;
    color: #262626;
    overflow: hidden;
    margin-bottom: 6px;
}
.ct .title a {
    display: inline-block;
    vertical-align: bottom;
    line-height: 18px;
}
.ct time {
    display: block;
    font-size: 14px;
    color: #7d7d7d;
    line-height: 1.2;
}

.race-post-img{
    display: block;
    width: 100%;
    border-radius: 10px;
}
.title_name{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 30px;
    text-transform: uppercase;
    display: flex;
}
.title_name_container{
  margin-bottom: 30px;
}


/* Css Swiper */
/* Swiper container styling */


/* Swiper Slide Styling */
.swiper-slide {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.swiper-slide:hover {
  transform: translateY(-5px);
}

/* Image styling within Swiper slides */
.swiper-slide img {
  width: 100%;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

/* Title and Description */
.swiper-slide .ct {
  padding: 10px;
  text-align: center;
}

.swiper-slide h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.swiper-slide time {
  font-size: 14px;
  color: #888;
}

/* Swiper Navigation Buttons */
.swiper-button-next,
.swiper-button-prev {
  color: #ffbd0a;
  width: 40px;
  height: 40px;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #f08d00;
}

/* Pagination styling */
.swiper-pagination-bullet {
  background: #ccc;
  opacity: 1;
  width: 12px;
  height: 12px;
  margin: 0 6px;
}

.swiper-pagination-bullet-active {
  background: #ffbd0a;
}

/* Scrollbar */
.swiper-scrollbar {
  background: #e0e0e0;
  border-radius: 5px;
}

.swiper-scrollbar-drag {
  background: #ffbd0a;
  border-radius: 5px;
}


  </style>
