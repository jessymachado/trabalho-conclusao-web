import { cadastroLocators as loc } from "./locators.js";
import { dadosUsuario } from "../../data/usuario.js";

class Cadastro {

  preencherFormularioDeCadastroCompleto() {
    cy.get(loc.radioGenero).check('Mrs');
    cy.get(loc.inputSenha).type('12345', { log: false });
    cy.get(loc.selectDia).select('22');
    cy.get(loc.selectMes).select('February');
    cy.get(loc.selectAno).select('1990');
    cy.get(loc.checkboxNewsletter).check();
    cy.get(loc.checkboxOptin).check();
    cy.get(loc.inputPrimeiroNome).type(dadosUsuario.primNome);
    cy.get(loc.inputSobrenome).type(dadosUsuario.sobrenome);
    cy.get(loc.inputCompanhia).type(dadosUsuario.companhia);
    cy.get(loc.inputEndereco).type(dadosUsuario.endereco);
    cy.get(loc.selectPais).select(dadosUsuario.cidade);
    cy.get(loc.inputEstado).type(dadosUsuario.estado);
    cy.get(loc.inputCidade).type('Los Angeles');
    cy.get(loc.inputCep).type(90001);
    cy.get(loc.inputTelefone).type(dadosUsuario.telefone);
    cy.get(loc.botaoCriarConta).click();
  }

  preencherAssinatura(emailAssinatura) {
    cy.scrollTo('bottom');
    cy.get(loc.secaoAssinatura).should('contain.text', 'Subscription');
    cy.get(loc.inputEmailAssinatura).type(emailAssinatura);
    cy.get(loc.botaoAssinar).click();
  }

  validarMensagemAssinaturaComSucesso() {
    cy.get(loc.mensagemSucessoAssinatura)
      .should('have.text', 'You have been successfully subscribed!');
  }

  validarMensagemContaCadastradaComSucesso() {
    cy.url().should('include', 'account_created');
    cy.contains('b', 'Account Created!');
    cy.get(loc.mensagemContaCriada)
      .should('have.text', 'Account Created!');
  }

  validarMensagemContaCadastradaComErro() {
    cy.get(loc.mensagemContaErro)
      .should('contain', 'Email Address already exist!');
  }

  validarMensagemContaExcluidaComSucesso() {
    cy.get(loc.mensagemContaExcluida).should('contain.text', 'Account Deleted!');
    cy.get(loc.mensagemContaExcluida).should('contain.text', 'Your account has been permanently deleted!');
    cy.get(loc.mensagemContaExcluida).should('contain.text', 'You can create new account to take advantage of member privileges to enhance your online shopping experience with us.');
    cy.get(loc.botaoContinuar).click();
  }
}

export default new Cadastro();
