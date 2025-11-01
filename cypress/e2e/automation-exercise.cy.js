/// <reference types="cypress" />
require('cypress-xpath');

import userData from '../fixtures/example.json'
import { getRandomEmail, getRandomNumber } from '../support/helpers'
import menu from '../modules/menu'
import login from '../modules/login'
import { preencherFormularioFaleConosco, validarMensagemFormularioCadastradoComSucesso } from '../modules/contato'
import cadastro from '../modules/cadastro'
import produto from '../modules/produto'
import carrinho from '../modules/carrinho'
import { preencherInformacoesPagamento, validarMensagemPedidoComSucesso } from '../modules/pedido'


describe('Automation Exercise', () => {
    beforeEach(() => {
        menu.navegarParaPaginaInicial()
    });

    it('CT01-Cadastrar um usuário', () => {
        menu.navegarParaLogin()            
        login.preencherFormularioDePreCadastro(getRandomEmail())
        cadastro.preencherFormularioDeCadastroCompleto()            
        cadastro.validarMensagemContaCadastradaComSucesso()        
    });

    it('CT02-Login de usuário com e-mail e senha corretos', () => {
        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)
        login.validarMensagemLoginComSucesso()   
    });

    it('CT03-Login de usuário com e-mail e senha incorretos', () => {
        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, 54321)       
        login.validarMensagemLoginComErro()        
    });

    it('CT04-Logout de usuário', () => {
        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()
        login.validarLogoutComSucesso()           
    });

    it('CT05-Cadastrar usuário com e-mail existente no sistema', () => {
        menu.navegarParaLogin()
        login.preencherFormularioDePreCadastro(userData.user)
        cadastro.validarMensagemContaCadastradaComErro()        
    });

    it('CT06-Cadastrar formulário de contato com sucesso', () => {
        menu.navegarParaContato()
        preencherFormularioFaleConosco(userData.name, userData.user)
        validarMensagemFormularioCadastradoComSucesso()
    });

    it('CT08-Verificar todos os produtos e a página de detalhes do produto', () => {
        menu.navegarParaProdutos()
        produto.validarListagemDeProdutos()
        produto.acessarDetalhesDoPrimeiroProduto()
        produto.validarDetalhesDoPrimeiroProduto()        
    });

    it('CT09-Pesquisar produto', () => {
        menu.navegarParaProdutos()
        produto.validarListagemDeProdutos()

        const produtoPesquisado = 'Fancy Green Top'
        produto.pesquisarPrimeiroProduto(produtoPesquisado)
        produto.validarProdutoRetornadoDaPesquisa(produtoPesquisado)
    });

    it('CT10-Verificar a assinatura na página inicial', () => {     
        cadastro.preencherAssinatura(getRandomEmail())
        cadastro.validarMensagemAssinaturaComSucesso()        
    });

    it('CT15-Realizar pedido: Registrar antes de finalizar a compra', () => {
        menu.navegarParaLogin()                
        login.preencherFormularioDePreCadastro(getRandomEmail())                
        cadastro.preencherFormularioDeCadastroCompleto()   

        menu.navegarParaProdutos()        
        carrinho.incluirTresProdutos()        
        menu.navegarParaCarrinho()        
        carrinho.validarTresProdutosIncluidosNoCarrinho()        
        
        carrinho.prosseguirParaFinalizarCompra()                
        carrinho.validarOsDetalhesDoEndereco()
        carrinho.validarOsDetalhesDoPedido()
        
        carrinho.efetuarPedido()                
        preencherInformacoesPagamento()
        validarMensagemPedidoComSucesso()
                
        menu.navegarParaExcluirConta()
        cadastro.validarMensagemContaExcluidaComSucesso()        

        menu.navegarParaPaginaInicial()    
    });
});