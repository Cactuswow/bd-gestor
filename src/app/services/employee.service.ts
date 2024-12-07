import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import type { Employee } from '../interfaces/employee'
import { toPromise } from '../utils/promises'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpClient = inject(HttpClient)
  employees: Employee[] = []

  constructor() {
    this.fetchEmployees()
  }

  async fetchEmployees() {
    try {
      const observable = this.httpClient.get<Employee[]>('XXXXXXXXXXXXXXXXXXX')
      const response = await toPromise(observable)
      this.employees = response
    } catch {
      this.employees = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '000000000000',
          lastName: 'Doe',
          employeeType: 'A',
          salary: 10000
        }
      ]
    }
  }

  async updateEmployee(employee: Employee) {
    try {
      const observer = this.httpClient.put<Employee>(
        `XXXXXXXXXXXXXXXXXXX/${employee.id}`,
        employee
      )

      await toPromise(observer)
      await this.fetchEmployees()
      return true
    } catch {
      console.error('Error updating employee')
      return false
    }
  }

  async createEmployee(employee: Partial<Employee>) {
    try {
      const observer = this.httpClient.post<Employee>(
        'XXXXXXXXXXXXXXXXXXX',
        employee
      )

      await toPromise(observer)
      await this.fetchEmployees()
      return true
    } catch {
      console.error('Error creating employee')
      return false
    }
  }

  async deleteEmployee(id: Employee['id']) {
    try {
      const observer = this.httpClient.delete<Employee>(
        `XXXXXXXXXXXXXXXXXXX/${id}`
      )

      await toPromise(observer)
      await this.fetchEmployees()
      return true
    } catch {
      console.error('Error deleting employee')
      return false
    }
  }
}
