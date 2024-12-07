import type { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full'
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./pages/customer/customer.component').then(
        m => m.CustomerComponent
      )
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('./pages/employee/employee.component').then(
        m => m.EmployeeComponent
      )
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./pages/order/order.component').then(m => m.OrderComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        m => m.NotFoundComponent
      )
  }
]
