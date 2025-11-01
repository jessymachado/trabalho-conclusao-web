import { faker } from '@faker-js/faker';

export const dadosCartao = {
  nomeCartao: `${faker.person.firstName()} ${faker.person.lastName()}`,
  numero: faker.finance.creditCardNumber('#### #### #### ####'),
  cvc: faker.number.int({ min: 100, max: 999 }),
  mesValid: String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0'),
  anoValid: String(faker.date.future({ years: 5 }).getFullYear())
}
