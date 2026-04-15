/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('http://localhost:3000/usuarios').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('usuarios')
    })
  })

  it('Deve listar usuários cadastrados', () => {
    cy.request('http://localhost:3000/usuarios').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.usuarios).to.be.an('array')
    })
  })

  it('Deve cadastrar um usuário com sucesso', () => {
    const email = `marcia${Date.now()}@teste.com`

    cy.criarUsuario('Marcia Teste', email).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
    })
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/usuarios',
      failOnStatusCode: false,
      body: {
        nome: 'Teste',
        email: 'email-invalido',
        password: '123456',
        administrador: 'true'
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Deve editar um usuário previamente cadastrado', () => {
    const emailOriginal = `usuario${Date.now()}@teste.com`
    const emailEditado = `editado${Date.now()}@teste.com`

    cy.criarUsuario('Usuario Editar', emailOriginal).then((res) => {
      const userId = res.body._id

      cy.editarUsuario(userId, 'Usuario Editado', emailEditado).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro alterado com sucesso')
      })
    })
  })

  it('Deve deletar um usuário previamente cadastrado', () => {
    const email = `deletar${Date.now()}@teste.com`

    cy.criarUsuario('Usuario Delete', email).then((res) => {
      const userId = res.body._id

      cy.deletarUsuario(userId).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
    })
  })
})