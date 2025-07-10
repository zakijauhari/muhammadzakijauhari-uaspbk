<template>
  <div class="boarding-list">
    <h1>Daftar Penitipan Hewan</h1>
    
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
             <th>ID</th>
            <th>Nama Pemilik</th>
            <th>Nama Hewan</th>
            <th>Jenis Hewan</th>
            <th>Tanggal Penitipan</th>
            <th>Durasi (hari)</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in boardings" :key="item.id">
            <td>{{ index + 1 }}</td>
             <td>{{ item.boardingId }}</td>
            <td>{{ item.ownerName }}</td>
            <td>{{ item.petName }}</td>
            <td>{{ item.petType }} ({{ item.petBreed }})</td>
            <td>{{ formatDate(item.boardingDate) }}</td>
            <td>{{ item.duration }}</td>
            <td>
              <span :class="`status-${item.status}`">
            {{ item.status === 'active' ? 'Aktif' : 'Selesai' }}
          </span>
            </td>
            <td class="action-buttons">
              <router-link 
                :to="'/boarding/edit/' + item.id" 
                class="btn-edit"
                title="Edit Data"
              >
                <i class="fas fa-edit"></i>
              </router-link>
              <button 
                @click="deleteBoarding(item.id)" 
                class="btn-delete"
                title="Hapus Data"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
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
  computed: {
    activeBoardings() {
      return this.store.boardings.filter(b => b.status === 'active')
    }
  },
  setup() {
    const store = usePetShopStore()
    const boardings = ref([])

    onMounted(async () => {
      await store.fetchBoardings()
      boardings.value = store.boardings
    })

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('id-ID', options)
    }

    const getStatusText = (status) => {
      const statusMap = {
        active: 'Aktif',
        completed: 'Selesai',
        cancelled: 'Dibatalkan'
      }
      return statusMap[status] || status
    }

    const deleteBoarding = async (id) => {
      if (confirm('Apakah Anda yakin ingin menghapus data penitipan ini?')) {
        try {
          await store.deleteBoarding(id)
          boardings.value = boardings.value.filter(b => b.id !== id)
        } catch (error) {
          alert('Gagal menghapus data: ' + error.message)
        }
      }
    }

    return {
      boardings,
      formatDate,
      getStatusText,
      deleteBoarding
    }
  }
}
</script>

<style scoped>

.status-active { color: green; }
.status-completed { color: red; text-decoration: line-through; }

.boarding-list {
  padding: 20px;
  margin-top: 60px;
}

h1 {
  color: #4e342e;
  margin-bottom: 30px;
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
  font-size: 0.9rem;
}

.table th, .table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.table th {
  background-color: #4e342e;
  color: white;
  position: sticky;
  top: 0;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.active {
  background: #c8e6c9;
  color: #2e7d32;
}

.status-badge.completed {
  background: #bbdefb;
  color: #1565c0;
}

.status-badge.cancelled {
  background: #ffcdd2;
  color: #c62828;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-edit, .btn-delete {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-edit {
  background: #4e342e;
  color: white;
}

.btn-edit:hover {
  background: #6d4c41;
}

.btn-delete {
  background: #d32f2f;
  color: white;
}

.btn-delete:hover {
  background: #b71c1c;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.8rem;
  }
  
  .table th, .table td {
    padding: 8px 10px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
}
</style>