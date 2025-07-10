<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="left">
        <h3>{{ currentRouteName }}</h3>
      </div>
      <div class="right">
        <div class="user-profile">
          <img src="@/assets/logo.png" alt="User" class="user-img">
          <span>Admin</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const route = useRoute()
    const currentRouteName = computed(() => {
      return route.name ? route.name.charAt(0).toUpperCase() + route.name.slice(1) : ''
    })

    const toggleSidebar = () => {
    }

    return { currentRouteName, toggleSidebar }
  }
}
</script>

<style scoped>
.navbar {
  background: white;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: fixed;
  width: calc(100% - 250px);
  margin-left: 250px;
  z-index: 1000;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left, .right {
  display: flex;
  align-items: center;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  margin-right: 20px;
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.user-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.fa-bell {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>