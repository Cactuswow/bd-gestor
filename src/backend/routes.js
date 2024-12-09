const { Router } = require('express')
const { Pg } = require('./model.js')

/* Enviar las peticiones como lo marca la interfaz (app/interfaces/*.ts) */

const router = Router()

router.get('/customers', async (_req, res) => {
  const pg = new Pg().getClient
  const customers = await pg.query(
    `SELECT ctr_id as id,
     concat(first_name, ' ', middle_name) as name,
     concat(first_last_name, ' ', middle_last_name) as "lastName",
     phone_number as phone,
     email,
     cty_id as cityId
     FROM sk.customers;
    `
  )
  res.json(customers)
})

router.post('/customers', async (req, res) => {
  const pg = new Pg().getClient
  const { name, lastName, phone, email, cityId } = req.body

  const [firstName, middleName] = name
  const [firstLastName, middleLastName] = lastName

  const customers = await pg.query(
    `INSERT INTO sk.customers (first_name, middle_name, first_last_name, middle_last_name, phone_number, email, cty_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING ctr_id as id;
    `,
    [firstName, middleName, firstLastName, middleLastName, phone, email, cityId]
  )

  res.json(customers)
})

router.put('/customers/:id', async (req, res) => {
  const pg = new Pg().getClient
  const { name, lastName, phone, email, cityId } = req.body

  const [firstName, middleName] = name
  const [firstLastName, middleLastName] = lastName

  const customers = await pg.query(
    `UPDATE sk.customers
     SET first_name = $1, middle_name = $2, first_last_name = $3, middle_last_name = $4, phone_number = $5, email = $6, cty_id = $7
     WHERE ctr_id = $8;
    `,
    [
      firstName,
      middleName,
      firstLastName,
      middleLastName,
      phone,
      email,
      cityId,
      req.params.id
    ]
  )

  res.json(customers)
})

router.delete('/customers/:id', async (req, res) => {
  const pg = new Pg().getClient
  const customers = await pg.query(
    `DELETE FROM sk.customers
     WHERE ctr_id = $1;
    `,
    [req.params.id]
  )

  res.json(customers)
})

router.get('/employees', async (_req, res) => {
  const pg = new Pg().getClient
  const employees = await pg.query(
    `SELECT epe_id as id,
     concat(first_name, ' ', middle_name) as name,
     concat(first_last_name, ' ', middle_last_name) as "lastName",
     phone_number as phone,
     email,
     salary,
     employee_type as "employeeType"
     FROM sk.employees;
    `
  )

  res.json(employees)
})

router.post('/employees', async (req, res) => {
  const pg = new Pg().getClient
  const { name, lastName, phone, email, salary, employeeType } = req.body

  const [firstName, middleName] = name
  const [firstLastName, middleLastName] = lastName

  const employees = await pg.query(
    `INSERT INTO sk.employees (first_name, middle_name, first_last_name, middle_last_name, phone_number, email, salary, employee_type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING epe_id as id;
    `,
    [
      firstName,
      middleName,
      firstLastName,
      middleLastName,
      phone,
      email,
      salary,
      employeeType
    ]
  )

  res.json(employees)
})

router.put('/employees/:id', async (req, res) => {
  const pg = new Pg().getClient
  const { name, lastName, phone, email, salary, employeeType } = req.body

  const [firstName, middleName] = name
  const [firstLastName, middleLastName] = lastName

  const employees = await pg.query(
    `UPDATE sk.employees
     SET first_name = $1, middle_name = $2, first_last_name = $3, middle_last_name = $4, phone_number = $5, email = $6, salary = $7, employee_type = $8
     WHERE epe_id = $9;
    `,
    [
      firstName,
      middleName,
      firstLastName,
      middleLastName,
      phone,
      email,
      salary,
      employeeType,
      req.params.id
    ]
  )

  res.json(employees)
})

router.delete('/employees/:id', async (req, res) => {
  const pg = new Pg().getClient
  const employees = await pg.query(
    `DELETE FROM sk.employees
     WHERE epe_id = $1;
    `,
    [req.params.id]
  )

  res.json(employees)
})

router.get('/orders', async (_req, res) => {
  const pg = new Pg().getClient
  const orders = await pg.query(
    `SELECT odr_id as id,
     ctr_id as "customerId",
     epe_id as "employeeId",
     TO_CHAR(odr_date, 'YYYY-MM-DD') as date,
     odr_status as status,
     total_price as price,
     TO_CHAR(delivery_date, 'YYYY-MM-DD') as "deliveryDate"
     FROM sk.orders;
    `
  )

  res.json(orders)
})

router.post('/orders', async (req, res) => {
  const pg = new Pg().getClient
  const { customerId, employeeId, deliveryDate } = req.body

  const orders = await pg.query(
    `INSERT INTO sk.orders (ctr_id, epe_id, odr_date, odr_status, total_price, delivery_date)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING odr_id as id;
    `,
    [customerId, employeeId, new Date(), false, 0, deliveryDate]
  )

  res.json(orders)
})

router.put('/orders/:id', async (req, res) => {
  const pg = new Pg().getClient
  const { customerId, employeeId, deliveryDate } = req.body

  const orders = await pg.query(
    `UPDATE sk.orders
     SET ctr_id = $1, epe_id = $2, delivery_date = $3
     WHERE odr_id = $4;
    `,
    [customerId, employeeId, deliveryDate, req.params.id]
  )

  res.json(orders)
})

router.delete('/orders/:id', async (req, res) => {
  const pg = new Pg().getClient
  const orders = await pg.query(
    `DELETE FROM sk.orders
     WHERE odr_id = $1;
    `,
    [req.params.id]
  )

  res.json(orders)
})

module.exports = { router }
