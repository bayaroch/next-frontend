import { generateRandomNumber, generateRandomString } from '../../support/utils'

describe('EMPLOYEE SCENARIO', function () {
  this.beforeEach(function () {
    cy.loginThenInit(Cypress.env('EMPLOYEE_EMAIL'))
  })
  it('Profile management', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('BASE_URL')}/v1/employee/users/profile`
    ).as('getProfile')
    cy.intercept(
      'GET',
      `${Cypress.env('BASE_URL')}/v1/employee/user_skills/list?keyword=`
    ).as('getUserSkill')

    // Navigate to the Page
    cy.visit(`/`)
    cy.get('header').within(() => {
      cy.get('[data-test-id="avatar-btn"]').click()
    })

    cy.get('.MuiPopover-paper').within(() => {
      cy.get('[data-test-id="profile-menu"]').click()
    })
    cy.location().then((location) => {
      expect(location.pathname).to.equal(ROUTE.PROFILE.ROOT)

      //Get requests check
      cy.wait('@getProfile').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.be.oneOf([200, 304])
      })
      cy.wait('@getUserSkill').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.be.oneOf([200, 304])
      })

      //   Check phone, additional phone Edit Action
      cy.get('[data-test-id="edit-btn"]').should('exist').click()
      cy.get('form#edit-profile').should('be.visible')
      cy.get('input[name="phone"]').clear().type(generateRandomNumber(8))

      cy.get('[data-test-id="add-phone-btn"]').click()
      cy.get('input[name^="phone_secondaries["][name$=".relationship"]')
        .last()
        .as('lastRelation')
      const randomName = generateRandomString(10)
      cy.get('@lastRelation').clear().type(`UM-test-${randomName}`)
      cy.get('input[name^="phone_secondaries["][name$=".phone"]')
        .last()
        .as('lastPhone')
      cy.get('@lastPhone').type(generateRandomNumber(8))

      //Profile update request check
      cy.intercept(
        'PUT',
        `${Cypress.env('BASE_URL')}/v1/employee/users/profile_update`
      ).as('editProfile')
      cy.get('button[type=submit]').click()
      cy.wait('@editProfile').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.equal(200)
      })
      cy.get('[data-test-id="edit-btn"]').should('exist').click()
      cy.get('[data-test-id="additional-phone-row[0]').within(() => {
        cy.get('button').click()
      })
      cy.get('button[type=submit]').click()

      //   Check Chagne Password Action
      cy.get('[data-test-id="settings-tab"]').click()
      cy.get('[data-test-id="change-password-toggle-btn"]').click()
      cy.get('form#change-password').should('be.visible')

      cy.get('input[name="current_password"]').type('Unimedia@123')
      cy.get('input[name="new_password"]').clear().type('passW0rd@')
      cy.get('input[name="confirm_new_password"]').clear().type('passW0rd@')
      cy.intercept(
        'POST',
        `${Cypress.env('AUTH_BASE_URL')}/v1/passwords/change`
      ).as('changePassword')
      cy.get('button[type=submit]').should('not.be.disabled').click()
      cy.get('[data-test-id="confirmation-button"]')
        .should('be.visible')
        .click()
      cy.wait('@changePassword').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.equal(200)
      })

      //   Return the password change
      cy.get('[data-test-id="change-password-toggle-btn"]').click()
      cy.get('input[name="current_password"]').type('passW0rd@')
      cy.get('input[name="new_password"]').type('Unimedia@123')
      cy.get('input[name="confirm_new_password"]').type('Unimedia@123')
      cy.get('button[type=submit]').should('not.be.disabled').click()
      cy.get('[data-test-id="confirmation-button"]').click()

      //   Check edit userSkill
      cy.get('[data-test-id="skills_tab"]').click()
      cy.get('[data-test-id="user-name"]')
        .should('be.visible')
        .invoke('text')
        .then((userName) => {
          cy.get('[data-test-id="edit-skill"]')
            .scrollIntoView()
            .should('be.visible')
            .click()
          cy.location().then((location) => {
            expect(location.pathname).to.equal(ROUTE.PROFILE.SKILLS)
          })
          cy.get('[data-test-id="create"]')
            .scrollIntoView()
            .should('be.visible')
            .click()
          cy.get('#add-user-skill').should('be.visible')
          cy.get('#multiple-limit-tags').type('{enter}').wait
          cy.get('.MuiAutocomplete-popper').should('be.visible')
          cy.get('.MuiAutocomplete-option')
            .first()
            .click({ force: true })
            .invoke('text')
            .then((skillName) => {
              cy.get('#multiple-limit-tags').should('not.have.value', '')
              cy.get('[data-test-id="create-button"]').should('not.be.disabled')
              const skillWidth = generateRandomNumber(1) % 5
              cy.get('.skill-label')
                .eq(skillWidth)
                .then((element) => {
                  const rect = element[0].getBoundingClientRect()
                  const x = rect.x + rect.width / 2
                  const y = rect.y + rect.height / 2
                  cy.get('body').click(x, y)
                })
              //Check edit userSkill request
              cy.intercept(
                'POST',
                `${Cypress.env('BASE_URL')}/v1/employee/user_skills`
              ).as('addSkill')
              cy.get('[data-test-id="create-button"]').click()
              cy.get('[data-test-id="confirmation-button"]')
                .should('be.visible')
                .click()
              cy.wait('@addSkill').then((interception) => {
                const response = interception.response
                expect(response.statusCode).to.equal(200)
              })
              cy.contains('button', 'OK').click()
              //Check skill report after add user skill
              cy.intercept({
                method: 'GET',
                url: `${Cypress.env(
                  'BASE_URL'
                )}/v1/employee/skill_reports.json`,
              }).as('skillReport')
              cy.visit(`${ROUTE.SKILL.REPORT}`)

              cy.wait('@skillReport').then((interception) => {
                const response = interception.response
                expect(response.statusCode).to.be.oneOf([200, 304])
                const userEntry = response.body.find(
                  (entry) => entry.user.name === userName
                )
                const userSkill = userEntry.skills.find(
                  (skill) =>
                    skill.skill_name ===
                    skillName.substring(0, skill.skill_name.length)
                )
                expect(userSkill.point).eq(skillWidth + 1)
                //Delete added user skill
                cy.visit(`${ROUTE.PROFILE.SKILLS}`)
                cy.contains('h5', userSkill.skill_name).click()
                cy.get('[data-test-id="delete-btn"]').click()
                cy.get('[data-test-id="confirmation-component"]').should(
                  'be.visible'
                )
                cy.get('[data-test-id="confirmation-button"]').should(
                  'be.disabled'
                )
                cy.get('[name="confirm"]').type('test')
                cy.get('[data-test-id="confirmation-button"]').should(
                  'be.disabled'
                )
                cy.get('[name="confirm"]').clear().type('delete')
                cy.get('[data-test-id="confirmation-button"]')
                  .should('not.be.disabled')
                  .click()
              })
            })
        })
    })
    cy.intercept('GET', `${Cypress.env('BASE_URL')}/v1/employee/users*`).as(
      'employeeList'
    )
    cy.visit(`${ROUTE.EMPLOYEE.ROOT}`)
    cy.wait('@employeeList').then((interception) => {
      const response = interception.response
      expect(response.statusCode).to.be.oneOf([200, 304])
    })
    cy.intercept({
      method: 'GET',
      url: `${Cypress.env('BASE_URL')}/v1/employee/users/*`,
    }).as('employeeDetail')
    cy.get('[data-test-id="user-profile"]').should('be.visible').first().click()
    cy.wait('@employeeDetail').then((interception) => {
      const response = interception.response
      expect(response.statusCode).to.be.oneOf([200, 304])
    })
    cy.get('[data-test-id="avatar-btn"]').click()
    cy.get('[data-test-id="logout-btn"]').click()
    cy.get('[data-test-id="confirmation-button"]').click()
    cy.url().should('include', '/home')
  })
})
