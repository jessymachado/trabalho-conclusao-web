import { menuLocators as loc } from './locators.js';
const config = require('../../config/webApp.js');

class Menu {

  navegarParaPaginaInicial() {
    cy.visit(config.url);
    cy.get(loc.linkHome).should('be.visible').and('contain.text', 'Home');
  }

  navegarParaLogin() {
    cy.get(loc.linkLogin).click();
  }

  navegarParaContato() {
    cy.get(loc.linkContato).click();
  }

  efetuarLogout() {
    cy.get(loc.linkLogout).should('be.visible').click();
  }

  navegarParaProdutos() {
    cy.get(loc.linkProdutos).click();
  }

  navegarParaCarrinho() {
    cy.scrollTo('top');
    cy.get(loc.linkCarrinho).first().click();
    cy.get(loc.abaAtivaCarrinho).should('contain.text', 'Shopping Cart');
  }

  navegarParaExcluirConta() {
    cy.scrollTo('top');
    cy.get(loc.linkExcluirConta).click();
  }
}

export default new Menu();
