<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Danh sách thành viên chờ phê duyệt</h5>
          <button @click="close" class="btn-close"></button>
        </div>
        <div class="modal-body">
            <table class="table table-bordered table-hover">
              <thead class="thead-light">
                <tr>
                  <th>Họ tên</th>
                  <th>Ảnh đại diện</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in pendingMembers" :key="user.id">
                <td>{{ user.members.username }}</td>
                <td><img :src="user.members.profile_image" alt="Ảnh đại diện" style="width: 50px; height: 50px;"></td>
                <td>
                  <button style="margin-right: 10px;" @click="approve(user.id)" class="btn btn-primary">Phê duyệt</button>
                  <button @click="reject(user.id)" class="btn btn-danger">Từ chối</button>
                </td>
                </tr>
              </tbody>
            </table>

        </div>
        <div class="modal-footer">
          <button @click="close" class="btn btn-secondary">Đóng</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import { toast } from 'vue3-toastify';
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      pendingMembers: {
        type: Array,
        required: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async approve(id) {
        try {
          await axios.put(`http://localhost:3000/api/clubs/${id}/approve-member`);
          toast.success('Phê duyệt thành viên thành công!');
          this.pendingMembers = this.pendingMembers.filter(user => user.id !== id);
          this.close();
        } catch (error) {
          toast.error('Có lỗi xảy ra:', error);
        }
      },
      async reject(id) {
        try {
          await axios.put(`http://localhost:3000/api/clubs/${id}/reject-member`);
          toast.success('Từ chối thành viên thành công!');
          this.close();
        } catch (error) {
          toast.error('Có lỗi xảy ra:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    bottom: 200px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }
  </style>
  