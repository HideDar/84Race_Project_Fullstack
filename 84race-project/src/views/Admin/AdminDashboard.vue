<template>
  <div class="admin-dashboard">
    <!-- Header -->
    <HeaderAdmin />

    <!-- Main content -->
    <div class="main-layout d-flex">
      <Sidebar />
      <div class="content-area flex-grow-1">
        <div v-if="isChallengeManagement">
          <BarChart :data="chartData" />
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAdmin from "./HeaderAdmin.vue";
import Sidebar from "./SideBar.vue";
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BarChart from "./BarChart.vue";

export default {
  components: {
    HeaderAdmin,
    Sidebar,
    BarChart,
  },
  setup() {
    const route = useRoute();
    const isChallengeManagement = computed(() => route.path === '/admin');

    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'User Growth',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    return { isChallengeManagement, chartData };
  },
};
</script>

<style>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-layout {
  display: flex;
  flex: 1;
}

.content-area {
  padding: 20px;
  overflow-y: auto;
}
</style>
