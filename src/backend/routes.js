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

module.exports = { router }
