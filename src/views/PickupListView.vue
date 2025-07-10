<template>
  <div class="pickup-list">
    <h1>Daftar Pengambilan Hewan</h1>
    
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pemilik</th>
            <th>Nama Hewan</th>
            <th>Tanggal Pengambilan</th>
            <th>ID Penitipan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pickups" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.ownerName }}</td>
            <td>{{ item.petName }}</td>
            <td>{{ formatDate(item.pickupDate) }}</td>
            <td>{{ item.boardingId || '-' }}</td>
            <td class="actions">
              <router-link :to="'/pickup/edit/' + item.id" class="btn-edit">Edit</router-link>
              <button @click="deletePickup(item.id)" class="btn-delete">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { usePetShopStore } from '@/stores/petshop'

export default {
  setup() {
    const store = usePetShopStore()
    const pickups = ref([])

    onMounted(async () => {
      await store.fetchPickups()
      pickups.value = store.pickups
    })

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('id-ID', options)
    }

    const deletePickup = async (id) => {
      if (confirm('Apakah Anda yakin ingin menghapus data pengambilan ini?')) {
        try {
          await store.deletePickup(id)
          pickups.value = pickups.value.filter(p => p.id !== id)
          alert('Data pengambilan berhasil dihapus!')
        } catch (error) {
          alert('Gagal menghapus data: ' + error.message)
        }
      }
    }

    return {
      pickups,
      formatDate,
      deletePickup
    }
  }
}
</script>

<style scoped>
.pickup-list {
  padding: 20px;
  margin-top: 60px;
}

.table-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #4e342e;
  color: white;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit {
  padding: 6px 12px;
  background-color: #4e342e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #6d4c41;
}

.btn-delete {
  padding: 6px 12px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #b71c1c;
}
</style>