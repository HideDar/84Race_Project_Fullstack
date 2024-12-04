<template>
  <div class="edit-challenge">
    <h1>Thêm Thử Thách</h1>
    <form @submit.prevent="addChallenge">
      <div class="form-group">
        <label for="name">Name: </label>
        <input type="text" id="name" v-model="challenge.name" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="description">Description: </label>
        <textarea id="description" v-model="challenge.description" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="category">Category: </label>
        <input type="text" id="category" v-model="challenge.category" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="start_date">Start Date: </label>
        <input type="date" id="start_date" v-model="challenge.start_date" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="end_date">End Date: </label>
        <input type="date" id="end_date" v-model="challenge.end_date" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="img">Image: </label>
        <input type="text" id="img" v-model="challenge.img" class="form-control" />
      </div>
      <div class="form-group">
        <label for="challenge_type">Challenge Type: </label>
        <input type="text" id="challenge_type" v-model="challenge.challenge_type" class="form-control" />
      </div>
      <div class="form-group">
        <label for="rules">Rules: </label>
        <textarea id="rules" v-model="challenge.rulesAsString" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="goal_distance">Goal Distance: </label>
        <input type="number" id="goal_distance" v-model="challenge.goal_distance" class="form-control" />
      </div>
      <div class="form-group">
        <label for="goal_time">Goal Time: </label>
        <input type="time" id="goal_time" v-model="challenge.goal_time" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Add Challenge</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

export default {
  name: 'AddChallenge',
  setup() {
    const challenge = ref({
      name: '',
      description: '',
      category: '',
      start_date: '',
      end_date: '',
      img: '',
      challenge_type: '',
      rulesAsString: '',
      goal_distance: null,
      goal_time: ''
    });

    const addChallenge = async () => {
      try {
        if (challenge.value.rulesAsString) {
          challenge.value.rules = JSON.parse(challenge.value.rulesAsString);
        }

        await axios.post('http://localhost:3000/api/challenges', challenge.value);
        alert('Thêm thử thách thành công!');
        router.push('/admin/challenge-management'); 
      } catch (error) {
        console.error('Error adding challenge:', error);
        alert('Thêm thử thách thất bại!');
      }
    };

    return {
      challenge,
      addChallenge
    };
  }
};
</script>

<style scoped>
.edit-challenge {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  margin-top: 20px;
}
</style>
