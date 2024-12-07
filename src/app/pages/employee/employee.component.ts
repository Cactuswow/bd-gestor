import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import SweetAlert from 'sweetalert2'
import type { Employee } from '../../interfaces/employee'
import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employeeService = inject(EmployeeService)
  formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    salary: ['', Validators.required],
    employeeType: ['', Validators.required],
    id: ''
  })

  async createUser() {
    if (!this.form.valid) {
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios'
      })

      return
    }

    const result = await this.employeeService.createEmployee(
      this.form.value as Partial<Employee>
    )

    if (result) {
      SweetAlert.fire({
        icon: 'success',
        title: 'Empleado creado',
        text: 'El empleado se ha creado correctamente'
      })

      return this.form.reset()
    }

    SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al crear el empleado'
    })
  }

  async updateUser() {
    if (!this.form.valid) {
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios'
      })

      return
    }

    if (!this.form.value.id) {
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes proporcionar una Id para modificar un usuario'
      })

      return
    }

    const result = await this.employeeService.updateEmployee({
      id: Number(this.form.value.id),
      email: this.form.value.email!,
      lastName: this.form.value.lastName!,
      name: this.form.value.name!,
      phone: this.form.value.phone!,
      employeeType: this.form.value.employeeType! as Employee['employeeType'],
      salary: Number(this.form.value.salary!)
    })

    if (result) {
      SweetAlert.fire({
        icon: 'success',
        title: 'Empleado creado',
        text: 'El empleado se ha creado correctamente'
      })

      return this.form.reset()
    }

    SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al crear el empleado'
    })
  }

  async deleteUser() {
    const { value: id } = await SweetAlert.fire({
      title: 'Ingresa una Id de usuario',
      input: 'number',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (!id) {
      return
    }

    this.employeeService.deleteEmployee(id)
  }
}
