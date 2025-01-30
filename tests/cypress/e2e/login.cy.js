describe('Login Test', () => {
    before(() => {
        // Start Docker containers if not already running
        cy.exec('cd docker && ./start.sh && ./config.sh');
      });
      
    it('Shows error on invalid login', () => {
      cy.visit('/login');
      cy.get('#username').type('invalid_user');
      cy.get('#password').type('wrong_password');
      cy.get('button[type="submit"]').click();
      cy.get('.error-message').should('contain', 'Invalid credentials');
    });
  });