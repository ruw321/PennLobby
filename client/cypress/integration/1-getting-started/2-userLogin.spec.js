// a user registers
describe('test the user register', () => {
  it('Enter the information and click signup', () => {
    cy.visit('http://localhost:3000');
    cy.get('#login').click();
    cy.get('#username').type('testNameUnique');
    cy.get('#password').type('secret');
    cy.get('#login-button').click();
    cy.get('#basic-button').should('be.visible');
    cy.get('#basic-button').click();
    cy.get('#profilepage').click();
    cy.get('#deactivate').click();
    cy.get('#confirm').click();
  })
})