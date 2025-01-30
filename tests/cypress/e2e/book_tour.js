describe('A client books a tour test', () => {
    before(() => {
        // Start Docker containers if not already running
        cy.exec('cd docker && ./start.sh && ./config.sh');
      });

    it('Books a tour as a client', () => {
      cy.visit('/');
      cy.get('.tour-card:first').click();
      cy.get('#book-as-guest').click();
      cy.get('.confirmation').should('be.visible');
    });
});