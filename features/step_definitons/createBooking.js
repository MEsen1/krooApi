import { bookingJSON } from '../../utils/bookingObject'
import { baseUrl } from '../../utils/config'
import { Given, When, Then } from '@cucumber/cucumber'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const expect = chai.expect

export let createBookingResponse
export let getBookingResponse
export let bookingId

const bookingObject = JSON.parse(bookingJSON) // Parse the bookingJSON string

When('I send a POST request to {string} with a valid body:', async (endpoint) => {
  await chai
    .request(baseUrl)
    .post(endpoint)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(bookingJSON)
    .then((res) => {
      expect(res).to.be.json
      createBookingResponse = res
    })

  console.log('Booking id from createBooking response', createBookingResponse.body)
})

Then('The response should have a bookingid', async () => {
  expect(createBookingResponse.body).to.have.property('bookingid')
  bookingId = createBookingResponse.body.bookingid
})

Given('I have a valid bookingid obtained from the create booking request', async () => {
  expect(bookingId).to.not.be.null
})

When('I send a GET request to {string}', async (endpoint) => {
  const param = endpoint.replace('{bookingid}', bookingId)
  await chai
    .request(baseUrl)
    .get(param)
    .set('Accept', 'application/json')
    .then((res) => {
      console.log('Response from get booking id call', res.body)
      getBookingResponse = res
    })
})

Then('The response should have the body properties that has been sent', async () => {
  expect(getBookingResponse.body.firstname).to.equal(bookingObject.firstname)
  expect(getBookingResponse.body.lastname).to.equal(bookingObject.lastname)
})
