/// <reference types = 'cypress' />

describe('Navigation', () => {
    it('Jobs Page', () => {
        cy.visit('localhost:3000')
        cy.contains('JOBS').click()

        cy.url().should('include', 'jobs')
    })

    it('Resources Page', () => {
        cy.visit('localhost:3000')
        cy.contains('RESOURCES').click()

        cy.url().should('include', 'resources')
    })
    it('Portfolio Page', () => {
        cy.visit('localhost:3000')
        cy.contains('PORTFOLIO').click()

        cy.url().should('include', 'portfolio')
    })
})

