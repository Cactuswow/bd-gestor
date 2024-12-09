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
      const observable = this.httpClient.get<Employee[]>('http://localhost:3000/employees')
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
        `http://localhost:3000/employees/${employee.id}`,
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
        'http://localhost:3000/employees',
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
        `http://localhost:3000/employees/${id}`
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
