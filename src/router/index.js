import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import BoardingView from '../views/BoardingView.vue'
import PickupView from '../views/PickupView.vue'
import ReportsView from '../views/ReportsView.vue'
import BoardingListView from '../views/BoardingListView.vue'
import PickupListView from '../views/PickupListView.vue'
import EditBoardingView from '../views/EditBoardingView.vue'
import EditPickupView from '../views/EditPickupView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/boarding',
    name: 'Penitipan',
    component: BoardingView
  },
  {
    path: '/pickup',
    name: 'Pengambilan',
    component: PickupView
  },
  {
    path: '/reports',
    name: 'Laporan',
    component: ReportsView
  },
  {
    path: '/boarding-list',
    name: 'Daftar Penitipan',
    component: BoardingListView
  },
  {
    path: '/pickup-list',
    name: 'Daftar Pengambilan',
    component: PickupListView
  },
  {
  path: '/boarding/edit/:id',
  name: 'Edit Penitipan',
  component: EditBoardingView
},
{
  path: '/pickup/edit/:id',
  name: 'Edit Pengambilan',
  component: EditPickupView
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router