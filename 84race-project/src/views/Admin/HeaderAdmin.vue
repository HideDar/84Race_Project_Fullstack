<template>
    <header class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <!-- Logo -->
      <div class="container-fluid">
        <router-link to="/admin" class="navbar-brand">
          <img  src="https://84race.com/public/media/logo.png" class="logo" />
          <span class="navbar-brand">84Race Admin Dashboard</span>

        </router-link>
  
        <!-- Toggle button for mobile view -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- Search Bar -->
          <form class="d-flex ms-auto me-4" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Tìm kiếm..."
              aria-label="Search"
              v-model="searchQuery"
            />
            <button class="btn btn-outline-success" type="submit">Tìm</button>
          </form>
  
          <!-- Action Buttons -->
          <ul class="navbar-nav mb-2 mb-lg-0 align-items-center">
            <!-- Notifications -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="notificationsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-bell"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
                <li><a class="dropdown-item" href="#">Thông báo 1</a></li>
                <li><a class="dropdown-item" href="#">Thông báo 2</a></li>
                <li><a class="dropdown-item" href="#">Thông báo 3</a></li>
              </ul>
            </li>
  
            <!-- Profile -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="require('@/assets/avatar.jpg')"
                  alt="Avatar"
                  class="rounded-circle"
                  style="width: 40px; height: 40px;"
                />
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                  <a class="dropdown-item" @click="goToProfile">Thông tin cá nhân</a>
                </li>
                <li>
                  <a class="dropdown-item" @click="logout">Đăng xuất</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </template>
  
  
  <script>
import 'bootstrap-icons/font/bootstrap-icons.css';

  export default {
    name: "HeaderAdmin",
    data() {
      return {
        searchQuery: "",
      };
    },
    methods: {
      goToProfile() {
        this.$router.push({ name: "UserProfile" });
      },
      logout() {
        alert("Đã đăng xuất!");
        // Thêm logic đăng xuất tại đây
      },
    },
  };
  </script>
  
  <style scoped>
  .logo {
    height: 40px;
  }
  
  .navbar {
    padding: 10px 20px;
  }
  
  .nav-item .dropdown-menu {
    min-width: 200px;
  }
  
  img.rounded-circle {
    cursor: pointer;
  }
  .navbar-brand {
    font-size: 1.5rem;
    margin-left: 10px;
  }
  </style>
  