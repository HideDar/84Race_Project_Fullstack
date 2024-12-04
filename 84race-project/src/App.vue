<template>
  <div>
    <!-- Kiểm tra để ẩn/hiện header -->
    <AppHeader v-if="!isAdminPage" />
    <router-view />
    <!-- Kiểm tra để ẩn/hiện footer -->
    <AppFooter v-if="!isAdminPage" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './layout/AppHeader.vue';
import AppFooter from './layout/AppFooter.vue';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  


export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const route = useRoute();

    // Kiểm tra route có phải là admin hay không
    const isAdminPage = computed(() => route.path.startsWith('/admin'));

    return {
      isAdminPage
    };
  }
}
</script>

<style>
</style>
