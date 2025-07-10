import { defineStore } from 'pinia'
import axios from 'axios'

export const usePetShopStore = defineStore('petshop', {
  state: () => ({
    boardings: [],
    pickups: [],
    pets: [],
    stats: {},
    loading: false,
    error: null
  }),
  actions: {
    async fetchPets() {
      try {
        this.loading = true
        const response = await axios.get('http://localhost:3000/pets')
        this.pets = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async fetchStats() {
      try {
        const response = await axios.get('http://localhost:3000/stats')
        this.stats = response.data
      } catch (error) {
        this.error = error.message
      }
    },
    async addBoarding(boardingData) {
      try {
        const response = await axios.post('http://localhost:3000/boardings', boardingData)
        this.boardings.push(response.data)
        await this.updateStats('boarding')
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },
    async addPickup(pickupData) {
      try {
        const response = await axios.post('http://localhost:3000/pickups', {
          ...pickupData,
          status: 'completed',
          createdAt: new Date().toISOString()
        });

        this.pickups.push(response.data);
        await this.updateStats('pickup', 1); // Tambah statistik

        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },
    async updateStats(type) {
      try {
        const currentStats = { ...this.stats }
        if (type === 'boarding') {
          currentStats.total_boarding += 1
        } else if (type === 'pickup') {
          currentStats.total_pickup += 1
        }

        await axios.patch('http://localhost:3000/stats', currentStats)
        this.stats = currentStats
      } catch (error) {
        this.error = error.message
      }
    },
    async fetchBoardings() {
      try {
        const response = await axios.get('http://localhost:3000/boardings')
        this.boardings = response.data
      } catch (error) {
        this.error = error.message
      }
    },
    async fetchPickups() {
      try {
        const response = await axios.get('http://localhost:3000/pickups')
        this.pickups = response.data
      } catch (error) {
        this.error = error.message
      }
    },
    async updateBoarding(id, boardingData) {
      try {
        const response = await axios.put(`http://localhost:3000/boardings/${id}`, boardingData)
        const index = this.boardings.findIndex(b => b.id === id)
        if (index !== -1) {
          this.boardings[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async deleteBoarding(id) {
      try {
       
        const boardingToDelete = this.boardings.find(b => b.id === id);

        await axios.delete(`http://localhost:3000/boardings/${id}`);

       
        this.boardings = this.boardings.filter(b => b.id !== id);

       
        if (boardingToDelete?.status === 'active') {
          await this.updateStats('boarding', -1);
        }

        return true;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },


   
    async updatePickup(id, pickupData) {
      try {
        const response = await axios.put(`http://localhost:3000/pickups/${id}`, pickupData)
        const index = this.pickups.findIndex(p => p.id === id)
        if (index !== -1) {
          this.pickups[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

  
    async deletePickup(id) {
      try {
        await axios.delete(`http://localhost:3000/pickups/${id}`)
        this.pickups = this.pickups.filter(p => p.id !== id)
        await this.updateStats('pickup', -1) 
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async updateStats(type, amount = 1) {
      try {
        const { data: currentStats } = await axios.get('http://localhost:3000/stats');

        const updatedStats = { ...currentStats };

        if (type === 'boarding') {
          updatedStats.total_boarding = Math.max(0, currentStats.total_boarding + amount);
        } else if (type === 'pickup') {
          updatedStats.total_pickup = Math.max(0, currentStats.total_pickup + amount);
        }

        await axios.patch('http://localhost:3000/stats', updatedStats);
        this.stats = updatedStats;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async updateBoardingStatus(boardingId, newStatus) {
      try {
        const boarding = this.boardings.find(b => b.boardingId === boardingId)
        if (!boarding) throw new Error('Data penitipan tidak ditemukan')

        const response = await axios.patch(
          `http://localhost:3000/boardings/${boarding.id}`,
          { status: newStatus }
        )

        const index = this.boardings.findIndex(b => b.id === boarding.id)
        if (index !== -1) {
          this.boardings[index] = response.data
        }

        // Update statistik
        await this.updateStats('boarding', newStatus === 'active' ? 1 : -1)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

     async validateBoardingId(boardingId) {
      await this.fetchBoardings()
      return this.boardings.some(
        b => b.boardingId === boardingId && b.status === 'active'
      )
    }

  }
})