import { pedidoLocators as loc } from './locators.js';
import { dadosCartao } from "../../data/pagamento.js";

export function preencherInformacoesPagamento() {
  cy.get(loc.inputNomeCartao).type(dadosCartao.nomeCartao);
  cy.get(loc.inputNumeroCartao).type(dadosCartao.numero);
  cy.get(loc.inputCVC).type(dadosCartao.cvc);
  cy.get(loc.inputMesValidade).type(dadosCartao.mesValid);
  cy.get(loc.inputAnoValidade).type(dadosCartao.anoValid);

  cy.get(loc.botaoPagar).click();
}

export function validarMensagemPedidoComSucesso() {
  cy.contains(loc.mensagemPedidoConfirmado).should('be.visible').click();
  cy.contains(loc.mensagemPedidoRealizado).should('be.visible').click();
}
