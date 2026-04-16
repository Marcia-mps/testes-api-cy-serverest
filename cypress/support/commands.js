// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('criarUsuario', (nome, email, password = '123456', administrador = 'true') => {
  return cy.request({
    method: 'POST',
    url: 'usuarios',
    body: {
      nome,
      email,
      password,
      administrador
    }
  })
})

Cypress.Commands.add('editarUsuario', (id, nome, email, password = '123456', administrador = 'true') => {
  return cy.request({
    method: 'PUT',
    url: `usuarios/${id}`,
    body: {
      nome,
      email,
      password,
      administrador
    }
  })
})

Cypress.Commands.add('deletarUsuario', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `usuarios/${id}`
  })
})

Cypress.Commands.add('token', (email, password) => {
  return cy.request({
    method: 'POST',
    url: 'login',
    body: {
      email,
      password
    }
  }).then((response) => {
    return response.body.authorization
  })
})

Cypress.Commands.add('cadastrarProduto', (token, nome, preco, descricao, quantidade) => {
  return cy.request({
    method: 'POST',
    url: 'produtos',
    headers: {
      Authorization: token
    },
    failOnStatusCode: false,
    body: {
      nome,
      preco,
      descricao,
      quantidade
    }
  })
})