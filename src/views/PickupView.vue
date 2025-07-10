<template>
  <div class="pickup">
    <h1>Form Pengambilan Hewan</h1>
    
    <div class="form-container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="boardingId">ID Penitipan</label>
          <input
            type="text"
            id="boardingId"
            v-model="form.boardingId"
            required
            placeholder="Masukkan ID penitipan (contoh: PS-202507001)"
            @blur="validateBoardingId"
          >
          <p v-if="invalidId" class="error-message">ID penitipan tidak valid atau sudah diambil</p>
        </div>

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
          <label for="notes">Catatan</label>
          <textarea
            id="notes"
            v-model="form.notes"
            rows="3"
            placeholder="Masukkan catatan tentang pengambilan"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">Konfirmasi Pengambilan</button>
          <button type="button" class="reset-btn" @click="resetForm">Reset Form</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { usePetShopStore } from '@/stores/petshop'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = usePetShopStore()
    const router = useRouter()
    const invalidId = ref(false)
    const isLoading = ref(false)

    const form = ref({
      boardingId: '',
      ownerName: '',
      petName: '',
      pickupDate: '',
      notes: ''
    })

    const validateBoardingId = async () => {
      if (!form.value.boardingId) return
      
      try {
        await store.fetchBoardings()
        const boarding = store.boardings.find(
          b => b.boardingId === form.value.boardingId && b.status === 'active'
        )
        
        if (boarding) {
          // Auto-fill pet and owner info if ID is valid
          form.value.petName = boarding.petName
          form.value.ownerName = boarding.ownerName
        }
        
        invalidId.value = !boarding
      } catch (error) {
        console.error('Validation error:', error)
        invalidId.value = true
      }
    }

    const handleSubmit = async () => {
      try {
        isLoading.value = true
        
        // Validate boarding ID first
        await validateBoardingId()
        if (invalidId.value) {
          throw new Error('ID penitipan tidak valid')
        }

        // Confirm with user
        if (!confirm(`Konfirmasi pengambilan untuk ${form.value.petName} (ID: ${form.value.boardingId})?`)) {
          return
        }

        // Process pickup - this will:
        // 1. Delete the boarding record
        // 2. Add pickup record
        // 3. Update stats
        await store.addPickup({
          ...form.value,
          createdAt: new Date().toISOString()
        })

        alert('Pengambilan berhasil dicatat!')
        resetForm()
        router.push('/pickup-list')
      } catch (error) {
        alert('Gagal: ' + error.message)
      } finally {
        isLoading.value = false
      }
    }

    const resetForm = () => {
      form.value = {
        boardingId: '',
        ownerName: '',
        petName: '',
        pickupDate: '',
        notes: ''
      }
      invalidId.value = false
    }

    return {
      form,
      invalidId,
      isLoading,
      validateBoardingId,
      handleSubmit,
      resetForm
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

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.error-message {
  color: #d32f2f;
  font-size: 0.8rem;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
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
  flex: 1;
}

.submit-btn:hover {
  background: #6d4c41;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.reset-btn {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  flex: 1;
}

.reset-btn:hover {
  background: #e0e0e0;
}
</style>