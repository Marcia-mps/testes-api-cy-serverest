/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('http://localhost:3000/usuarios').then((response) => {
               expect(response.status).to.eq(200)
               expect(response.body).to.have.property('usuarios')
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request('http://localhost:3000/usuarios').then((response) => {
               expect(response.status).to.eq(200)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.request({
               method: 'POST',
               url: 'http://localhost:3000/usuarios',
               body: {
                    nome: "Marcia Teste",
                    email: "marcia" + Date.now() + "@teste.com",
                    password: "123456",
                    administrador: "true"
               }
          }).then((response) => {
               expect(response.status).to.eq(201)
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'POST',
               url: 'http://localhost:3000/usuarios',
               failOnStatusCode: false,
               body: {
                    nome: "Teste",
                    email: "email-invalido",
                    password: "123456",
                    administrador: "true"
               }
          }).then((response) => {
               expect(response.status).to.eq(400)
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let userId

          cy.request({
               method: 'POST',
               url: 'http://localhost:3000/usuarios',
               body: {
                    nome: "Usuario Editar",
                    email: "editar" + Date.now() + "@teste.com",
                    password: "123456",
                    administrador: "true"
               }
          }).then((res) => {
               userId = res.body._id

               cy.request({
                    method: 'PUT',
                    url: `http://localhost:3000/usuarios/${userId}`,
                    body: {
                         nome: "Usuario Editado",
                         email: "editado" + Date.now() + "@teste.com",
                         password: "123456",
                         administrador: "true"
                    }
               }).then((response) => {
                    expect(response.status).to.eq(200)
               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let userId

          cy.request({
               method: 'POST',
               url: 'http://localhost:3000/usuarios',
               body: {
                    nome: "Usuario Delete",
                    email: "editar" + Date.now() + "@teste.com",
                    password: "123456",
                    administrador: "true"
               }
          }).then((res) => {
               userId = res.body._id

               cy.request({
                    method: 'DELETE',
                    url: `http://localhost:3000/usuarios/${userId}`,
                    body: {
                         nome: "Usuario Editado",
                         email: "editado" + Date.now() + "@teste.com",
                         password: "123456",
                         administrador: "true"
                    }
               }).then((response) => {
                    expect(response.status).to.eq(200)
               })
          })
     });


});
