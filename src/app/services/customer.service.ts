import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import type { Customer } from '../interfaces/customer'
import { toPromise } from '../utils/promises'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpClient = inject(HttpClient)
  customers: Customer[] = []

  constructor() {
    this.fetchCustomers()
  }

  async fetchCustomers() {
    try {
      const observable = this.httpClient.get<Customer[]>(
        'http://localhost:3000/customers'
      )
      const response = await toPromise(observable)
      this.customers = response
    } catch {
      this.customers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '000000000000',
          cityId: 1,
          lastName: 'Doe'
        }
      ]
    }
  }

  async updateCustomer(customer: Customer) {
    try {
      const observer = this.httpClient.put<Customer>(
        `http://localhost:3000/customers/${customer.id}`,
        customer
      )

      await toPromise(observer)
      await this.fetchCustomers()
      return true
    } catch {
      console.error('Error updating customer')
      return false
    }
  }

  async createCustomer(customer: Partial<Customer>) {
    try {
      const observer = this.httpClient.post<Customer>(
        'http://localhost:3000/customers',
        customer
      )

      await toPromise(observer)
      await this.fetchCustomers()
      return true
    } catch {
      console.error('Error creating customer')
      return false
    }
  }

  async deleteCustomer(id: Customer['id']) {
    try {
      const observer = this.httpClient.delete<Customer>(
        `http://localhost:3000/customers/${id}`
      )

      await toPromise(observer)
      await this.fetchCustomers()
      return true
    } catch {
      console.error('Error deleting customer')
      return false
    }
  }
}
