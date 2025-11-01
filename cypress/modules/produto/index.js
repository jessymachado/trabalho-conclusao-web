

class Produto {
    validarListagemDeProdutos() {
        cy.get('.features_items').should('contain', 'All Products');

        cy.xpath('//div[@class="features_items"]//div[@class="product-image-wrapper"]')
            .should('exist')
            .its('length')
            .then((qtdItensProdutos) => {
                expect(qtdItensProdutos).to.be.greaterThan(1);
            });
    }

    acessarDetalhesDoPrimeiroProduto() {
        cy.get('a[href="/product_details/1"]').click()
    }

    validarDetalhesDoPrimeiroProduto() {
        cy.get('.product-details').within(() => {

            cy.get('.view-product img')
                .should('be.visible')
                .and(($img) => {
                    expect($img.attr('src')).to.contain('/get_product_picture')
                });

            cy.get('.product-information').within(() => {

                cy.get('h2').eq(0).should('contain.text', 'Blue Top')
                cy.get('p').contains('Category:').should('contain.text', 'Category: Women > Tops')
                cy.get('span span').should('contain.text', 'Rs. 500')

                cy.get('input#quantity')
                    .should('be.visible')
                    .and('have.value', '1')
                    .and('have.attr', 'min', '1')

                cy.get('b').should('contain.text', 'Availability:')
                cy.get('p').should('contain.text', ' In Stock')
                cy.get('b').should('contain.text', 'Condition:')
                cy.get('p').should('contain.text', ' New')
                cy.get('b').should('contain.text', 'Brand:')
                cy.get('p').should('contain.text', ' Polo')

            });

        });
    }

    pesquisarPrimeiroProduto(produtoPesquisado){  
        cy.get('[id="search_product"]').type(produtoPesquisado)
        cy.get('button[id="submit_search"]').click()
    }

    validarProdutoRetornadoDaPesquisa(prodConsultado) {
        cy.get('.features_items').should('contain', 'Searched Products');

        cy.xpath('//div[@class="features_items"]//div[@class="product-image-wrapper"]')
            .should('exist')
            .its('length')
            .then((qtdItensProdutos) => {
                expect(qtdItensProdutos).to.be.equal(1);
            });

        cy.get('p').should('contain.text', prodConsultado);
        cy.get('h2').should('contain.text', 'Rs. 700');
    }
}

export default new Produto()