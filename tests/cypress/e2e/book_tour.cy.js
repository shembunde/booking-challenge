describe('A client books a tour test', () => {
    before(() => {
        // Start Docker containers if not already running
        cy.exec('cd docker && ./start.sh && ./config.sh');
      });

    it('Books a tour as a client', () => {
      cy.visit('http://localhost/booking');
      cy.get('.tour-card:first').click();
      cy.get("#clientName").type("Shem Obura");
      cy.get("#clientgEmail").type("shemobura@gmail.com");
      cy.get('#book-as-client').click();
      cy.get('.confirmation').should("contain", "Booking success");
    });
});