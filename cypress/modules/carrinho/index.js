import { carrinhoLocators as loc } from './locators.js';
import { dadosUsuario } from '../../data/usuario.js';

class Carrinho {

  incluirTresProdutos() {
    const produtos = [1, 3, 5];

    produtos.forEach(codProdutoInformado => {
      cy.get(loc.produtos(codProdutoInformado))
        .first()
        .should('be.visible')
        .click();

      cy.get(loc.modalCarrinho)
        .should('have.class', 'show')
        .and('be.visible');

      cy.get('.modal-backdrop').should('not.exist');

      cy.xpath(loc.botaoContinuarComprandoModal)
        .should('exist')
        .click();
    });
  }

  prosseguirParaFinalizarCompra() {
    cy.get(loc.botaoProceedToCheckout).should('be.visible').click();
  }

  validarTresProdutosIncluidosNoCarrinho() {
    cy.xpath(loc.tabelaCarrinho)
      .find('tr')
      .then($rows => {
        const qtd = $rows.length - 1;
        cy.log('Quantidade de produtos no carrinho:', qtd);
        expect(qtd).to.eq(3);
      });
  }

  validarOsDetalhesDoEndereco() {
    cy.contains('Address Details').should('be.visible');
    cy.get(loc.enderecoEntrega)
      .should('contain.text', 'Your delivery address')
      .and('contain.text', `Mrs. ${dadosUsuario.primNome} ${dadosUsuario.sobrenome}`)
      .and('contain.text', `${dadosUsuario.companhia}`)
      .and('contain.text', `${dadosUsuario.endereco}`)
      .and('contain.text', `${dadosUsuario.cidade}`)
      .and('contain.text', `${dadosUsuario.telefone}`);

    cy.get(loc.enderecoFaturamento)
      .should('contain.text', 'Your billing address')
      .and('contain.text', `Mrs. ${dadosUsuario.primNome} ${dadosUsuario.sobrenome}`)
      .and('contain.text', `${dadosUsuario.companhia}`)
      .and('contain.text', `${dadosUsuario.endereco}`)
      .and('contain.text', `${dadosUsuario.cidade}`)
      .and('contain.text', `${dadosUsuario.telefone}`);
  }

  validarOsDetalhesDoPedido() {
    cy.contains(loc.secaoRevisaoPedido).should('be.visible');

    let soma = 0;

    cy.get(loc.precosItensCarrinho).each($el => {
      const texto = $el.text();
      if (texto.includes('Rs.')) {
        soma += parseInt(texto.replace(/[^\d]/g, ''));
      }
    });

    cy.get(loc.totalPedido).then($total => {
      const totalExibido = parseInt($total.text().replace(/[^\d]/g, ''));
      expect(soma).to.eq(totalExibido);
    });
  }

  efetuarPedido() {
    cy.scrollTo('bottom');
    cy.xpath(loc.textareaMensagemPedido).type('Aguardo o envio do pedido em horário comercial. Obrigada');
    cy.get(loc.linkPagamento).click();
    cy.contains(loc.secaoPagamento).should('be.visible');
  }
}

export default new Carrinho();
