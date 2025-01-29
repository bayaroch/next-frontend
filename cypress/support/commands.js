import '@testing-library/cypress/add-commands'
import _ from 'lodash'

Cypress.Commands.add('loginThenInit', (email) => {
  cy.visit('/login')

  // cy.intercept('GET', 'https://accounts.google.com/gsi/status*').as(
  //   'googleInit'
  // )
  // cy.wait('@googleInit')

  cy.wait(2000)

  cy.get('input[name="email"]').type(email ? email : Cypress.env('ADMIN_EMAIL'))

  cy.get('input[name="password"]').type(Cypress.env('TEST_USER_PASSWORD')) // to do get password and email from Cypress env see cypress.config

  // cy.intercept('POST', 'https://www.google.com/recaptcha/api2/reload*').as(
  //   'captchaInit'
  // )

  cy.get('input[name="im_not_robot"]').check()

  cy.intercept('POST', `${Cypress.env('AUTH_BASE_URL')}/v1/login`).as(
    'loginRequest'
  )

  cy.wait(2000)

  cy.get('button[type="submit"]').click()

  cy.wait('@loginRequest').then((interception) => {
    cy.log(JSON.stringify(interception.response))
    const response = interception.response
    expect(response.statusCode).to.equal(200)
    const body = response.body
    const token = body.access_token
    const baseUrl = body.base_url ? body.base_url : '//ums.pmtdev.unimedia.mn'
    Cypress.env('token', token)
    Cypress.env('base_url', baseUrl)
    const authorization = `bearer ${token}`
    const options = {
      method: 'GET',
      url: `http:${baseUrl}/v1/employee/users/profile`,
      headers: {
        authorization,
      },
    }
    cy.request(options).then(({ body, status }) => {
      expect(status).to.eq(200)
      cy.log(JSON.stringify(body))
      const modules = _.get(
        body,
        'data.attributes.role.data.attributes.modules.data',
        undefined
      )
      cy.wrap(modules).should('not.be.undefined')
      Cypress.env('modules', modules)
      cy.log(JSON.stringify(modules))
    })
  })
})
