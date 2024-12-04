<template>  
    <div >
        <section class="page-register">
	<div class="wrap-form-register">
		<form method="post" class="content" action="">
			<div class="logo-register">
				<a href="" title=""><img src="https://84race.com/public/images/logo.png" alt=""></a>
			</div>
			<div class="form-register">
                <div class="form-group">
					<input type="text" class="form-control" name="username" placeholder="Tên Người Dùng" value="" >
				</div>
				<div class="form-group">
					<input type="text" class="form-control" name="identity" placeholder="E-mail" value="" >
				</div>
				<div class="form-group">
					<input type="password" class="form-control" name="password" placeholder="Mật khẩu">
				</div>
                <div class="form-group">
					<input type="password" class="form-control" name="password" placeholder="Nhập lại mật khẩu">
				</div>
				
				<div class="">
					<label class="form-check-label">
						<input type="checkbox" name="remember" value="1" id="remember">
						Tôi đồng ý với điều khoản
                    </label>
				</div>
				<div class="btn-register">
					<button class="view-more-primary" type="submit" ><span>Đăng Ký</span>
					</button>
				</div>
			</div>
		</form>
        <div class="note-direct">
			Bạn đã có tài khoản? <a href="/login" title="">Đăng nhập</a>
		</div>
	</div>
	<p class="copyright-register"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">© 2019 84RACE</font></font></p>
</section>
    </div>
</template>


<script>
    export default {    
        name: 'PageRegister'
    }
</script>


<style scoped> 
.page-register {
    width: 100%;
    height: 100vh;
    background-size: cover;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    font-family: "Myriadpro", sans-serif;
    background-image: url(../assets/page-ct2-bg1.png), url(../assets/login-bg2.png), url(../assets/bg-login.jpg);
    background-repeat: no-repeat;
    background-position: top right, left bottom, center center;
    background-size: auto, auto, cover;
}

.wrap-form-register {
    max-width: 356px;
    width: 100%;
    z-index: 2;
    margin-top: -50px;
}

.wrap-form-register .content {
    padding: 30px 40px 25px 40px;
    background-color: white;
    position: relative;
    height: 100%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 35px 0 0 0;
}
.wrap-form-register .content .logo-register {
    text-align: center;
    margin-bottom: 18px;
}

.wrap-form-register .content .form-register .form-group {
    position: relative;
    border-bottom: 1px solid #d4d4d4;
}
.form-group {
    margin-bottom: 1rem;
}
.wrap-form-register .content .form-register .form-group .form-control {
    border: none;
    background: transparent;
    border-radius: 0;
    padding: 4px 5px 4px 0;
    color: #898989;
    font-family: "Myriadpro", sans-serif;
    font-weight: 400;
    font-size: 18px;
    outline: none;
    box-shadow: none;
    letter-spacing: 0.025em;
}


label {
    font-weight: normal;
}

.wrap-form-register .content .form-register .btn-register {
    text-align: center;
    color: white;
    display: block;
    margin: 20px 0 25px 0;
}

.wrap-form-register .content .form-register .btn-register .view-more-primary {
    padding: 0;
    width: 100%;
}
.view-more-primary {
    color: #415264;
}
.view-more-primary {
    padding: 0 36px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 42px;
    background-color: #ffeb3b;
    color: #3b4b59;
    text-decoration: none;
    border-radius: 5px;
}

.wrap-form-register .content .form-register .btn-register .view-more-primary span {
    font-weight: 400;
    font-family: "Myriadpro", sans-serif;
}
.view-more-primary span {
    position: relative;
    z-index: 1;
}
.copyright-register {
    position: absolute;
    left: 0;
    bottom: 45px;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 0;
}
.wrap-form-register .note-direct {
    background-color: transparent;
    text-align: center;
    color: white;
    font-size: 16px;
    margin-top: 25px;
}
</style>
