<template>
    <footer style="margin-top: 0;">
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-6">
        <div class="item-footer">
          <h3 class="heading">CÔNG TY CỔ PHẦN 84RACE</h3>
          <p>Địa chỉ:&nbsp;Số 33, Ngõ 242, Đường Láng, Tổ 11A, Phường Thịnh Quang, Quận Đống Đa, Thành phố Hà Nội</p>
          <p>Số ĐKKD:&nbsp;0108359098 do Sở KHĐT TP Hà Nội cấp ngày 11/7/2018</p>
          <p><strong></strong></p>          
        <a href="h" target="_blank" rel="nofollow"><img src="https://84race.com/public/images/dathongbao.png" alt="da-thong-bao-bo-cong-thuong" style="max-width: 150px"></a>
        <a href="" target="_blank" rel="nofollow"><img src="data:image/png;base64,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"></a>
     </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="item-footer padding">
          <h3 class="heading">LIÊN KẾT TỚI</h3>
          <ul id="" class=""><li class=""><a href="" title="Giới thiệu"><span>Giới thiệu</span></a></li><li class=""><a href="https://84race.com/faq" title="Hướng dẫn"><span>Hướng dẫn</span></a></li><li class=""><a href="https://84race.com/dieu-khoan-su-dung" title="Điều khoản sử dụng"><span>Điều khoản sử dụng</span></a></li><li class=""><a href="https://84race.com/chinh-sach-bao-mat-thong-tin" title="Chính sách bảo mật thông tin"><span>Chính sách bảo mật thông tin</span></a></li><li class=""><a href="https://84race.com/lien-he" title="Liên hệ"><span>Liên hệ</span></a></li></ul>        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="item-footer padding">
          <h3 class="heading">LIÊN HỆ VỚI CHÚNG TÔI</h3>
          <ul>
            <li>
              Hotline: 0912405555
            </li>
            <li>Email: <a href="">lienhe@84race.com</a></li>
            <li>Website: <a href="">84race.com</a></li>
          </ul>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="item-footer padding">
          <h3 class="heading">Tải ứng dụng di động</h3>
          <div class="download-ft" style="flex-direction: column">
            <div class="qr-code">
              <a href="javascript:;" title=""><img src="" alt="Ảnh QR code"></a>
            </div>
            <div class="dl-mobile" style="margin-top: 20px">
              <a href="" data-placement="top" tabindex="0"><img src="https://84race.com/public/images/app-store.png" alt="app-store"></a>
              <a href="" tabindex="0" style="margin-top: 3px"><img src="https://84race.com/public/images/google-play.png" alt="google-play"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>

<script>
export default {
    name: 'AppFooter'
}
</script>

<style scoped>
footer {    
    background-color: #212932;
    position: relative;
    margin-top: -3%;
    z-index: 1;
    color: rgba(204, 204, 204, 0.8);
    font-family: "Myriadpro", sans-serif;
    font-size: 14px;
    padding: 45px 0;
}
h3{
    font-size: 18px;
    color: #fff;
}
a{
    color: rgba(204, 204, 204, 0.8);
    text-decoration: none;
}
footer .download-ft .qr-code {
    margin-right: 15px;
    flex: 0 0 130px;
}
</style>
