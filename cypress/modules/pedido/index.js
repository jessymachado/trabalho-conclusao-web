import { dadosCartao } from "../../data/pagamento.js"

export function preencherInformacoesPagamento() {
    cy.get('[data-qa="name-on-card"]').type(dadosCartao.nomeCartao)
    cy.get('[data-qa="card-number"]').type(dadosCartao.numero)
    cy.get('[data-qa="cvc"]').type(dadosCartao.cvc)
    cy.get('[data-qa="expiry-month"]').type(dadosCartao.mesValid)
    cy.get('[data-qa="expiry-year"]').type(dadosCartao.anoValid)

    cy.get('[data-qa="pay-button"]').click()
}

export function validarMensagemPedidoComSucesso() {
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible').click()
    cy.contains('Order Placed!').should('be.visible').click()
}