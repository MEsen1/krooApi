import { Given, When, Then } from '@cucumber/cucumber'
import { baseUrl } from '../../utils/config'
import { bookingId } from './createBooking'
import { bookingJSON } from '../../utils/bookingObject'
import { authToken } from './authentication'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const expect = chai.expect

let originalBooking
let updatedBooking
let requestBody
let parsedRequestBody

Given('I have a booking with given ID', async () => {
  expect(bookingId).to.exist
  console.log('Booking id from update booking', bookingId)
  originalBooking = JSON.parse(bookingJSON)
})

When('I send a PUT request to {string} with updated details', async (endpoint) => {
  const updatedBookingObject = { ...originalBooking }
  updatedBookingObject.firstname = 'ChangedName'
  updatedBookingObject.lastname = 'ChangedSurname'
  updatedBookingObject.totalprice = 3333

  requestBody = JSON.stringify(updatedBookingObject)
  await chai
    .request(baseUrl)
    .put(endpoint.replace('{bookingid}', bookingId))
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', `token=${authToken}`)
    .send(requestBody)
    .then((res) => {
      expect(res).to.have.status(200)
      console.log('Update booking response body', res.body)
      updatedBooking = res.body
    })
})

When('I send a PATCH request to {string} with partial updates', async (endpoint) => {
  requestBody = {
    firstname: 'ChangedPartiallyName',
    lastname: 'ChangedPartiallySurname',
  }
  await chai
    .request(baseUrl)
    .patch(endpoint.replace('{bookingid}', bookingId))
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cookie', `token=${authToken}`)
    .send(requestBody)
    .then((res) => {
      expect(res).to.have.status(200)
      console.log('Partially updated booking response body', res.body)
      updatedBooking = res.body
    })
})

Then('The booking should be updated successfully', async () => {
  console.log('Request body', JSON.parse(requestBody))
  parsedRequestBody = JSON.parse(requestBody)
  expect(updatedBooking.firstname).to.equal(parsedRequestBody.firstname)
  expect(updatedBooking.lastname).to.equal(parsedRequestBody.lastname)
  expect(updatedBooking.totalprice).to.equal(parsedRequestBody.totalprice)
})

Then('The booking should be partially updated successfully', async () => {
  expect(updatedBooking.firstname).to.equal(requestBody.firstname)
  expect(updatedBooking.lastname).to.equal(requestBody.lastname)
})
