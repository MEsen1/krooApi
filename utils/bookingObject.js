import { faker } from '@faker-js/faker'
import moment from 'moment'

const bookingObject = {
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  totalprice: 111,
  depositpaid: false,
  bookingdates: {
    checkin: moment().add(1, 'days').format('YYYY-MM-DD'),
    checkout: moment().add(4, 'days').format('YYYY-MM-DD'),
  },
  additionalneeds: 'Breakfast'
}

export const bookingJSON = JSON.stringify(bookingObject)
