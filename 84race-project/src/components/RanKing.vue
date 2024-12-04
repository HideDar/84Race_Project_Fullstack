<template>
    <div class="page-ct2">
        <div class="container">
        <div class="blog-tab race-p-tab active">
            <ul class="nav nav-tabs">
                <li :class="{ active: activeTab === 'personal' }">
              <a @click.prevent="changeTab('personal')" class="smooth" href="#">
                <span>
                  <i class="ic ic-personal" style="display: block; width: 22px; height: 22px;"></i>
                </span>
                Cá nhân
              </a>
            </li>
  
            <li :class="{ active: activeTab === 'member' }">
              <a @click.prevent="changeTab('member')" class="smooth" href="#">
                <span>
                  <i class="ic ic-member" style="display: block; width: 27px; height: 22px;"></i>
                </span>
                Cấp độ thành viên
              </a>
            </li>
          </ul>
          <div style="border-bottom: 1px solid #c6cfd1;"></div>
          <div v-if="activeTab === 'personal'">
            <div style="margin-top: 20px;" class = "row">
                <div class = "col-lg-4">
                    <div class = "rank-charts stick-scroll">
                        <img class="bxh" src="https://84race.com/public/images/bxh2.png" alt="Bảng xếp hạng" title="">
                        <h3 class="title">Bảng xếp hạng</h3>
                        <div class="avata">
                            <a href="">
                            <img src="https://84race.com/public/media/thumb/avatar/1589411063-230x230.jpeg" alt="" title="">
                            <div class="num"><span>{{ userRanking.rank }}</span>/314990</div>
                            </a>
                        </div>
                        <h2 class="name">Dương Đình Sơn VNPT SLa</h2>
                        <p class="level">Level: <i style="margin-bottom: 5px;" class="ic ic-level-ultra-trail"></i> &nbsp;&nbsp;<span>Ultra Trail</span></p>
                        <br>
                        <div class="rank-process">
                            <span class="bar" style="width: 2184%;">2184%</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="rank-table" id="rank-table">
                        <div class="head table">
                            <div class="cell">
                                <form class="search-rank" @submit="searchRankings">
                                    <input type="text" placeholder="Tên thành viên" class="txt_search" fdprocessedid="1zl80s">
                                    <button type="submit" fdprocessedid="3ul2ku"><i class="fa fa-search"></i> Tìm kiếm</button>
                                </form>
                            </div>
                            <div class="cell">
                                <a class="smooth view-rank" href="https://84race.com/login?url=https%3A%2F%2F84race.com%2Franking%2Fpersonal" title=""><i class="fa-solid fa-user-group"></i>
                                    Xếp hạng của tôi
                                </a>
                            </div>
                        </div>
                        <div class="content d-bor30">
                            <div v-if="personalRankings" class="rank-tb d-bor30">
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="text-center">Xếp hạng</th>
                                            <th></th>
                                            <th>Tên thành viên</th>
                                            <th class="text-center"><i class="fa-solid fa-star"></i></th>
                                            <th class="text-center" style="width: auto">Cấp độ</th>
                                        </tr>
                                    </thead>
                                    <tbody style="background-color: #fff;">
                                        <tr class="clickable" @click="getAllInforUserRanking(ranking.user_id)" v-for="ranking in personalRankings" :key="ranking.id">
                                            <td class="text-center">{{ ranking.rank }}</td>
                                            <td>
                                                <a href="">
                                                <img class="avt" :src="ranking.profile_image" alt="ranking.name" title="">
                                                </a>
                                            </td>
                                            <td>{{ ranking.name }}</td>
                                            <td class="text-center">{{ ranking.score }}</td>
                                            <td class="text-center">{{ ranking.level }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="hc-pagination text-center">
                                    <strong>1</strong>
                                    <a href="" data-ci-pagination-page="2">2</a>
                                    <a href="" data-ci-pagination-page="3">3</a>
                                    <a href="" data-ci-pagination-page="2" rel="next">
                                        <i class="fa fa-angle-right"></i>
                                    </a>
                                    <a href="" data-ci-pagination-page="31499">
                                        <i class="fa fa-angle-double-right"></i>
                                    </a>
                                </div>
                                <div style="height: 10px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'member'">
            <div style="margin-top: 20px;" class="rank-member d-bor30">
                <div class="def-table d-bor30">
                    <table>
                        <thead>
                            <tr>
                                <th>Cấp độ</th>
                                <th><i class="fa-solid fa-star"></i> (Tích lũy)</th>
                                <th>Ưu đãi</th>
                            </tr>
                        </thead>        
                        <tbody>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-milestone"></i>&nbsp; Milestone</td>
                                <td class="text-center">
                                    <strong class="yellow">0-8</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <strong>01</strong> thử thách từ 84RACE, bạn được tặng <strong>01</strong>&nbsp;lượt quay may mắn với phần thưởng từ <strong><span style="color: #ff9900;">84RACE</span></strong>.</p>              </td>
                            </tr>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-breaking"></i>&nbsp; Breaking</td>
                                <td class="text-center">
                                    <strong class="yellow">9-20</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <span style="color: #3366ff;"><strong>01</strong></span> thử thách từ 84RACE, bạn được tặng <span style="color: #3366ff;"><strong>02</strong></span>&nbsp;lượt quay may mắn với phần thưởng từ <span style="color: #ff9900;"><strong>84RACE</strong></span>.&nbsp;</p>              </td>
                            </tr>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-half-marathon"></i>&nbsp; Half Marathon</td>
                                <td class="text-center">
                                    <strong class="yellow">21-41</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <span style="color: #3366ff;"><strong>01</strong></span> thử thách từ 84RACE, bạn được tặng <span style="color: #3366ff;"><strong>03</strong></span>&nbsp;lượt quay may mắn với phần thưởng từ <span style="color: #ff9900;"><strong>84RACE</strong></span>.&nbsp;</p>              </td>
                            </tr>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-marathon"></i>&nbsp; Full Marathon</td>
                                <td class="text-center">
                                    <strong class="yellow">42-69</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <span style="color: #3366ff;"><strong>01</strong></span> thử thách từ 84RACE, bạn được tặng <span style="color: #3366ff;"><strong>04</strong></span>&nbsp;lượt quay may mắn với phần thưởng từ <span style="color: #ff9900;"><strong>84RACE</strong></span>.&nbsp;</p>              </td>
                            </tr>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-triathlon-703"></i>&nbsp; Ironman 70.3</td>
                                <td class="text-center">
                                    <strong class="yellow">70-99</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <span style="color: #3366ff;"><strong>01</strong></span> thử thách từ 84RACE, bạn được tặng <span style="color: #3366ff;"><strong>05</strong></span>&nbsp;lượt quay may mắn với phần thưởng từ <span style="color: #ff9900;"><strong>84RACE</strong></span>.&nbsp;</p>              </td>
                            </tr>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-triathlon"></i>&nbsp; Ultra Marathon</td>
                                <td class="text-center">
                                    <strong class="yellow">100-299</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <span style="color: #3366ff;"><strong>01</strong></span> thử thách từ 84RACE, bạn được tặng <span style="color: #3366ff;"><strong>06</strong></span>&nbsp;lượt quay may mắn với phần thưởng từ <span style="color: #ff9900;"><strong>84RACE</strong></span>.&nbsp;</p>              </td>
                            </tr>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-ultra-marathon"></i>&nbsp; Ironman 140.6</td>
                                <td class="text-center">
                                    <strong class="yellow">300-499</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <span style="color: #3366ff;"><strong>01</strong></span> thử thách từ 84RACE, bạn được tặng <span style="color: #3366ff;"><strong>07</strong></span>&nbsp;lượt quay may mắn với phần thưởng từ <span style="color: #ff9900;"><strong>84RACE</strong></span>.</p>              </td>
                            </tr>
                            <tr>
                                <td class="nowrap"><i class="ic ic-level-ultra-trail"></i>&nbsp; Ultra Trail</td>
                                <td class="text-center">
                                    <strong class="yellow">500-799</strong>
                                </td>
                                <td>
                                    <p>Khi hoàn thành <span style="color: #3366ff;"><strong>01</strong></span> thử thách từ 84RACE, bạn được tặng <span style="color: #3366ff;"><strong>08</strong></span>&nbsp;lượt quay may mắn với phần thưởng từ <span style="color: #ff9900;"><strong>84RACE</strong></span>.</p>              </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>

    </div>
    </div>

</template>

<script>
import axios from 'axios';
    export default {
        name: 'RanKing',
        props: {
            personalRankings: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                activeTab: 'personal',
                personalRankings: [], // Store personal rankings
                userRanking: {}, // Store user ranking details
            }
        },
        methods: {

            changeTab(tab) {
                this.activeTab = tab; 
                if(tab === 'personal') {
                    this.getPersonalRankings();
                }
            },

            async getAllInforUserRanking(user_id) {
                try{
                    const response = await axios.get(`http://localhost:3000/api/ranking/personal/${user_id}`);
                    this.userRanking = response.data;
                    console.log("userRanking", this.userRanking);
                    
                } catch (error) {
                    console.error('Có lỗi xảy ra:', error);
                }
            },

            async getPersonalRankings() {
                try{
                    const response = await axios.get('http://localhost:3000/api/ranking/personal');
                    this.personalRankings = response.data;
                    console.log("personalRankings", this.personalRankings);
                    
                } catch (error) {
                    console.error('Có lỗi xảy ra:', error);
                }
            }
        },
        mounted() {
            this.getPersonalRankings();
        }
    }   
