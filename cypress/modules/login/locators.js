export const loginLocators = {
    inputEmailLogin: '[data-qa="login-email"]',
    inputSenhaLogin: '[data-qa="login-password"]',
    botaoLogin: '[data-qa="login-button"]',
    inputNomePreCadastro: '[data-qa="signup-name"]',
    inputEmailPreCadastro: '[data-qa="signup-email"]',
    botaoPreCadastro: 'button:contains("Signup")',
    iconeUsuario: 'i.fa-user',
    linkLogout: 'a[href="/logout"]',
    linkLogin: 'a[href="/login"]',
    mensagemErroLogin: '.login-form > form > p',
    textoUsuarioLogado: userData => `Logged in as ${userData.name}`,
    nomeUsuario: userData => userData.name
};
