describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
});

it('Limpa todas as tarefas concluídas', () => {
  cy.visit('');

  cy.get('[data-cy=todo-input]')
    .type('Task A{enter}')
    .type('Task B{enter}');

  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .first()
    .click();

  cy.get('[data-cy=clear-completed-btn]')
    .click();

  cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length', 1)
    .first()
    .should('have.text', 'Task B');
});

it('Edita uma tarefa existente', () => {
  cy.visit('');

  cy.get('[data-cy=todo-input]')
    .type('Estudar Cypress{enter}');

  cy.get('[data-cy=todos-list] > li')
    .first()
    .dblclick();

  cy.get('[data-cy=todo-edit-input]')
    .clear()
    .type('Estudar Cypress e Mocha{enter}');

  cy.get('[data-cy=todos-list] > li')
    .first()
    .should('have.text', 'Estudar Cypress e Mocha');
});

it('Marca todas as tarefas como concluídas', () => {
  cy.visit('');

  cy.get('[data-cy=todo-input]')
    .type('Task 1{enter}')
    .type('Task 2{enter}')
    .type('Task 3{enter}');

  cy.get('[data-cy=toggle-all-checkbox]')
    .click();

  cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
    .each((checkbox) => {
      cy.wrap(checkbox).should('be.checked');
    });
});