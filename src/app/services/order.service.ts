import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import type { Order } from '../interfaces/order'
import { toPromise } from '../utils/promises'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpClient = inject(HttpClient)
  orders: Order[] = []

  constructor() {
    this.fetchOrders()
  }

  async fetchOrders() {
    try {
      const observable = this.httpClient.get<Order[]>('XXXXXXXXXXXXXXXXXXX')
      const response = await toPromise(observable)
      this.orders = response
    } catch {
      this.orders = [
        {
          id: 1,
          customerId: 1,
          date: '10-10-10',
          deliveryDate: '10-10-10',
          status: true,
          price: 100,
          employeeId: 1
        }
      ]
    }
  }

  async updateOrder(order: Partial<Order>) {
    try {
      const observer = this.httpClient.put<Order>(
        `XXXXXXXXXXXXXXXXXXX/${order.id}`,
        order
      )

      await toPromise(observer)
      await this.fetchOrders()
      return true
    } catch {
      console.error('Error updating order')
      return false
    }
  }

  async createOrder(order: Partial<Order>) {
    try {
      const observer = this.httpClient.post<Order>('XXXXXXXXXXXXXXXXXXX', order)

      await toPromise(observer)
      await this.fetchOrders()
      return true
    } catch {
      console.error('Error creating order')
      return false
    }
  }

  async deleteOrder(id: Order['id']) {
    try {
      const observer = this.httpClient.delete<Order>(
        `XXXXXXXXXXXXXXXXXXX/${id}`
      )

      await toPromise(observer)
      await this.fetchOrders()
      return true
    } catch {
      console.error('Error deleting order')
      return false
    }
  }
}
