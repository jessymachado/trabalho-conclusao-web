import { faker } from '@faker-js/faker'

export function getRandomNumber(){
    return faker.number.hex({ min: 10000, max:65535})
}

export function getRandomEmail(){
    return `qa-tester-${getRandomNumber()}@test.com`
}