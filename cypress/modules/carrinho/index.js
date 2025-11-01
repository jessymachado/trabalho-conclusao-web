import { dadosUsuario } from "../../data/usuario.js"

class Carrinho {
    incluirTresProdutos() {
        const produtos = [1, 3, 5];

        produtos.forEach((codProdutoInformado) => {
            cy.get(`.features_items a[data-product-id="${codProdutoInformado}"]`)
                .first()
                .should('be.visible')
                .click();

            cy.get('#cartModal')
                .should('have.class', 'show')
                .and('be.visible');

            cy.get('.modal-backdrop').should('not.exist');

            cy.xpath('//div[@id="cartModal" and contains(@class,"show")]//button[contains(@class,"close-modal") and normalize-space()="Continue Shopping"]')
                .should('exist')
                .click();
        });
    }

    prosseguirParaFinalizarCompra(){
        cy.contains('Proceed To Checkout').should('be.visible').click()
    }

    validarTresProdutosIncluidosNoCarrinho() {
        cy.xpath('//div[@class="table-responsive cart_info"]')
            .find('tr')
            .then(($rows) => {
                const qtd = $rows.length - 1;
                cy.log('Quantidade de produtos no carrinho:', qtd);
                expect(qtd).to.eq(3);
            });
    }
    validarOsDetalhesDoEndereco() {
        cy.contains('Address Details').should('be.visible')
        cy.get('#address_delivery').should('contain.text', 'Your delivery address')
        cy.get('#address_delivery').should('contain.text', `Mrs. ${dadosUsuario.primNome} ${dadosUsuario.sobrenome}`)
        cy.get('#address_delivery').should('contain.text', `${dadosUsuario.companhia}`)
        cy.get('#address_delivery').should('contain.text', `${dadosUsuario.endereco}`)
        cy.get('#address_delivery').should('contain.text', `${dadosUsuario.cidade}`)
        cy.get('#address_delivery').should('contain.text', `${dadosUsuario.telefone}`)

        cy.get('#address_invoice').should('contain.text', 'Your billing address')
        cy.get('#address_invoice').should('contain.text', `Mrs. ${dadosUsuario.primNome} ${dadosUsuario.sobrenome}`)
        cy.get('#address_invoice').should('contain.text', `${dadosUsuario.companhia}`)
        cy.get('#address_invoice').should('contain.text', `${dadosUsuario.endereco}`)
        cy.get('#address_invoice').should('contain.text', `${dadosUsuario.cidade}`)
        cy.get('#address_invoice').should('contain.text', `${dadosUsuario.telefone}`)

    }

    validarOsDetalhesDoPedido() {
        cy.contains('Review Your Order').should('be.visible')

        let soma = 0

        cy.get('#cart_info .cart_total_price:not(:last)').each(($el) => {
            const texto = $el.text()
            if (texto.includes('Rs.')) {
                soma += parseInt(texto.replace(/[^\d]/g, ''))
            }
        })

        cy.get('#cart_info tbody tr').last().find('.cart_total_price').then(($total) => {
            const totalExibido = parseInt($total.text().replace(/[^\d]/g, ''))
            expect(soma).to.eq(totalExibido)
        })
    }


    efetuarPedido() {
        cy.scrollTo('bottom')
        cy.xpath('//div[@id="ordermsg"]//textarea[@name="message"]').type('Aguardo o envio do pedido em horário comercial. Obrigada')
        cy.get('a[href="/payment"]').click()

        cy.contains('Payment').should('be.visible')
    }
}

export default new Carrinho()
