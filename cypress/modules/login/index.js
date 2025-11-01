import { loginLocators as loc } from './locators.js';
import { dadosUsuario } from '../../data/usuario.js';
import userData from '../../fixtures/example.json';

class Login {

  preencherFormularioDeLogin(usuario, password) {
    cy.get(loc.inputEmailLogin).type(usuario);
    cy.get(loc.inputSenhaLogin).type(password);
    cy.get(loc.botaoLogin).click();
  }

  preencherFormularioDePreCadastro(emailNovoOuExistente) {
    cy.get(loc.inputNomePreCadastro).type(`${dadosUsuario.primNome} ${dadosUsuario.sobrenome}`);
    cy.get(loc.inputEmailPreCadastro).type(emailNovoOuExistente);
    cy.contains('button', 'Signup').click();
  }

  validarMensagemLoginComSucesso() {
    cy.get(loc.iconeUsuario).parent().should('contain', userData.name);
    cy.get(loc.linkLogout).should('be.visible');
    cy.contains('b', loc.nomeUsuario(userData));
    cy.contains(loc.textoUsuarioLogado(userData)).should('be.visible');
  }

  validarMensagemLoginComErro() {
    cy.get(loc.mensagemErroLogin).should('contain', 'Your email or password is incorrect!');
  }

  validarLogoutComSucesso() {
    cy.get(loc.linkLogout).should('not.exist');
    cy.get(loc.linkLogin).should('contain', 'Signup / Login');
  }
}

export default new Login();
