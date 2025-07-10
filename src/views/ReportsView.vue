<template>
  <div class="reports">
    <h1>Laporan PetShop</h1>
    
    <div class="reports-container">
      <div class="report-card">
        <h2>Laporan Penitipan</h2>
        <p>Fitur laporan penitipan akan tersedia segera.</p>
      </div>
      
      <div class="report-card">
        <h2>Laporan Pengambilan</h2>
        <p>Fitur laporan pengambilan akan tersedia segera.</p>
      </div>
      
      <div class="report-card">
        <h2>Laporan Keuangan</h2>
        <p>Fitur laporan keuangan akan tersedia segera.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportsView'
}
</script>

<style scoped>
.reports {
  padding: 20px;
  margin-top: 60px;
}

h1 {
  color: #4e342e;
  margin-bottom: 30px;
}

.reports-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.report-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.report-card h2 {
  color: #4e342e;
  margin-top: 0;
}

.report-card p {
  color: #6d4c41;
}
</style>