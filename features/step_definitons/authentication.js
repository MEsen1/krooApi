import { Given, Then } from '@cucumber/cucumber'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const expect = chai.expect

export let authResponse
export let authToken

Given('I authenticate with username {string} and password {string}', async (username, password) => {
  await chai
    .request('https://restful-booker.herokuapp.com')
    .post('/auth')
    .set('Content-Type', 'application/json')
    .send({
      username: `${username}`,
      password: `${password}`,
    })
    .then((res) => {
      expect(res).to.be.json
      authResponse = res
      authToken = res.body.token
    })
  console.log('Authenctation Response Body', authResponse.body)
})

Then('The response should have status code {int}', async (statusCode) => {
  expect(authResponse).to.have.status(statusCode)
})

Then('The token should be generated', async () => {
  expect(authToken).to.be.a('string')
  console.log('Token', authToken)
  expect(authResponse.body).to.have.property('token')
})
