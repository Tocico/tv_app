

describe('Tv show', () => {
  it('Visit my tv show page', () => {
    cy.server()
    cy.visit('/')

    cy.get('.showImg').should('have.length', 60)
    cy.get('.loading-box').should('not.exist')


    cy.get('.open_button:nth-child(5)')
      .click()
      .get('.dialogue').should('exist')

    cy.get('.close_button')
      .click()

  });

  it('search some TV show', () => {

    cy.get('.menuTrigger')
      .click()
      .get('.main').should('not.exist')

    cy.get('[type="text"]')
      .type('Naruto')
      .should('have.value', 'Naruto')

    cy.get('.open_button:nth-child(2)')
      .click()
      .get('.dialogue').should('exist')

    cy.get('.close_button')
      .click()

    cy.get('.open_button:nth-child(4)')
      .click()
      .get('.dialogue').should('exist')

    cy.get('.close_button')
      .click()

    cy.scrollTo('top')
  })

  it('remove search text and go back to first page', () => {

    cy.get('[type="text"]')
      .should(($input) => {
        expect($input).to.have.length(1)
      })

    cy.get('.fa-times')
      .click()

    cy.get('.fa-search')
      .click()
      .get('.main').should('exist')
  })

  it('search tv show which is no EXIST', () => {
    cy.get('.menuTrigger')
      .click()
      .get('.main').should('not.exist')

    cy.get('[type="text"]')
      .type('asdajsdjkasdkjaslkdjksdjk')
      .should('have.value', 'asdajsdjkasdkjaslkdjksdjk')
      .get('.errorMsg').should('exist')
      .get('.showList').should('not.exist')

    cy.get('.fa-times')
      .click()
      .get('.errorMsg').should('not.exist')
  })

});