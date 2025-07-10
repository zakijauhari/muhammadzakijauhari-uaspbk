<template>
  <div class="edit-boarding">
    <h1>Edit Data Penitipan</h1>
    
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
          <label for="petType">Jenis Hewan</label>
          <select 
            id="petType" 
            v-model="form.petType" 
            @change="updateBreeds"
            required
          >
            <option value="" disabled>Pilih jenis hewan</option>
            <option v-for="pet in pets" :key="pet.id" :value="pet.name">
              {{ pet.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="petBreed">Ras Hewan</label>
          <select 
            id="petBreed" 
            v-model="form.petBreed" 
            required
            :disabled="!form.petType"
          >
            <option value="" disabled>Pilih ras hewan</option>
            <option v-for="breed in breeds" :key="breed" :value="breed">
              {{ breed }}
            </option>
          </select>
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
          <label for="boardingDate">Tanggal Penitipan</label>
          <input 
            type="date" 
            id="boardingDate" 
            v-model="form.boardingDate" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="duration">Durasi (hari)</label>
          <input 
            type="number" 
            id="duration" 
            v-model="form.duration" 
            min="1"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="notes">Catatan Khusus</label>
          <textarea 
            id="notes" 
            v-model="form.notes" 
            rows="3"
            placeholder="Masukkan catatan khusus tentang hewan"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="form.status" required>
            <option value="active">Aktif</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-update">Update Data</button>
          <button type="button" class="btn-delete" @click="deleteBoarding">Hapus Data</button>
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
    const boardingId = route.params.id
    
    const pets = ref([])
    const breeds = ref([])
    
    const form = ref({
      ownerName: '',
      petType: '',
      petBreed: '',
      petName: '',
      boardingDate: '',
      duration: 1,
      notes: '',
      status: 'active'
    })
    
    const updateBreeds = () => {
      const selectedPet = pets.value.find(pet => pet.name === form.value.petType)
      breeds.value = selectedPet ? selectedPet.breeds : []
    }
    
    onMounted(async () => {
      await store.fetchPets()
      await store.fetchBoardings()
      
      pets.value = store.pets
      
      const boarding = store.boardings.find(b => b.id == boardingId)
      if (boarding) {
        form.value = {
          ownerName: boarding.ownerName,
          petType: boarding.petType,
          petBreed: boarding.petBreed,
          petName: boarding.petName,
          boardingDate: boarding.boardingDate,
          duration: boarding.duration,
          notes: boarding.notes,
          status: boarding.status || 'active'
        }
        updateBreeds()
      } else {
        router.push('/boarding-list')
      }
    })

    const submitForm = async () => {
      try {
        await store.updateBoarding(boardingId, form.value)
        alert('Data berhasil diupdate!')
        router.push('/boarding-list')
      } catch (error) {
        alert('Gagal mengupdate data: ' + error.message)
      }
    }

    const deleteBoarding = async () => {
      if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        try {
          await store.deleteBoarding(boardingId)
          alert('Data berhasil dihapus!')
          router.push('/boarding-list')
        } catch (error) {
          alert('Gagal menghapus data: ' + error.message)
        }
      }
    }

    return {
      form,
      pets,
      breeds,
      updateBreeds,
      submitForm,
      deleteBoarding
    }
  }
}
</script>

<style scoped>
.edit-boarding {
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