</script>

<style scoped>




.page-ct2 {
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
  
  .blog-tab li.active a span i.ic-personal {
    background-image: url(../assets/ic-run2.png);
  }
  
  .blog-tab li.active a span i.ic-member {
    background-image: url(../assets/ic-users2.png);
  }
  
  .ic-personal {
    background-image: url(../assets/ic-run.png);
  }
  
  .ic-member {
    background-image: url(../assets/ic-users.png);
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



.rank-charts {
    text-align: center;
}
.rank-charts img.bxh {
    display: block;
    margin: 0 auto 15px auto;
}
img {
    max-width: 100%;
    outline: none !important;

}
.rank-charts .title {
    font-size: 20px;
    color: #1b1b1c;
    margin-bottom: 70px;
    text-transform: uppercase;
}
.rank-charts .avata {
    position: relative;
    display: block;
    margin: auto auto 30px auto;
    max-width: 230px;
}

.rank-charts .avata img {
    display: block;
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    border: solid 1px #dce1e2;
}
.avt {
    border-radius: 50%;
}
.rank-charts .avata .num {
    position: absolute;
    z-index: 1;
    padding: 0 12px;
    height: 38px;
    border-radius: 50px;
    bottom: -10px;
    border: solid 1px #fff;
    background: #415264;
    color: #ffde00;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    left: 50%;
    transform: translateX(-50%);
}


.rank-charts .avata .num span {
    font-size: 150%;
}

.rank-charts .avata:after {
    display: block;
    padding-top: 100%;
    content: "";
}
.rank-charts .name {
    font-size: 32px;
    color: #1b1b1c;
}
.rank-charts p {
    font-size: 16px;
    margin-bottom: 3px;
    color: #1b1b1c;
}
.ic-level-ultra-trail {
    display: inline-block;
    width: 43px;
    height: 44px;
    background-image: url(../assets/ic-level-ultra-trail.png);
}
.rank-process {
    height: 20px;
    background: #fff;
    position: relative;
    text-align: right;
    display: flex;
    max-width: 270px;
    margin: auto;
}
.rank-process .bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    font-size: 16px;
    line-height: 18px;
    z-index: 0;
    background: linear-gradient(to right, #fddd48 40%, #ffcd07);
}

.rank-process .bar:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.25) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.25) 75%, transparent 75%, transparent);
    background-size: 6px 6px;
}

