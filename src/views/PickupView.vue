<template>
  <div class="pickup">
    <h1>Form Pengambilan Hewan</h1>
    
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
          <label for="boardingId">ID Penitipan (opsional)</label>
          <input 
            type="text" 
            id="boardingId" 
            v-model="form.boardingId" 
            placeholder="Masukkan ID penitipan jika ada"
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
        
        <button type="submit" class="submit-btn">Simpan Pengambilan</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { usePetShopStore } from '@/stores/petshop'

export default {
  setup() {
    const store = usePetShopStore()
    
    const form = ref({
      ownerName: '',
      petName: '',
      pickupDate: '',
      boardingId: '',
      notes: ''
    })
    
    const submitForm = async () => {
      const pickupData = {
        ownerName: form.value.ownerName,
        petName: form.value.petName,
        pickupDate: form.value.pickupDate,
        boardingId: form.value.boardingId,
        notes: form.value.notes,
        createdAt: new Date().toISOString()
      }
      
    try {
        await store.addPickup(form.value)
        alert('Pengambilan berhasil dicatat!')
        router.push('/pickup-list') // Redirect ke daftar
      } catch (error) {
        alert('Gagal: ' + error.message)
      }
    }
    
    const resetForm = () => {
      form.value = {
        ownerName: '',
        petName: '',
        pickupDate: '',
        boardingId: '',
        notes: ''
      }
    }
    
    return {
      form,
      submitForm
    }
  }
}
</script>

<style scoped>
.pickup {
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

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
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