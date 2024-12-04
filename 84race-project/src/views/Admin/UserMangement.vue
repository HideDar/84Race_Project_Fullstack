<template>
    <div class="user-management">
      <h1>Quản lý Người dùng</h1>
      <table>
        <thead>
          <tr>
            <th>Tên Người Dùng</th>
            <th>Email</th>
            <th>Vai Trò</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user.full_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user.user_id)">Chỉnh Sửa</button>
              <button @click="deleteUser(user.user_id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addUser">Thêm Người Dùng</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: []
      };
    },
    methods: {
      fetchUsers() {
        // Gọi API để lấy danh sách người dùng
      },
      editUser(id) {
        // Chuyển đến trang chỉnh sửa người dùng
      },
      deleteUser(id) {
        // Gọi API để xóa người dùng
      },
      addUser() {
        // Chuyển đến trang thêm người dùng
      }
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  /* CSS cho component */
  </style>
  