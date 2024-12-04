<template>
    <div v-if="challenge" class="page-ct2"> 
        <div class="container">
            <div class="row">
              <div class="col-lg-9">
                <div class="challenge-detail-ct ">
                  <div class="challenge-detail-img ">
                    <img class="thumb d-bor30" :src="challenge.img" alt="Challenge Image">
                  </div>
                  <div class="challenge-detail-info details-chansV2">
                    <h2>{{ challenge.name }}</h2>
                    <p>Thời gian: {{ challenge.start_date }} đến {{ challenge.end_date }}</p>
                    <p>Mô tả: {{ challenge.description }}</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3">
                <div class="sb-race d-bor30">
                  <div id="divControl" style="top: 0px;">
                    <div class="price">
                      <strong>MIỄN PHÍ</strong>
                    </div>
                    <a style="cursor: pointer; text-decoration: none;" id="id_btregister" class="view-more-primary" href="">
                        <span v-if="isUserJoined(challenge)">Đã tham gia</span>
                        <span v-else @click="joinChallenge(challenge)">Tham gia</span>
                    </a>

                  </div>
									<div class="line">
										<i class="lnr lnr-hourglass"></i>
										<p class="title">Hạn đăng ký thi đấu</p>
										<p> {{ challenge.end_date }} hoặc khi hết suất</p>
						      </div>
                  <div class="line list_hm">
                    <i class="ic ic-shose-gray"></i>
                    <p class="title">Hạng mục: {{ challenge.category }}</p>
                    <p><span class="">Chia sẻ (<span class="icon_star"></span>)</span><br></p>
                  </div>

						      <p class="title v2">Phần thưởng khi hoàn thành</p>
                  <div class="row text-center">
                      <div class="col-6 sb-race-prize">
                        <a class="smooth" href="" title="">
                          <span><i class="ic ic-medal2"></i></span>
                          <p>Medal</p>
                        </a>
                      </div>
                      <div class="col-6 sb-race-prize">
                        <a class="smooth" href="" target="_blank" title="">
                          <span><i class="ic ic-certification2"></i></span>
                          <p>Chứng nhận</p>
                        </a>
                      </div>
                  </div>
					      </div>
                <div class="sb-race d-bor30" style="font-size: 18px;"> Số lượng đăng ký: {{ challenge.totalParticipants }}</div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import ChallengeForm from './ChallengeForm.vue';
export default {
  name: 'ChallengeDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ChallengeForm
  },
  setup(props) {
    const challenge = ref(null);
    const challengeParticipants = ref([]);
    const isUserJoined = () => {
      const user = localStorage.getItem('user');
      if (!user) return false;
      
      const userObj = JSON.parse(user);
      const userId = userObj.userId;
      
      return challengeParticipants.value.some(participant => participant.user_id === userId);
    };
    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/challenges/${props.id}`);
        challenge.value = response.data;
      } catch (error) {
        toast.error('Không thể tải thông tin challenge, vui lòng thử lại sau.');
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/challenges/${props.id}/participants`);
        challengeParticipants.value = response.data;
        console.log(challengeParticipants.value);

      } catch (error) {
        toast.error('Không thể tải thông tin challengeParticipants, vui lòng thử lại sau.');
      }
     
    });


    return { challenge, challengeParticipants, isUserJoined };
  },
  methods: {
    async joinChallenge(challenge){
      try {
        const token = localStorage.getItem('token');
        console.log(challenge.challenge_id);
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user);
        const userId = userObj.userId;
        console.log(userId);
        await axios.post(`http://localhost:3000/api/challenges/${challenge.challenge_id}/join/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Tham gia thành công!');
        this.$router.push(`/challenge/${challenge.id}`);
      } catch (error) {
        toast.error('Error joining challenge:', error);
      }
    },  

  }
};
</script>

<style scoped>
.page-ct2 {
    padding: 40px 0 50px 0;
    background-color: #dde7e9;
    background-image: url(../assets/page-ct2-bg1.png), url(../assets/login-bg2.png);
    background-repeat: no-repeat;
    background-position: top 85px right, left bottom;
}
.race-detail .thumb {
    width: 100%;
    display: block;
}

.d-bor30 {
    border-radius: 30px 0 0 0;
}
img {
    max-width: 100%;
    outline: none !important;
}
img {
    max-width: 100%;
    vertical-align: middle;
    object-fit: cover;
}
.challenge-detail-info {
  border-radius: 30px 0 0 0;
  margin-top: 30px;
}
.sb-race {
    background: #fff;
    padding: 20px 15px 15px;
    border: solid 1px #e1e1e1;
    font-family: "Myriadpro";
    color: #1b1b1c;
    font-size: 14px;
    margin-bottom: 15px;
}
.details-chansV2 {
    background-color: #fff;
    border: solid 1px #dbdbdb;
    overflow: hidden;
    padding: 0 20px 5px 20px;
}
.sb-race .price strong {
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
}
.view-more-primary {
    padding: 0 36px;
    height: 42px;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/bg-button.png) no-repeat center;
    background-size: 100% 100%;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 42px;
}
.sb-race .view-more-primary {
    display: block;
    text-align: center;
    font-family: "SFUFutura", sans-serif;
    font-weight: normal;
    background-size: 100% auto;
    max-width: 240px;
    margin: 15px 0 20px 0;
}
.sb-race .view-more-primary:before {
    background-color: #fdda3b;
}
.view-more-primary:before {
    content: "";
    position: absolute;
    width: 80%;
    height: 100%;
    left: 10%;
    top: 0;
    background-color: #ffdd00;
    -webkit-transform: skew(-38deg, 0);
    transform: skew(-38deg, 0);
    -webkit-transition: 0.3s;
    transition: 0.3s;
}
.view-more-primary span {
    position: relative;
    z-index: 1;
    color: #1b1b1c;
}
.sb-race .line {
    position: relative;
    padding-left: 32px;
    margin-bottom: 15px;
}
.sb-race .line i {
    font-size: 22px;
    position: absolute;
    left: 0;
    margin-top: 2px;
    color: #1b1b1c;
}
.sb-race .title {
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 16px;
}
.sb-race .title.v2 {
    margin-bottom: 12px;
    border-top: solid 1px #e1e1e1;
    padding-top: 12px;
    text-transform: uppercase;
    font-size: 14px;
}
.sb-race-prize {
    margin-top: 10px;
    font-weight: 600;
}
</style>
