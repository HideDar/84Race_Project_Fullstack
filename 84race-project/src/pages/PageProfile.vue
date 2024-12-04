<template>
    <div class="page-ct2">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 lg-bor-right" style="border-radius: 30px 0 0 30px;padding-left: 0; background-color: #fff;">
                    <div class="prf-sidebar">
                    <button type="button" class="prf-sb-btn"><i class="fa fa-cog"></i></button>
                    <div class="ct active">
                        <ul>
                            <li><a class="smooth" href="" title=""><i class="fa-solid fa-user"></i> Trang cá nhân</a></li>
                            <li><a class="smooth " href="" title=""><i class="fa-solid fa-heart-pulse"></i> Quản lý thử thách</a></li>
                            <li><a class="smooth " href="" title=""><i class="fa-solid fa-lock"></i> Thay đổi mật khẩu</a></li>
                            <li><a class="smooth " href="" title=""><i class="fa-solid fa-wallet"></i> Thông tin thanh toán</a></li>
                            <li><a class="smooth " href="" title=""><i class="fa-solid fa-tag"></i> Quản lý Voucher</a></li>
                            <li><a class="smooth " href="" title=""><i class="fa-solid fa-gift"></i> Quản lý quà tặng</a></li>
                        </ul>
                        <button type="button" class="prf-sb-close"><i class="fa fa-mail-reply"></i> Đóng</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="profile-box profile-head d-bor30">
                        <div class="row sm-pad-7 align-items-center">
                            <div class="col-md-3 col-sm-3">
                            <div class="avata">
                                <img src="https://84race.com/public/media/thumb/noavatar-152x152.png" alt="" title="">
                            </div>
                            </div>
                            <div class="col-md-9 col-sm-9  text-sm-left">
                                <h3 class="name">xinxu</h3>
                                <a class="smooth btn-edit-prf" href="https://84race.com/profile/edit" title="">Sửa hồ sơ</a>
                                <div class="line">Level: Milestone</div>
                                <div class="line">BIB Number: 116081</div>
                                <div class="statis">
                                    <div class="row col-mar-0 justify-content-between">
                                        <div class="col-auto text-center">
                                            <strong>0</strong><i class="fa fa-star"></i>
                                            <p>Tổng số sao</p>
                                        </div>
                                        <div class="col-auto text-center">
                                            <strong>42613/316341</strong>
                                            <p>Thứ hạng</p>
                                        </div>
                                        <div class="col-auto text-center">
                                            <strong>0</strong><i class="fa fa-star"></i>
                                            <p>Tháng 10/2024</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="profile-box profile-head d-bor30">
                        <div class="">
                            <h2 class="k-title">Liên kết ứng dụng</h2>
                            <p class="" style="color: #fc4c02">
                            Tài khoản của bạn chưa liên kết với STRAVA/GARMIN. Vui lòng kết nối để đảm bảo các hoạt động được ghi nhận tự động và đầy đủ lên hệ thống 84RACE.		</p>
                            <div class="list-app">
                                <div class="item">
                                    <div class="left">
                                        <a href="https://www.strava.com/oauth/authorize?scope=activity%3Aread%2Cread&amp;approval_prompt=force&amp;state=4fcff100092fb41c8a54971370123e9c&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F84race.com%2Fstrava%2Fstrava%2Fconnect%3Fuser_id%3D342458&amp;client_id=27440" class="img2">
                                            <img src="https://84race.com/public/images/btn_strava_connectwith_orange.png" alt="Strava">
                                        </a>
                                        <div class="info">
                                            <span></span>
                                        </div>
                                    </div>
                                    <div class="right">
                                            <a class="smooth ctrl" href="https://www.strava.com/oauth/authorize?scope=activity%3Aread%2Cread&amp;approval_prompt=force&amp;state=4fcff100092fb41c8a54971370123e9c&amp;response_type=code&amp;redirect_uri=https%3A%2F%2F84race.com%2Fstrava%2Fstrava%2Fconnect%3Fuser_id%3D342458&amp;client_id=27440" title="">Kết nối</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.page-ct2 {
    padding: 40px 0 50px 0;
    background-color: #dde7e9;
    background-image: url(../assets/page-ct2-bg1.png), url(../assets/login-bg2.png);
    background-repeat: no-repeat;
    background-position: top 85px right, left bottom;
}
@media (min-width: 992px) {
    .lg-bor-right {
        border-right: solid 1px #dbdbdb;
    }
}
.prf-sidebar .prf-sb-btn, .prf-sidebar .prf-sb-close {
    display: none;
}
button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
}
li, ol, ul {
    padding: 0;
    list-style: none;
    margin: 0;
}
.prf-sidebar ul li:first-child a {
    border-radius: 30px 0 0 0;
}
.prf-sidebar a.active, .prf-sidebar a:hover {
    background: #fdda3b;
    color: #415264;
}
.prf-sidebar a {
    display: block;
    font-family: "SFUFutura", sans-serif;
    color: #1b1b1b;
    font-size: 18px;
    position: relative;
    line-height: 26px;
    padding: 11px 20px 13px 50px;
    position: relative;
    margin-right: -15px;
}
.prf-sidebar a i {
    font-size: 20px;
    width: 22px;
    text-align: center;
    position: absolute;
    left: 15px;
    margin-top: 4px;
    color: #1b1b1b;
}
.smooth {
    transition: all 0.2s ease-in-out;
    backface-visibility: hidden;
}
a, a:active, a:focus, a:hover {
    text-decoration: none;
    color: inherit;
    outline: none;
}
.prf-sidebar a:after {
    content: "";
    position: absolute;
    top: 0;
    transition: inherit;
    border-top: 26px solid transparent;
    border-left: 15px solid #fdda3b;
    border-bottom: 26px solid transparent;
    opacity: 0;
    right: -15px;
}


