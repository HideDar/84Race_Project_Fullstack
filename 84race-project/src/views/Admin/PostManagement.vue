<template>
    <div class="post-management container py-4">
      <!-- Page Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3">Quản lý bài viết</h1>
        <button class="btn btn-primary" @click="createPost">
          <i class="bi bi-plus-circle me-2"></i>Thêm bài viết
        </button>
      </div>
  
      <!-- Search Bar -->
      <div class="mb-4">
        <form class="d-flex" @submit.prevent="searchPosts">
          <input style="width: 87%;"
            type="text"
            class="form-control me-2"
            placeholder="Tìm kiếm bài viết..."
            v-model="searchQuery"
          />
          <button type="submit" class="btn btn-secondary">
            <i class="bi bi-search"></i> Tìm kiếm
          </button>
        </form>
      </div>
  
      <!-- Post List Table -->
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Ngày đăng</th>
              <th>Ảnh</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in posts" :key="post.id">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.content }}</td>
              <td>{{ formatDate(post.created_at) }}</td>
              <td><img :src="post.post_img" style="width: 100px; height: 70px;" /></td>
              <td>
                  {{ post.status }}
              </td>
              <td>
                <button class="btn btn-sm btn-info me-2" @click="editPost(post.id)">
                  <i class="bi bi-pencil"></i> Sửa
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deletePost(post.id)"
                >
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="d-flex justify-content-center align-items-center mt-4 gap-3">
          <button class="btn btn-primary" :disabled="currentPage === 1" @click="prevPage">
            <i class="bi bi-chevron-left"></i> Trước
          </button>
          <span>Trang {{ currentPage }} / {{ totalPages }}</span>
          <button class="btn btn-primary" :disabled="currentPage === totalPages" @click="nextPage">
            Sau <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  

  <script>
  import axios from 'axios';

  export default {
    name: "PostManagement",
    data() {
      return {
        searchQuery: "",
        posts: [],
        currentPage: 1,
        itemsPerPage: 4,
        totalPosts: 0,
        totalPages: 0,
      };
    },
    mounted() {
      this.getPosts();
    },
    methods: {
        async getPosts() {
          try {
            const response = await axios.get(`http://localhost:3000/api/posts?page=${this.currentPage}&limit=${this.itemsPerPage}`);
            this.posts = response.data.data; 
            this.totalPosts = response.data.pagination.totalItems;
            this.totalPages = response.data.pagination.totalPages;
            console.log("posts", this.posts);
          } catch (error) {
            console.error('Error getting posts:', error);
          }
        },
      createPost() {
        alert("Chuyển đến trang tạo bài viết mới.");
      },
      editPost(id) {
        alert(`Chỉnh sửa bài viết có ID: ${id}`);
      },
      deletePost(id) {
        if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
          this.posts = this.posts.filter((post) => post.id !== id);
        }
      },
      searchPosts() {
        alert(`Tìm kiếm: ${this.searchQuery}`);
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getPosts();
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.getPosts();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .table {
    margin-top: 20px;
  }
  
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05); /* Màu nền cho hàng lẻ */
  }
  
  .table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Màu nền khi hover */
  }
  
  .badge {
    font-size: 0.9rem;
  }
  </style>
  