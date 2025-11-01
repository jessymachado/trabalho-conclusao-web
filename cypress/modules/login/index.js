import { dadosUsuario } from "../../data/usuario.js"
import userData from '../../fixtures/example.json'

class Login {
    preencherFormularioDeLogin(usuario, password) {
        cy.get('[data-qa="login-email"]').type(usuario)
        cy.get('[data-qa="login-password"]').type(password)

        cy.get('[data-qa="login-button"]').click()
    }

    preencherFormularioDePreCadastro(emailNovoOuExistente) {
        cy.get('[data-qa="signup-name"]').type(`${dadosUsuario.primNome} ${dadosUsuario.sobrenome}`)
        cy.get('[data-qa="signup-email"]').type(`${emailNovoOuExistente}`)

        cy.contains('button', 'Signup').click()
    }

    validarMensagemLoginComSucesso() {
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
        cy.contains('b', userData.name)
        cy.contains(`Logged in as ${userData.name}`).should('be.visible')
    }

    validarMensagemLoginComErro() {
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    }

    validarLogoutComSucesso() {
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    }
}

export default new Login()