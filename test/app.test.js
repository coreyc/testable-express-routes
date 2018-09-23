const request = require('supertest')

const { app } = require('../src/app')
const { createTable, dropTable } = require('../src/db-utils')

describe('POST /api/user', () => {
  before(async () => {
    await createTable('admin')
    await createTable('member')
  })

  after(async () => {
    await dropTable('admin')
    await dropTable('member')
  })

  // integration test should not drive the business logic (i.e. - testing different reports and that logic), it should test that intergation works
  it('should respond with 200 if user account created successfully', async () => {
    await request(app)
      .post('/api/user')
      .send({user_name: "ccleary00", user_type: "admin"})
      .set('Accept', 'application/json')
      .expect(201)
  })
})