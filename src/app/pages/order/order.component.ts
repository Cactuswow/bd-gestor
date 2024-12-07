import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import SweetAlert from 'sweetalert2'
import type { Order } from '../../interfaces/order'
import { OrderService } from '../../services/order.service'

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderService = inject(OrderService)
  formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    deliveryDate: ['', Validators.required],
    customerId: ['', Validators.required],
    employeeId: ['', Validators.required],
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

    const result = await this.orderService.createOrder(
      this.form.value as Partial<Order>
    )

    if (result) {
      SweetAlert.fire({
        icon: 'success',
        title: 'Orden creado',
        text: 'El orden se ha creado correctamente'
      })

      return this.form.reset()
    }

    SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al crear el orden'
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
        text: 'Debes proporcionar una Id para modificar un orden'
      })

      return
    }

    const result = await this.orderService.updateOrder({
      id: Number(this.form.value.id),
      customerId: Number(this.form.value.customerId),
      employeeId: Number(this.form.value.employeeId),
      deliveryDate: this.form.value.deliveryDate!
    })

    if (result) {
      SweetAlert.fire({
        icon: 'success',
        title: 'Orden creado',
        text: 'El orden se ha creado correctamente'
      })

      return this.form.reset()
    }

    SweetAlert.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al crear el orden'
    })
  }

  async deleteUser() {
    const { value: id } = await SweetAlert.fire({
      title: 'Ingresa una Id de orden',
      input: 'number',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (!id) {
      return
    }

    this.orderService.deleteOrder(id)
  }
}
