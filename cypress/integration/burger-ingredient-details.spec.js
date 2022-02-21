//ingredient-details_ingredient-block__

describe('ingredient details', function() {
    before(function() {
      cy.visit('http://localhost:3000/ya-react-burger/');
    });
  
    it('should open main window', function() {
      cy.contains('Соберите бургер');
    });

    it('should show ingredient details by click and close', function() {
      cy.get('[alt="Краторная булка N-200i"]').as('burgerBunImage');
      cy.get('@burgerBunImage').click();
      cy.contains('Детали ингредиента');
      cy.get('[data-cy="closeIcon"]').click();
      cy.get('Детали ингредиента').should('not.exist')
    });

}); 