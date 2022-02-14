describe('making order', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });
  
    it('should open burger constructor by default', function() {
      cy.contains('Пожалуйста, для начала конструирования бургера выберите');
    });

    it('should drag and drop bun from ingredient list to counstructor', function() {
      cy.get('[class^=burger-constructor_burger-constructor__]').as('burgerConstructorArea')

      cy.get('[class^=burger-ingredient_burger-ingredient__]').contains('Краторная булка N-200i').as('burgerBun');

      cy.get('@burgerBun').trigger('dragstart');
      cy.get('@burgerConstructorArea').trigger('drop');
      
      cy.get('@burgerConstructorArea').get('[class^=burger-constructor_sum__]').as('burgerOrderSumFooter');
      cy.get('@burgerOrderSumFooter').contains('1255');
      cy.get('@burgerOrderSumFooter').get('button').contains('Оформить заказ');
    });

    it('should loggedin user to create order', function() {

      cy.get('button').contains('Оформить заказ').click();

      cy.get('[name=email]').type('yaxxrat@yandex.ru');
      cy.get('[name=password]').type('12345678');
      cy.get('button').contains("Войти").click();
    });    

    it('should created order after login', function() {
      cy.get('[class^=burger-constructor_burger-constructor__]').as('burgerConstructorArea')
      cy.get('@burgerConstructorArea').get('button').contains('Оформить заказ').as('createOrderButton');

      cy.get('@createOrderButton').click().wait(20000);

      cy.contains('Ваш заказ начали готовить');
     
    });    


}); 