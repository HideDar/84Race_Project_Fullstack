<template>
    <div>
      <form @submit.prevent="submitForm">
        <h1>Challenge Form</h1>
        <div>Nhập form cho user {{ userId }}</div>
        <div>   
          <input type="text" placeholder="distance" v-model="distance"> 
          <input type="text" placeholder="hh:mm:ss" v-model="time" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

    <div>Bảng xếp hạng của challenge {{ id }}</div>
    <table v-if="users.length > 0" class="table table-bordered table-hover">
        <thead v-if="users.length > 0" class="thead-light"> 
            <tr >
                <th>STT</th>
                <th>Họ tên</th>
                <th>Ảnh đại diện</th>
                <th>Quảng đường đi được</th>
                <th>Thời gian </th>
                <th>Vận tốc (m/s)</th>
            </tr>
        </thead>
      <tbody v-if="users.length > 0" class="table-striped">
        <tr v-for="(user, index) in users" :key="user.userId">
          <td>{{ index + 1 }}</td>
          <td>{{ user.user.username }}</td>
          <td>{{ user.user.profile_image }}</td>
          <td>{{ user.total_distance }}</td>
          <td>{{ user.total_time }}</td>
          <td>{{ user.average_speed }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'ChallengeForm',
    props: {
      id: {
        type: String,
        required: true
      },
    },
    setup(props) {
      // Khởi tạo biến để lưu trữ thông tin user
      const user = localStorage.getItem('user');
      const userObj = user ? JSON.parse(user) : null; // Kiểm tra dữ liệu trước khi parse
      const userId = userObj?.userId ?? ''; // Kiểm tra nếu userObj tồn tại
      const id = props.id;
  
      // Reactive fields
      const distance = ref('');
      const time = ref('');
      const users = ref([]);
    
      onMounted(async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/challenges/${id}/participants`);
          users.value = response.data.sort((a, b) => b.total_distance - a.total_distance);
          console.log("users", users.value);
        } catch (error) {
          console.error('Error getting challenge participants:', error);
          alert('Error getting challenge participants. Please try again.');
        }
      });


      return { id, distance, time, userId, users };
    },
    methods: {

      async submitForm() {
        try {
          // Kiểm tra và sửa lại thời gian nếu không đúng định dạng
          if (!this.isValidTimeFormat(this.time)) {
            alert('Please enter a valid time format (HH:MM:SS)');
            return;
          }
  
          // Nếu thời gian không có giây, thêm ":00" vào
          const formattedTime = this.time.includes(':') && this.time.split(':').length === 2
            ? `${this.time}:00` // Chắc chắn có định dạng HH:MM:SS
            : this.time;
  
          // Tạo payload và gửi lên server
          const payload = {
            distance: this.distance,
            time: formattedTime,
            userId: this.userId 
          };
  
          await axios.post(`http://localhost:3000/api/challenges/${this.id}/form`, payload);
          alert('Form submitted successfully!');
          console.log(payload);
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      },

  
      // Hàm kiểm tra định dạng thời gian HH:MM:SS
      isValidTimeFormat(time) {
        const regex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;
        return regex.test(time);
      },


    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    margin: 10px;
    padding: 10px;
    width: 200px;
  }
  </style>
  