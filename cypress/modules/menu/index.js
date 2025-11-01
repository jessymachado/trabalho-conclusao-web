const config = require('../../config/webApp.js');

class Menu {

  navegarParaPaginaInicial() {
    cy.visit(config.url)
    cy.get('a[href="/"]').should('be.visible').and('contain.text', 'Home')
  }

  navegarParaLogin() {
    cy.get('a[href="/login"]').click()
  }

  navegarParaContato() {
    cy.get('a[href="/contact_us"]').click()
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click()
  }

  navegarParaProdutos() {
    cy.get('a[href="/products"]').click()
  }

  navegarParaCarrinho() {        
    cy.scrollTo('top');
    cy.get('a[href="/view_cart"]').first().click(); 
    cy.get('.active').should('contain.text', 'Shopping Cart')
  }

  navegarParaExcluirConta() {        
    cy.scrollTo('top');
    cy.get('a[href="/delete_account"]').click();     
  }  
}

export default new Menu()