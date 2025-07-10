<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="PetShop Logo" class="logo-img">
      <h2>Tempat Teduh</h2>
    </div>
    <ul class="menu">
      <li>
        <router-link to="/" active-class="active">
          <i class="fas fa-tachometer-alt"></i> Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/boarding" active-class="active">
          <i class="fas fa-paw"></i> Penitipan Hewan
        </router-link>
      </li>
      <li>
        <router-link to="/pickup" active-class="active">
          <i class="fas fa-home"></i> Pengambilan Hewan
        </router-link>
      </li>
      <li>
  <router-link to="/boarding-list">
    <i class="fas fa-list"></i> Daftar Penitipan
  </router-link>
</li>
<li>
  <router-link to="/pickup-list">
    <i class="fas fa-list"></i> Daftar Pengambilan
  </router-link>
</li>
      <li>
        <router-link to="/reports" active-class="active">
          <i class="fas fa-chart-bar"></i> Laporan
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #4e342e;
  color: white;
  height: 100vh;
  position: fixed;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #6d4c41;
}

.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  margin: 15px 0;
}

.menu a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s;
}

.menu a:hover {
  background: #6d4c41;
}

.menu a.active {
  background: #8d6e63;
  font-weight: bold;
}

.menu i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}
</style>