.profile-head {
    padding: 25px 20px 30px 20px;
    color: #262626;
}
.profile-box {
    background: #fff;
    margin-bottom: 20px;
    border: solid 1px #dbdbdb;
    padding: 20px;
    font-family: "SFUFutura", sans-serif;
}

.d-bor30 {
    border-radius: 30px 0 0 0;
}
.profile-head .avata {
    position: relative;
    width: 152px;
    max-width: 100%;
}
.profile-head .avata:before {
    content: "";
    display: block;
    padding-top: 100%;
}
.profile-head .avata img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
}

img {
    max-width: 100%;
    vertical-align: middle;
    object-fit: cover;
}

.profile-head .name {
    font-size: 28px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    margin-bottom: 15px;
}
.profile-head .btn-edit-prf {
    display: inline-block;
    vertical-align: middle;
    padding: 2px 30px;
    border: solid 1px #dbdbdb;
    border-radius: 3px;
    background: #fafafa;
    margin-bottom: 15px;
}
.profile-head .line {
    font-size: 16px;
    margin-bottom: 15px;
}
.profile-head .line {
    font-size: 16px;
    margin-bottom: 15px;
}
.profile-head .statis {
    max-width: 450px;
    line-height: 1;
    font-size: 16px;
}
.col-mar-0 {
    margin-left: 0px;
    margin-right: 0px;
}
.profile-head .statis strong {
    line-height: 20px;
    display: inline-block;
    vertical-align: middle;
}
.profile-head .statis i {
    vertical-align: middle;
    color: #ffbd0a;
    margin-left: 5px;
    font-size: 18px;
    line-height: 20px;
}
.profile-head .statis p {
    margin-bottom: 0;
    margin-top: 4px;
}

.list-app .item {
    margin-bottom: 15px;
    justify-content: space-between;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
}
.list-app .item .right .ctrl {
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
    text-transform: uppercase;
    background: #fdda3b;
    color: #415264;
    padding: 5px 12px 6px 12px;
    font-family: "SFUFutura", sans-serif;
    width: 142px;
    text-align: center;
}

</style>
