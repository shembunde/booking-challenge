// cypress/e2e/adminGuestActions.cy.js

describe('Admin and Guest Actions', () => {
  // Shared setup/teardown
  before(() => {
    // Start Docker containers if not already running
    cy.exec('cd docker && ./start.sh && ./config.sh');
  });

  //  admins creates tour test 

  it('Creates a new tour as admin', () => {
  
    cy.loginAdmin();
    
    cy.visit('/admin/tours/create');
    
    cy.get('#tour-name').type('Savannah Safari');
    cy.get('#tour-slots').type('15');
    cy.get('#tour-price').type('799');
    cy.get('#tour-description').type('3-day wildlife adventure');
    cy.get('#tour-destination').type('Maasai Mara, Kenya');
    
    cy.get('#save-tour').click();
    
    // Verify in tours list
    cy.get('.tour-list')
      .should('contain', 'Savannah Safari')
      .and('contain', '15 slots available');
  });


  // admin views all tours bookings

  it('Views all bookings as admin', () => {
    cy.loginAdmin();
    
    cy.visit('/admin/bookings');
    
    // Verify bookings table
    cy.get('.bookings-table')
      .should('be.visible')
      .find('tr')
      .should('have.length.at.least', 1);
  });


  // admin views all tickets

  it('Views all tickets as admin', () => {
    cy.loginAdmin();
    
    cy.visit('/admin/tickets');
    
    // Verify tickets list
    cy.get('.tickets-list')
      .should('be.visible')
      .find('.ticket-card')
      .should('have.length.at.least', 1);
  });
});