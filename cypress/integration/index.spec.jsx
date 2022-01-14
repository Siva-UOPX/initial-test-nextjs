/// <reference types = 'cypress' />

context ("Home Page", () => {
    beforeEach(() => {
        cy.visit("localhost:3000")
        cy.wait(500)
    })

    it("Should have Title", () => {

        

        cy.get("h1").length > 0;

    })

    it("Should have 'My Plan' as Title", () => {
        cy.get("h1").contains("My Plan")
    })
    
})

context('To Do List', () => {

    beforeEach(() => {
        cy.visit("localhost:3000")
    })
   
        
    it('should cross out list items upon click', () => {




        cy.get(":nth-child(1) > .MuiFormControlLabel-root > .MuiFormControlLabel-label > .MuiTypography-root").click({ multiple: true })
        
        

    })
})
