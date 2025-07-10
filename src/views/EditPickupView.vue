<template>
  <div class="edit-pickup">
    <h1>Edit Data Pengambilan Hewan</h1>
    
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="ownerName">Nama Pemilik</label>
          <input 
            type="text" 
            id="ownerName" 
            v-model="form.ownerName" 
            required
            placeholder="Masukkan nama pemilik"
          >
        </div>
        
        <div class="form-group">
          <label for="petName">Nama Hewan</label>
          <input 
            type="text" 
            id="petName" 
            v-model="form.petName" 
            required
            placeholder="Masukkan nama hewan"
          >
        </div>
        
        <div class="form-group">
          <label for="pickupDate">Tanggal Pengambilan</label>
          <input 
            type="date" 
            id="pickupDate" 
            v-model="form.pickupDate" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="boardingId">ID Penitipan</label>
          <input 
            type="text" 
            id="boardingId" 
            v-model="form.boardingId" 
            placeholder="Masukkan ID penitipan"
          >
        </div>
        
        <div class="form-group">
          <label for="notes">Catatan</label>
          <textarea 
            id="notes" 
            v-model="form.notes" 
            rows="3"
            placeholder="Masukkan catatan tentang pengambilan"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="form.status" required>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-update">Update Data</button>
          <button type="button" class="btn-delete" @click="deletePickup">Hapus Data</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePetShopStore } from '@/stores/petshop'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = usePetShopStore()
    const pickupId = route.params.id
    
    const form = ref({
      ownerName: '',
      petName: '',
      pickupDate: '',
      boardingId: '',
      notes: '',
      status: 'completed'
    })
    
    onMounted(async () => {
      await store.fetchPickups()
      
      const pickup = store.pickups.find(p => p.id == pickupId)
      if (pickup) {
        form.value = {
          ownerName: pickup.ownerName,
          petName: pickup.petName,
          pickupDate: pickup.pickupDate,
          boardingId: pickup.boardingId || '',
          notes: pickup.notes || '',
          status: pickup.status || 'completed'
        }
      } else {
        router.push('/pickup-list')
      }
    })

    const submitForm = async () => {
      try {
        await store.updatePickup(pickupId, form.value)
        alert('Data pengambilan berhasil diupdate!')
        router.push('/pickup-list')
      } catch (error) {
        alert('Gagal mengupdate data: ' + error.message)
      }
    }

    const deletePickup = async () => {
      if (confirm('Apakah Anda yakin ingin menghapus data pengambilan ini?')) {
        try {
          await store.deletePickup(pickupId)
          alert('Data berhasil dihapus!')
          router.push('/pickup-list')
        } catch (error) {
          alert('Gagal menghapus data: ' + error.message)
        }
      }
    }

    return {
      form,
      submitForm,
      deletePickup
    }
  }
}
</script>

<style scoped>
.edit-pickup {
  padding: 20px;
  margin-top: 60px;
}

h1 {
  color: #4e342e;
  margin-bottom: 30px;
}

.form-container {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #4e342e;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-update {
  background: #4e342e;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  flex: 1;
}

.btn-update:hover {
  background: #6d4c41;
}

.btn-delete {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  flex: 1;
}

.btn-delete:hover {
  background: #b71c1c;
}
</style>