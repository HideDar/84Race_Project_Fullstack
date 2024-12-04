<template>
    <div class="club-management">
        <h1>Quản lý CLB</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên CLB</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(club, index) in clubs" :key="club._id">
                    <th scope="row">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</th>
                    <td>{{ club.name }}</td>
                    <td>{{ club.description }}</td>
                    <td class="d-flex gap-2">
                        <button class="btn btn-primary" @click="editClub(club.club_id)">Sửa</button>
                        <button class="btn btn-danger"@click="deleteClub(club.club_id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ClubManagement',
}
</script>

<style scoped>

</style>

