<template>
    <div class="page-ct">   
        <div class="container">
            <div class="blog-tab active">
                <ul class="nav nav-tabs">
                        <li :class="{ active: activeTab === 'news' }">
                        <a @click.prevent="changeTab('news')" class="smooth active" href="" title="">
                            <span>
                            <i class="ic ic-blog"></i>                
                            </span>
                            Tin tức chung              
                        </a>
                        </li>
                    
                        <li :class="{ active: activeTab === 'share' }">
                        <a @click.prevent="changeTab('share')" class="smooth " href="" title="">
                            <span>
                            <i class="ic ic-run"></i>
                            </span>
                            Chia sẻ kinh nghiệm              
                        </a>
                        </li>
                </ul>
                <div style="border-bottom: 1px solid #c6cfd1;"></div>
                <div v-if="activeTab === 'news'" class="row">
                    <div v-for="post in posts" :key="post.id" class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="blog">
                          <a class="c-img hv-scale">
                            <img :src="post.post_img" alt="Inspiring Run CMC 28 - Giải chạy online gây quỹ Phẫu thuật nụ cười" title="">
                          </a>  
                          <div class="time">{{ formatDate(post.created_at) }}</div>
                          <div class="title_name_content">{{ post.content }}</div>
                          
                        </div>
                    </div>
                </div>
                <div v-if="activeTab === 'share'">
                    <h1>Chia sẻ kinh nghiệm</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'NewS',
    data() {
        return {
            activeTab: 'news',
            posts: []
        }
    },
    methods: {
        changeTab(tab) {
            this.activeTab = tab;
        },
        async getPosts() {
          try {
            let allPosts = [];  // Mảng chứa tất cả bài viết
            let currentPage = 1;
            let hasMore = true;

            while (hasMore) {
                const response = await axios.get(`http://localhost:3000/api/posts/user-post?page=${currentPage}&limit=${7}`);
                allPosts = [...allPosts, ...response.data.data];  // Thêm bài viết vào mảng
                hasMore = response.data.data.length > 0;  // Kiểm tra xem còn dữ liệu hay không
                currentPage++;  // Tăng trang
            }
            this.posts = allPosts; 
            console.log("posts", this.posts);
          } catch (error) {
            console.error('Error getting posts:', error);
          }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
        }
    },
    mounted() {
        this.getPosts();
    }
}
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
  
.blog-tab li.active a span i.ic-blog {
    background-image: url(../assets/ic-blog2.png);
  }
  
  .blog-tab li.active a span i.ic-run {
    background-image: url(../assets/ic-run2.png);
  }
  

.blog-tab li a.active .ic-blog, .blog-tab li a:hover .ic-blog, .ic-blog, .ic-blog2 {
    width: 21px;
    height: 17px;
}
.blog-tab li a span i {
    vertical-align: middle;
}
.ic-blog {
    background-image: url(../assets/ic-blog.png);
}
.ic {
    display: inline-block;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
a{
    text-decoration: none;
}
.blog-tab li a span i {
    vertical-align: middle;
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
.ic-run {
    background-image: url(../assets/ic-run.png);
}
.blog-tab li a.active .ic-run, .blog-tab li a:hover .ic-run, .ic-run, .ic-run2{
    width: 21px;
    height: 23px;
}

.blog {
    font-family: "SFUFutura", sans-serif;
    margin: 0 auto 33px auto;
}

.blog .c-img {
    padding-top: 56.3%;
    border-radius: 25px 0 0 0;
    overflow: hidden;
    margin-bottom: 15px;
}

.c-img {
    display: block;
    position: relative;
    padding-top: 100%;
}
.hv-scale {
    overflow: hidden;
    display: block;
}
.c-img .bg, .c-img img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
}

.hv-scale img {
    transition: all 0.3s ease-in-out;
}
.blog .time {
    font-size: 15px;
    color: #1b1b1b;
    display: block;
    margin-bottom: 10px;
}
.row{
  padding-top: 20px;
}
</style>

