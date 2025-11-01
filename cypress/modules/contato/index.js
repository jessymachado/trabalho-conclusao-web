export function preencherFormularioFaleConosco(user, password) {
    cy.get('[data-qa="name"]').type(user)
    cy.get('[data-qa="email"]').type(password)
    cy.get('[data-qa="subject"]').type(`Elogio da promoção`)
    cy.get('[data-qa="message"]').type(`Estou muito satisfeita com a promoção que foi proposta.`)

    cy.fixture('../fixtures/teste.png').as('imagem')

    cy.get('input[name="upload_file"]').selectFile('@imagem')
    cy.get('input[name="submit"]').click()
}

export function validarMensagemFormularioCadastradoComSucesso() {
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
}