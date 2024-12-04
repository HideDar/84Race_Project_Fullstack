<template>
  <div class="challenge-management container py-4">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3">Quản lý Thử thách</h1>
      <button class="btn btn-primary" @click="addChallenge">
        <i class="bi bi-plus-circle me-2"></i> Thêm Thử Thách
      </button>
    </div>

    <!-- Challenge Table -->
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên thử thách</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Ngày bắt đầu</th>
            <th scope="col">Ngày kết thúc</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(challenge, index) in challenges" :key="challenge._id">
            <th scope="row">
              {{ index + 1 + (currentPage - 1) * itemsPerPage }}
            </th>
            <td>{{ challenge.name }}</td>
            <td>{{ challenge.description }}</td>
            <td>{{ challenge.category }}</td>
            <td>{{ challenge.start_date }}</td>
            <td>{{ challenge.end_date }}</td>
            <td>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-info" @click="editChallenge(challenge.challenge_id)">
                  <i class="bi bi-pencil"></i> Sửa
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteChallenge(challenge.challenge_id)">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center align-items-center mt-4 gap-3">
      <button
        class="btn btn-primary"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        <i class="bi bi-chevron-left"></i> Trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button
        class="btn btn-primary"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Sau <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChallengeManagement",
  data() {
    return {
      challenges: [],
      currentPage: 1,
      itemsPerPage: 7, // Items per page
      totalChallenges: 0, // Total items
      totalPages: 0, // Total pages
    };
  },
  methods: {
    async fetchChallenges() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/challenges?page=${this.currentPage}&limit=${this.itemsPerPage}`
        );
        this.challenges = response.data.data;
        this.totalChallenges = response.data.pagination.totalItems;
        this.totalPages = response.data.pagination.totalPages;
        console.log("challenges", this.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    },
    async deleteChallenge(challenge_id) {
      if (window.confirm("Bạn có chắc chắn muốn xóa thử thách này không?")) {
        try {
          await axios.delete(`http://localhost:3000/api/challenges/${challenge_id}`);
          alert("Xóa thử thách thành công!");
          this.fetchChallenges();
        } catch (error) {
          console.error("Error deleting challenge:", error);
        }
      }
    },
    editChallenge(challenge_id) {
      this.$router.push(`/edit-challenge/${challenge_id}`);
    },
    addChallenge() {
      this.$router.push("/add-challenge");
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchChallenges();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchChallenges();
      }
    },
  },
  mounted() {
    this.fetchChallenges();
  },
};
</script>
<style scoped>
.table {
  margin-top: 20px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05); /* Alternate row color */
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Hover effect */
}

.btn {
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
}

.d-flex {
  gap: 10px; /* Add gap between flex items */
}

.table-responsive {
  overflow-x: auto; /* Ensure responsiveness */
}

.pagination span {
  font-weight: bold;
  font-size: 1rem;
}
</style>
