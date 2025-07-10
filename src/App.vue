<template>
  <div class="app">
    <Sidebar />
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #f5f5f5;
  color: #333;
}

.app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding-top: 60px;
  min-height: 100vh;
}
</style>