.rank-table .head {
    margin-bottom: 20px;
}
.table {
    display: table;
    margin: 0;
}

.rank-table .head .cell:first-child {
    width: 100%;
}
.table .cell {
    display: table-cell;
    vertical-align: middle;
}
.rank-table .head .cell .search-rank {
    width: auto;
    margin-right: 20px;
}
.rank-table .head .search-rank {
    width: 100%;
}
.search-rank {
    position: relative;
    padding-right: 130px;
}
.search-rank input {
    width: 100%;
    font-family: "SFUFutura", sans-serif;
    font-size: 16px;
    border: 1px solid #dce1e2;
    height: 40px; 
}
.search-rank button {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    width: 125px;
    background: #fdda3b;
    color: #415264;
    text-transform: uppercase;
    font-size: 15px;
    font-family: "SFUFutura", sans-serif;
}
.search-rank button i {
    font-size: 18px;
    display: inline-block;
    vertical-align: middle;
    margin-top: -5px;
}

.rank-table .head .cell .view-rank {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    padding: 0 12px;
}
.rank-table .head .view-rank {
    height: 36px;
    line-height: 36px;
    border: solid 1px #cdd6d8;
    background: #f5f8f8;
    text-transform: uppercase;
    font-family: "SFUFutura", sans-serif;
    font-size: 15px;
    color: #415264;
    width: 100%;
    text-align: center;
    display: block;
}

