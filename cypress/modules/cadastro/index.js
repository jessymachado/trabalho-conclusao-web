
import { dadosUsuario } from "../../data/usuario.js"

class Cadastro {
    preencherFormularioDeCadastroCompleto() {
        cy.get('input[type=radio]').check('Mrs')
        cy.get('input#password').type('12345', { log: false })
        cy.get('select[data-qa="days"]').select('22')
        cy.get('select[data-qa="months"]').select('February')
        cy.get('[data-qa="years"]').select('1990')
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('input#first_name').type(dadosUsuario.primNome)
        cy.get('input#last_name').type(dadosUsuario.sobrenome)
        cy.get('input#company').type(dadosUsuario.companhia)
        cy.get('input#address1').type(dadosUsuario.endereco)
        cy.get('select#country').select(dadosUsuario.cidade)
        cy.get('input#state').type(dadosUsuario.estado)
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type(90001)
        cy.get('[data-qa="mobile_number"]').type(dadosUsuario.telefone)
        cy.get('button[data-qa="create-account"]').click()
    }

    preencherAssinatura(emailAssinatura) {
        cy.scrollTo('bottom');
        cy.get('.single-widget').should('contain.text', 'Subscription')
        cy.get('[id="susbscribe_email"]').type(emailAssinatura)
        cy.get('button[id="subscribe"]').click()
    }

    validarMensagemAssinaturaComSucesso() {
        cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!')
    }

    validarMensagemContaCadastradaComSucesso() {
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    }

    validarMensagemContaCadastradaComErro() {
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    }

    validarMensagemContaExcluidaComSucesso() {
        cy.get('.container').should('contain.text', 'Account Deleted!')
        cy.get('.container').should('contain.text', 'Your account has been permanently deleted!')
        cy.get('.container').should('contain.text', 'You can create new account to take advantage of member privileges to enhance your online shopping experience with us.')
        cy.get('[data-qa="continue-button"]').click()
    }
}

export default new Cadastro()