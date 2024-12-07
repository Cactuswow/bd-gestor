import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import SweetAlert from 'sweetalert2'
import type { Customer } from '../../interfaces/customer'
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customerService = inject(CustomerService)
  formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    cityId: ['', Validators.required],
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

    const result = await this.customerService.createCustomer(
      this.form.value as Partial<Customer>
    )

    if (result) {
      SweetAlert.fire({
        icon: 'success',
        title: 'Cliente creado',
        text: 'El cliente se ha creado correctamente'
      })

      return this.form.reset()
    }

    SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al crear el cliente'
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

    const result = await this.customerService.updateCustomer({
      id: Number(this.form.value.id),
      cityId: Number(this.form.value.cityId),
      email: this.form.value.email!,
      lastName: this.form.value.lastName!,
      name: this.form.value.name!,
      phone: this.form.value.phone!
    })

    if (result) {
      SweetAlert.fire({
        icon: 'success',
        title: 'Cliente creado',
        text: 'El cliente se ha creado correctamente'
      })

      return this.form.reset()
    }

    SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al crear el cliente'
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

    this.customerService.deleteCustomer(id)
  }
}
