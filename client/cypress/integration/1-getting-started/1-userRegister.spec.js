// a user registers
describe('test the user register', () => {
  it('Enter the information and click signup', () => {
    cy.visit('http://localhost:3000');
    cy.get('#login').click();
    cy.get('#signup').click();
    cy.get('#userName').type('testNameUnique');
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('johndoe@upenn.edu');
    cy.get('#password').type('secret');
    cy.get('#signup-button').click();
    cy.get('#signup').should('be.visible');
  })
})