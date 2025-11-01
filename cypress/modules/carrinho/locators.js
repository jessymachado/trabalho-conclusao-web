export const carrinhoLocators = {
    produtos: cod => `.features_items a[data-product-id="${cod}"]`,
    modalCarrinho: '#cartModal',
    botaoContinuarComprandoModal: '//div[@id="cartModal" and contains(@class,"show")]//button[contains(@class,"close-modal") and normalize-space()="Continue Shopping"]',
    botaoProceedToCheckout: 'a.btn.btn-default.check_out',
    tabelaCarrinho: '//div[@class="table-responsive cart_info"]',
    enderecoEntrega: '#address_delivery',
    enderecoFaturamento: '#address_invoice',
    secaoRevisaoPedido: 'Review Your Order',
    precosItensCarrinho: '#cart_info .cart_total_price:not(:last)',
    totalPedido: '#cart_info tbody tr:last-child .cart_total_price',
    textareaMensagemPedido: '//div[@id="ordermsg"]//textarea[@name="message"]',
    linkPagamento: 'a[href="/payment"]',
    secaoPagamento: 'Payment'
};
