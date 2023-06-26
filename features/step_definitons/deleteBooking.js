import { When, Then } from '@cucumber/cucumber'
import { baseUrl } from '../../utils/config'
import { bookingId } from './createBooking'
import { authToken } from './authentication'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const expect = chai.expect

let deleteResponse

When('I send a DELETE request to {string}', async (endpoint) => {
  await chai
    .request(baseUrl)
    .delete(endpoint.replace('{bookingid}', bookingId))
    .set('Content-Type', 'application/json')
    .set('Cookie', `token=${authToken}`)
    .then((res) => {
      expect(res).to.have.status(201)
      console.log('Response from delete booking', res.body)
      deleteResponse = res
    })
})

Then('the booking should be deleted successfully', async () => {
  expect(deleteResponse.body).to.be.empty
})
