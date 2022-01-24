/// <reference types = 'cypress' />

context ("Jobs Page", () => {
    beforeEach(() => {
        cy.visit("localhost:3000/jobs")
        cy.wait(500)
    })

    it("Should have Job Title", () => {

        

        cy.get("h2").length > 0;

    })

    it("Should have Recommended Jobs as title", () => {
        cy.get("h1").contains("Recommended Jobs")
    })
    
})
