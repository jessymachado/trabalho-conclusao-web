import { contatoLocators as loc } from './locators.js';

export function preencherFormularioFaleConosco(user, email) {
  cy.get(loc.inputNome).type(user);
  cy.get(loc.inputEmail).type(email);
  cy.get(loc.inputAssunto).type('Elogio da promoção');
  cy.get(loc.textareaMensagem).type('Estou muito satisfeita com a promoção que foi proposta.');

  cy.fixture('../fixtures/teste.png').as('imagem');
  cy.get(loc.inputArquivo).selectFile('@imagem');
  cy.get(loc.botaoSubmit).click();
}

export function validarMensagemFormularioCadastradoComSucesso() {
  cy.get(loc.statusMensagem).should('be.visible');
  cy.get(loc.statusMensagem).should('have.text', 'Success! Your details have been submitted successfully.');
}
