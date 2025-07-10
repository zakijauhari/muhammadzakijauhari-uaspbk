<template>
  <div class="recent-activities">
    <h2>Aktivitas Terakhir</h2>
    <ul>
      <li v-for="activity in activities" :key="activity.id" class="activity-item">
        <i :class="activityIcon(activity.type)"></i>
        <div>
          <p>{{ activity.message }}</p>
          <small>{{ formatTime(activity.timestamp) }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { usePetShopStore } from '@/stores/petshop'
import { computed } from 'vue'

export default {
  setup() {
    const store = usePetShopStore()
    
    const activityIcon = (type) => {
      return {
        'boarding': 'fas fa-paw',
        'pickup': 'fas fa-home'
      }[type]
    }

    const formatTime = (timestamp) => {
      const now = new Date()
      const activityTime = new Date(timestamp)
      const diffHours = Math.floor((now - activityTime) / (1000 * 60 * 60))
      
      if (diffHours < 1) {
        const mins = Math.floor((now - activityTime) / (1000 * 60))
        return `${mins} menit lalu`
      } else if (diffHours < 24) {
        return `${diffHours} jam lalu`
      } else {
        const days = Math.floor(diffHours / 24)
        return `${days} hari lalu`
      }
    }

    return {
      activities: computed(() => store.activities),
      activityIcon,
      formatTime
    }
  }
}
</script>

<style scoped>
.recent-activities {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item i {
  font-size: 1.2rem;
  color: #4e342e;
}
</style>