.page-ct .content {
    background: #fff;
}
.d-bor30 {
    border-radius: 30px 0 0 0;
}
.rank-tb {
    font-family: "Myriadpro", sans-serif;
    overflow: auto;
    font-size: 14px;
}
.rank-tb table {
    width: 100%;
    min-width: 600px;
}
.rank-tb table th {
    background: #ccd4d6;
    font-weight: normal;
    font-size: 14px;
    color: #262626;
    white-space: nowrap;
    padding: 13px 15px 13px 20px;
}
.rank-tb table td {
    border-bottom: solid 1px #dbdbdb;
    padding: 9px 15px 9px 20px;
}


.ic {
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.hc-pagination {
    margin: 20px 0;
    font-family: "SFUFutura", sans-serif;
}
.hc-pagination a:hover, .hc-pagination strong {
    background: #fdda3b;
    border-color: #fdda3b;
    color: #415264;
}
.hc-pagination a, .hc-pagination strong {
    width: 31px;
    height: 31px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #1b1b1c;
    line-height: 28px;
    border-radius: 3px;
    border: solid 1px #dbdbdb;
    margin: 0 3px;
}


.fa-angle-right:before {
    content: "\f105";
}
.fa-angle-double-right:before {
    content: "\f101";
}


/* Cấp độ thành viên */

.def-table {
    background: #fff;
    overflow: auto;
}
.def-table table {
    width: 100%;
    min-width: 600px;
    font-size: 16px;
    font-family: "Myriadpro";
    color: #1b1b1c;
    text-align: justify;
}

.def-table table th {
    font-weight: 600;
    background: #ccd4d6;
    padding: 15px 20px 13px 20px;
    white-space: nowrap;
}
.def-table table .nowrap {
    white-space: nowrap;
}
.def-table table td {
    padding: 14px 20px 12px 20px;
    border-bottom: solid 1px #dbdbdb;
}
.ic-level-milestone {
    width: 43px;
    height: 37px;
    background-image: url(../assets/ic-level-milestone.png);
}
.ic-level-breaking {
    width: 43px;
    height: 41px;
    background-image: url(../assets/ic-level-breaking.png);
}
.ic-level-half-marathon {
    width: 43px;
    height: 41px;
    background-image: url(../assets/ic-level-half-marathon.png);
}
.ic-level-marathon {
    width: 43px;
    height: 41px;
    background-image: url(../assets/ic-level-marathon.png);
}
.ic-level-triathlon-703 {
    width: 43px;
    height: 41px;
    background-image: url(../assets/ic-level-triathlon-703.png);
}
.ic-level-triathlon {
    width: 43px;
    height: 41px;
    background-image: url(../assets/ic-level-triathlon.png);
}
.ic-level-ultra-marathon {
    width: 43px;
    height: 41px;
    background-image: url(../assets/ic-level-ultra-marathon.png);
}
.ic-level-ultra-trail {
    width: 43px;
    height: 41px;
    background-image: url(../assets/ic-level-ultra-trail.png);
}
.def-table table .yellow {
    color: #ffdd00;
}
.def-table table td p {
    margin-bottom: 0;
}

.clickable{
    cursor: pointer;
}
.clickable:hover{
    background-color: #f0f0f0;
}
</style>