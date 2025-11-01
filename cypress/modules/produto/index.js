import { produtoLocators as loc } from './locators.js';

class Produto {

  validarListagemDeProdutos() {
    cy.get(loc.secaoProdutos).should('contain', 'All Products');

    cy.xpath(loc.listaProdutos)
      .should('exist')
      .its('length')
      .then(qtdItensProdutos => {
        expect(qtdItensProdutos).to.be.greaterThan(1);
      });
  }

  acessarDetalhesDoPrimeiroProduto() {
    cy.get(loc.primeiroProdutoDetalhes).click();
  }

  validarDetalhesDoPrimeiroProduto() {
    cy.get(loc.detalhesProduto).within(() => {

      cy.get(loc.imagemProduto)
        .should('be.visible')
        .and($img => {
          expect($img.attr('src')).to.contain('/get_product_picture');
        });

      cy.get(loc.informacoesProduto).within(() => {
        cy.get(loc.tituloProduto).eq(0).should('contain.text', 'Blue Top');
        cy.get(loc.categoriaProduto).should('contain.text', 'Category: Women > Tops');
        cy.get(loc.precoProduto).should('contain.text', 'Rs. 500');
        cy.get(loc.quantidadeProduto)
          .should('be.visible')
          .and('have.value', '1')
          .and('have.attr', 'min', '1');
        cy.get(loc.disponibilidadeProduto);
        cy.get(loc.estoqueProduto);
        cy.get(loc.condicaoProduto);
        cy.get(loc.condicaoValor);
        cy.get(loc.marcaProduto);
        cy.get(loc.marcaValor);
      });

    });
  }

  pesquisarPrimeiroProduto(produtoPesquisado) {
    cy.get(loc.inputPesquisa).type(produtoPesquisado);
    cy.get(loc.botaoPesquisar).click();
  }

  validarProdutoRetornadoDaPesquisa(prodConsultado) {
    cy.get(loc.secaoProdutos).should('contain', 'Searched Products');

    cy.xpath(loc.listaProdutos)
      .should('exist')
      .its('length')
      .then(qtdItensProdutos => {
        expect(qtdItensProdutos).to.eq(1);
      });

    cy.get(loc.produtoPesquisadoNome).should('contain.text', prodConsultado);
    cy.get(loc.produtoPesquisadoPreco).should('contain.text', 'Rs. 700');
  }
}

export default new Produto();
