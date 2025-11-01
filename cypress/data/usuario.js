import { faker } from '@faker-js/faker';

var Chance = require('chance');
var chance = new Chance();


export const dadosUsuario = {
    primNome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    telefone: '111 222 333',    
    companhia: faker.company.name(),
    endereco: faker.location.streetAddress(),
    cidade: 'Canada',
    estado: chance.state()
};
