Cypress.on('window:before:load', win => {
    delete win.fetch;
});


describe('fetch API', () => {
    it('fetch 240 tv show API', () => {

        cy.request('https://api.tvmaze.com/shows').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length(240)
            expect(response.body[0]).to.have.property('name', "Under the Dome")
        })
    })
    
    it('fetch one tv show', () => {
        const num = 1
        cy.request(`https://api.tvmaze.com/shows/${num}`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            expect(response.body).to.have.property('name', "Under the Dome")
        })
    })

    it('fetch tv show when searching', () => {
        const name = 'naruto'
        cy.request(`https://api.tvmaze.com/search/shows?q=${name}`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length(10)
            expect(response.body[0].show).to.have.property('name', 'Naruto')
        })
    })

    it('fetch one tv show when selected', () => {
        const query = 495
        cy.request(`https://api.tvmaze.com/shows/${query}?embed=episodes`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            expect(response.body).to.have.property('name', 'Naruto')
        })
    })
})