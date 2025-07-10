<template>
  <div class="dashboard">
    <h1>Dashboard PetShop</h1>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #ffcdd2;">
          <i class="fas fa-paw"></i>
        </div>
        <div class="stat-info">
          <h3>{{ stats.total_boarding || 0 }}</h3>
          <p>Total Penitipan</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #c8e6c9;">
          <i class="fas fa-home"></i>
        </div>
        <div class="stat-info">
          <h3>{{ stats.total_pickup || 0 }}</h3>
          <p>Total Pengambilan</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #bbdefb;">
          <i class="fas fa-dog"></i>
        </div>
        <div class="stat-info">
          <h3>{{ stats.available_pets || 0 }}</h3>
          <p>Jenis Hewan Tersedia</p>
        </div>
      </div>
    </div>

    <div class="recent-activity">
      <h2>Aktivitas Terakhir</h2>
      <div class="activity-list">
        <div class="activity-item" v-for="(item, index) in recentActivities" :key="index">
          <div class="activity-icon">
            <i :class="item.icon"></i>
          </div>
          <div class="activity-details">
            <p>{{ item.message }}</p>
            <small>{{ item.time }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { usePetShopStore } from '@/stores/petshop'

export default {
  setup() {
    const store = usePetShopStore()
    const recentActivities = ref([
      { icon: 'fas fa-paw', message: 'Penitipan baru untuk Max (Golden Retriever)', time: '2 jam lalu' },
      { icon: 'fas fa-home', message: 'Pengambilan Bella (Persian Cat)', time: '5 jam lalu' },
      { icon: 'fas fa-paw', message: 'Penitipan baru untuk Rocky (Bulldog)', time: '1 hari lalu' }
    ])

    onMounted(async () => {
      await store.fetchStats()
    })

    return {
      stats: store.stats,
      recentActivities
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
  margin-top: 60px;
}

h1 {
  color: #4e342e;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 1.2rem;
}

.stat-info h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #4e342e;
}

.stat-info p {
  margin: 5px 0 0;
  color: #6d4c41;
}

.recent-activity {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.recent-activity h2 {
  color: #4e342e;
  margin-top: 0;
}

.activity-list {
  margin-top: 15px;
}

.activity-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #6d4c41;
}

.activity-details p {
  margin: 0;
  color: #4e342e;
}

.activity-details small {
  color: #9e9e9e;
  font-size: 0.8rem;
}
</style>