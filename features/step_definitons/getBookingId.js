import { Given, When, Then } from '@cucumber/cucumber'
import { createBookingResponse } from './createBooking'
import { baseUrl } from '../../utils/config'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const expect = chai.expect
let filterRes

Given('I send a GET request to {string} with firstname and lastname queries', async (endpoint) => {
  await chai
    .request(baseUrl)
    .get(endpoint)
    .query({
      firstname: createBookingResponse.body.booking.firstname,
      lastname: createBookingResponse.body.booking.lastname,
    })
    .then((res) => {
      expect(res).to.have.status(200)
      filterRes = res
    })
  console.log('Filter by name response body', filterRes.body)
})

Given('I send a GET request to {string} with checkin and checkout queries', async (endpoint) => {
  await chai
    .request(baseUrl)
    .get(endpoint)
    .query({
      checkin: createBookingResponse.body.booking.bookingdates.checkin,
      checkout: createBookingResponse.body.booking.bookingdates.checkout,
    })
    .then((res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.not.be.empty
      console.log('Filter by dates response', res.body)
      filterRes = res
    })
})

When('I receive a booking ID', async () => {
  expect(filterRes.body).to.be.an('array')
  expect(filterRes.body[0]).to.have.property('bookingid')
})

Then("Booking ID filter by name should match with created user's ID", async () => {
  expect(createBookingResponse.body.bookingid).to.be.equal(filterRes.body[0].bookingid)
})

Then("Booking ID filter by checkin/checkout date should match with created user's ID", async () => {
  expect(createBookingResponse.body.bookingid).to.be.equal(filterRes.body[0].bookingid)
})
