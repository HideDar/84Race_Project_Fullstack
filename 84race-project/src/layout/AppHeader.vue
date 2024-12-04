  <template>
    <header class="header" :class="{ sticky: isSticky }" ref="header">
      <div class="container">
        <div class="wrap-content-header">
          <h1 class="logo-header">
            <a href="/">
              <img src="https://84race.com/public/media//logo.png" alt="Logo">
            </a>
          </h1>
          <div class="right-header">
            <nav>
              <ul class="nav-links">
                <li><a href="/introduce" title="Giới thiệu"><span>Giới thiệu</span></a></li>
                <li><a href="/club" title="Câu lạc bộ"><span>Câu lạc bộ</span></a></li>
                <li><a href="/challenge" title="Thử thách"><span>Thử thách</span></a></li>
                <li><a href="/ranking" title="Bảng xếp hạng"><span>Bảng xếp hạng</span></a></li>
                <li><a href="/news" title="Tin tức"><span>Tin tức</span></a></li>
              </ul>
            </nav>
            <div class="right-menu">
              <div class="lang-header">
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img title="Vietnamese" src="https://84race.com/public/images/lang-vietnamese.png" style="max-width: 40px;">
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#"><img title="English" src="https://84race.com/public/images/lang-english.png" style="max-width: 40px;"></a></li>
                  </ul>
                </div>
              </div>
              <div class="search">
                <div class="ct" id="search" style="display: block;">
                  <form class="search-fr" action="https://84race.com/search" method="get" onsubmit=" validate_search(event)">
                    <input class="search-input" type="text" name="keyword" placeholder="Tìm kiếm..." value="" fdprocessedid="m84m9" required>
                    <button type="submit" fdprocessedid="lbz2xw"><i class="fa fa-search"></i></button>
                  </form>
                </div>
              </div>
              <div class="login-header">
                <a v-if="!isLoggedIn" class="view-more-primary bd" href="/login"><span>Đăng nhập</span></a>
                <a v-else class="fa-solid fa-user" href="/profile">
                  
                </a>
               
              </div>
              <a class="logout-header" v-if="isLoggedIn" @click="logOut"><i class="fa-solid fa-right-from-bracket"></i>
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

  </template>
  <script>

  import { mapState, mapActions } from 'vuex';
  import { toast } from 'vue3-toastify';
  export default {
    name: 'AppHeader',

    data() {
      return {  
        isSticky: false,
      };
    },
    computed: {
      ...mapState(['isLoggedIn', 'user'])
    },
    mounted() {
      // this.checkLoginStatus();
      window.addEventListener('scroll', this.checkSticky);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.checkSticky);
    },
    methods: {

      checkSticky() {
        const header = this.$refs.header;
        if (!header) return;
        const stickyOffset = header.offsetTop ;
        this.isSticky = window.scrollY > stickyOffset + 600;
      },

      
      // checkLoginStatus() {
      //   const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      //   this.isLoggedIn = !!token && localStorage.getItem('isLoggedIn') === 'true';
      // },
      ...mapActions(['logout']),
      logOut() {
        const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (confirmLogout) {
          this.logout();
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('user');
          this.$router.push('/');
          setTimeout(() => {
            toast.success('Đăng xuất thành công!');
          }, 0);
        }
      }
    }
  }
  </script>

  <style scoped>

  .header {
    background-color: #415264;
    padding: 15px 0;
    position: relative;
    width: 100%;
  }
  .sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #415264;
    box-shadow: 0 4px 2px -2px rgb(163, 163, 163);
    opacity: 0.9;
    transition: all 0.3s ease;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .wrap-content-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .right-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1 0 auto;
      margin-top: 15px;
  }
  .wrap-content-header nav ul {
      margin: 0;
      padding: 0;
  }
  .wrap-content-header nav ul li {
      list-style: none; 
      display: inline-block;
      padding: 0 25px;
  }

  .wrap-content-header nav ul li a span{
    font-size: 18px;
  }
  .wrap-content-header nav ul li a.active,  .wrap-content-header nav ul li a:hover {
      color: #ffdd00;
  }


  .logo-header img {
    height: 50px;
  }

  .nav-links {
    display: flex;
    gap: 15px;
  }

  .nav-links a {  
    color: white;
    text-decoration: none;
    font-size: 16px;
  }

  .right-menu {
    display: flex;
    align-items: center;
    gap: 30px;

  }

  .lang-header img {
    max-width: 30px;
    cursor: pointer;
  }

  .search button {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  .login-header a {
    padding: 10px 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    background-color: #ffeb3b;
    color: #3b4b59;
    text-decoration: none;
    border-radius: 5px;
  }
  .login-header a:hover{
    background-color: #616161;
    color: #fff;
  }
  .dropdown-toggle{
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
  .search-input {
    border-radius: 5px;
  }
  .logout-header{
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
  </style>

