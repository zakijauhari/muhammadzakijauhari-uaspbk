<template>
  <div class="boarding">
    <h1>Form Penitipan Hewan</h1>
    
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
            <option value="" disabled selected>Pilih jenis hewan</option>
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
            <option value="" disabled selected>Pilih ras hewan</option>
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
        
        <button type="submit" class="submit-btn">Simpan Penitipan</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { usePetShopStore } from '@/stores/petshop'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = usePetShopStore()
    const router = useRouter()
    const pets = ref([])
    const breeds = ref([])
    
    const form = ref({
      ownerName: '',
      petType: '',
      petBreed: '',
      petName: '',
      boardingDate: '',
      duration: 1,
      notes: ''
    })
    
    const updateBreeds = () => {
      const selectedPet = pets.value.find(pet => pet.name === form.value.petType)
      breeds.value = selectedPet ? selectedPet.breeds : []
      form.value.petBreed = ''
    }
    
    const submitForm = async () => {
      try {
        const boardingData = {
          ...form.value,
          status: 'active',
          createdAt: new Date().toISOString()
        }
        
        await store.addBoarding(boardingData)
        alert('Penitipan berhasil disimpan!')
        router.push('/boarding-list')
      } catch (error) {
        alert('Gagal menyimpan data: ' + error.message)
      }
    }

    onMounted(async () => {
      try {
        await store.fetchPets()
        pets.value = store.pets
        console.log('Pets data loaded:', pets.value)
      } catch (error) {
        console.error('Failed to load pets:', error)
      }
    })

    return {
      form,
      pets,
      breeds,
      updateBreeds,
      submitForm
    }
  }
}
</script>

<style scoped>
.boarding {
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

.submit-btn {
  background: #4e342e;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  width: 100%;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #6d4c41;
}
</style>