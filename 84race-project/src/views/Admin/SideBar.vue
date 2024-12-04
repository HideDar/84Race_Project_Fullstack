<template>
  <div class="sidebar bg-dark text-white d-flex flex-column vh-100">
    <!-- Sidebar Header -->
    <div class="sidebar-header p-3 text-center border-bottom border-secondary">
      <a class="navbar-brand" href="/admin">Admin Dashboard</a>
    </div>

    <!-- Sidebar Menu -->
    <ul class="nav flex-column p-2">
      <li v-for="item in menuItems" :key="item.name" class="nav-item">
        <router-link
          :to="{ name: item.name }"
          class="nav-link text-white"
          active-class="active"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "ChallengeManagement", label: "Quản lý thử thách" },
        { name: "ClubManagement", label: "Quản lý câu lạc bộ" },
        { name: "UserManagement", label: "Quản lý người dùng" },
        { name: "PostManagement", label: "Quản lý bài viết" },
        { name: "Statistical", label: "Thống kê" },
        { name: "Setting", label: "Cài đặt" },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  min-width: 250px; /* Đảm bảo chiều rộng tối thiểu */
}

.sidebar-header {
  background-color: #343a40; /* Màu tối cho header */
}

.nav-link {
  padding: 10px 20px;
  border-radius: 5px;
}

.nav-link.active,
.nav-link:hover {
  background-color: #17a2b8; /* Màu nhấn khi chọn hoặc hover */
  color: white !important;
  text-decoration: none;
}

@media (max-width: 768px) {
  .sidebar {
    min-width: 100%; /* Tràn toàn bộ chiều rộng trên thiết bị nhỏ */
    height: auto;
  }

  .nav-link {
    text-align: center; /* Căn giữa nội dung */
  }

}
.navbar-brand {
  font-size: 1rem;

}
</style>
