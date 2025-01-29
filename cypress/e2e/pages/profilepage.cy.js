import { ROUTE } from '@constants/route.constants'
import { generateRandomNumber, generateRandomString } from '../../support/utils'

describe('PROFILE PAGE', function () {
  this.beforeEach(function () {
    cy.loginThenInit()
  })

  // Test Case 1:
  it('Check Basic UI Elements', () => {
    // Navigate to the Page
    cy.intercept(
      'GET',
      `${Cypress.env('BASE_URL')}/v1/employee/users/profile`
    ).as('getProfile')

    cy.get('header').within(() => {
      cy.get('[data-test-id="avatar-btn"]').click()
    })

    cy.get('.MuiPopover-paper').within(() => {
      cy.get('[data-test-id="profile-menu"]').click()
    })

    cy.location().then((location) => {
      expect(location.pathname).to.equal(ROUTE.PROFILE.ROOT)

      cy.wait('@getProfile').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.be.oneOf([200, 304])
      })

      cy.get('[data-test-id="phone-number-password"]').first().should('exist')
      cy.get('[data-test-id="phone-number-icon"]')
        .first()
        .should('be.visible')
        .click()
      cy.get('[data-test-id="phone-number-text"]').first().should('exist')

      //   Check if form fields are disabled
      cy.get('[data-test-id="skills_tab"]').should('be.visible').click()
      cy.get('[data-test-id="skills"]').should('be.visible')
      cy.get('[data-test-id="edit-skill"]')
        .scrollIntoView()
        .should('be.visible')
        .click()
      cy.location().then((location) => {
        expect(location.pathname).to.equal(ROUTE.PROFILE.SKILLS)
      })
      cy.get('[data-test-id="user-skill"]').should('be.visible')
      cy.get('header').within(() => {
        cy.get('[data-test-id="avatar-btn"]').click()
      })

      cy.get('.MuiPopover-paper').within(() => {
        cy.get('[data-test-id="profile-menu"]').click()
      })
      cy.get('[data-test-id="edit-btn"]').should('exist').click()
      cy.get('form#edit-profile').should('be.visible')
      cy.get('[name="fullName"]').should('be.disabled')
      cy.get('[name="position"]').should('be.disabled')
      cy.get('[name="email"]').should('be.disabled')
      cy.get('[name="birthday"]').should('be.disabled')
      cy.get('button[type=submit]').should('be.disabled')
      cy.get('[data-test-id="cancel-btn"]').click()
      cy.get('form#edit-profile').should('not.be.visible')

      //   Check change password button is visible
      cy.get('[data-test-id="settings-tab"]').click()
      cy.get('[data-test-id="change-password-toggle-btn"]').should('exist')
    })
  })

  // Test Case 2:
  it('Check Edit Action', () => {
    // Navigate to the Page
    cy.get('header').within(() => {
      cy.get('[data-test-id="avatar-btn"]').click()
    })

    cy.get('.MuiPopover-paper').within(() => {
      cy.get('[data-test-id="profile-menu"]').click()
    })

    cy.location().then((location) => {
      expect(location.pathname).to.equal(ROUTE.PROFILE.ROOT)

      cy.get('[data-test-id="edit-btn"]').click()

      //   Check form validations on Phone input
      cy.get('input[name="phone"]').as('phoneInput')
      cy.get('@phoneInput').type('a')
      cy.get('[data-test-id="phone-parent"]')
        .find('.Mui-error')
        .as('phoneError')
        .should('be.visible')

      cy.get('@phoneInput').clear()
      cy.get('@phoneError').should('be.visible')

      cy.get('@phoneInput').type(generateRandomNumber(26))
      cy.get('@phoneError').should('be.visible')

      cy.get('button[type=submit]').as('saveBtn').should('be.disabled')

      cy.get('@phoneInput').clear()
      cy.get('@phoneInput').type(generateRandomNumber(8))
      cy.get('@phoneError').should('not.exist')
      cy.get('@saveBtn').should('not.be.disabled')

      //   Check form validations on Relation field
      cy.get('[data-test-id="add-phone-btn"]').click()

      cy.get('input[name^="phone_secondaries["][name$=".relationship"]') // This selects all the elements whose name starts with "phone_secondaries[" and ends with ".relationship".
        .last()
        .as('lastRelation')
      cy.get('@lastRelation').type(generateRandomString(101))
      // Select the last relation parent:
      cy.get('[data-test-id^="relation["]').last().as('lastRelationParent')

      // Then, within that context, look for the .Mui-error:
      cy.get('@lastRelationParent')
        .find('.Mui-error')
        .as('lastRelationError')
        .should('be.visible')

      cy.get('@lastRelation').clear()
      cy.get('@lastRelationError').should('be.visible')

      cy.get('@saveBtn').should('be.disabled')

      const randomName = generateRandomString(10)
      cy.get('@lastRelation').clear()
      cy.get('@lastRelation').type(`UM-test-${randomName}`)
      cy.get('@lastRelationError').should('not.exist')
      cy.get('@saveBtn').should('be.disabled')

      //   Check form validations on Additional Phone Input
      cy.get('input[name^="phone_secondaries["][name$=".phone"]') // This selects all the elements whose name starts with "phone_secondaries[" and ends with ".phone".
        .last()
        .as('lastPhone')
      cy.get('@lastPhone').type('a')
      // Select the last relation parent:
      cy.get('[data-test-id^="additional-phone["]').last().as('lastPhoneParent')

      // Then, within that context, look for the .Mui-error:
      cy.get('@lastPhoneParent')
        .find('.Mui-error')
        .as('lastPhoneError')
        .should('be.visible')

      cy.get('@lastPhone').clear()
      cy.get('@lastPhoneError').should('be.visible')

      cy.get('@lastPhone').type(generateRandomNumber(26))
      cy.get('@lastPhoneError').should('be.visible')

      cy.get('@saveBtn').should('be.disabled')

      cy.get('@lastPhone').clear()
      cy.get('@lastPhone').type(generateRandomNumber(8))
      cy.get('@lastPhoneError').should('not.exist')
      cy.get('@saveBtn').should('not.be.disabled')

      //   Check Edit Action
      cy.intercept(
        'PUT',
        `${Cypress.env('BASE_URL')}/v1/employee/users/profile_update`
      ).as('editProfile')
      cy.get('@saveBtn').click()
      cy.wait('@editProfile').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.equal(200)
      })
    })
  })

  // Test Case 3:
  it('Check Delete Additional Phone action', () => {
    // Navigate to the Page
    cy.get('header').within(() => {
      cy.get('[data-test-id="avatar-btn"]').click()
    })

    cy.get('.MuiPopover-paper').within(() => {
      cy.get('[data-test-id="profile-menu"]').click()
    })

    cy.location().then((location) => {
      expect(location.pathname).to.equal(ROUTE.PROFILE.ROOT)

      cy.get('[data-test-id="edit-btn"]').click()

      // Grab the value of the first phone input
      cy.get('input[name="phone_secondaries[0].phone"]')
        .invoke('val')
        .then((initialValue) => {
          // Delete the phone
          cy.get('[data-test-id="additional-phone-row[0]').within(() => {
            cy.get('button').click()
          })

          // Assert that the value of the first phone input has changed
          cy.get('input[name="phone_secondaries[0].phone"]').should(
            'not.have.value',
            initialValue
          )
        })
      cy.get('button[type=submit]').as('saveBtn').should('not.be.disabled')

      //   Check Edit Action
      cy.intercept(
        'PUT',
        `${Cypress.env('BASE_URL')}/v1/employee/users/profile_update`
      ).as('editProfile')
      cy.get('@saveBtn').click()
      cy.wait('@editProfile').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.equal(200)
      })
    })
  })

  // Test Case 4:
  it('Check Change Password Action', () => {
    // Navigate to the Page
    cy.get('header').within(() => {
      cy.get('[data-test-id="avatar-btn"]').click()
    })

    cy.get('.MuiPopover-paper').within(() => {
      cy.get('[data-test-id="profile-menu"]').click()
    })

    cy.location().then((location) => {
      expect(location.pathname).to.equal(ROUTE.PROFILE.ROOT)

      //   Navigate to the change password form
      cy.get('[data-test-id="settings-tab"]').click()
      cy.get('[data-test-id="change-password-toggle-btn"]').click()
      cy.get('form#change-password').should('be.visible')
      cy.get('button[type=submit]').as('changeBtn').should('be.disabled')

      //   Check old and new password Validation
      cy.get('input[name="current_password"]')
        .as('current')
        .type('Unimedia@123')
      cy.get('input[name="new_password"]').as('new').type('Unimedia@123')
      cy.get('[data-test-id="new-password-parent"]')
        .find('.Mui-error')
        .as('newPasswordError')
        .should('be.visible')

      //   Check New Password Validation
      cy.get('@new').clear().type('pass')
      cy.get('@newPasswordError').should('be.visible')
      cy.get('@new').type('W')
      cy.get('@newPasswordError').should('be.visible')
      cy.get('@new').type('0rd')
      cy.get('@newPasswordError').should('be.visible')
      cy.get('@new').type('@')
      cy.get('@newPasswordError').should('not.exist')
      cy.get('@changeBtn').should('be.disabled')

      //   Check Confirm Password Validation
      cy.get('input[name="confirm_new_password"]')
        .as('confirm')
        .type(generateRandomString(9))
      cy.get('[data-test-id="confirm-password-parent"]')
        .find('.Mui-error')
        .as('confirmPasswordError')
        .should('be.visible')

      cy.get('@confirm').clear().type('passW0rd@')
      cy.get('@confirmPasswordError').should('not.exist')

      //   Check Chagne Password Action
      cy.intercept(
        'POST',
        `${Cypress.env('AUTH_BASE_URL')}/v1/passwords/change`
      ).as('changePassword')
      cy.get('@changeBtn').should('not.be.disabled').click()

      cy.get('[data-test-id="confirmation-button"]')
        .as('okBtn')
        .should('be.visible')
        .click()
      cy.wait('@changePassword').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.equal(200)
      })

      //   Return the password change
      cy.get('[data-test-id="change-password-toggle-btn"]').click()
      cy.get('@current').type('passW0rd@')
      cy.get('@new').type('Unimedia@123')
      cy.get('@confirm').type('Unimedia@123')
      cy.get('@changeBtn').should('not.be.disabled').click()
      cy.get('@okBtn').click()
      cy.wait('@changePassword').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.equal(200)
      })
    })
  })
  it('Check profile skill', () => {
    // Navigate to the Page
    cy.intercept(
      'GET',
      `${Cypress.env('BASE_URL')}/v1/employee/users/profile`
    ).as('getProfile')

    cy.get('header').within(() => {
      cy.get('[data-test-id="avatar-btn"]').click()
    })

    cy.get('.MuiPopover-paper').within(() => {
      cy.get('[data-test-id="profile-menu"]').click()
    })

    cy.location().then((location) => {
      expect(location.pathname).to.equal(ROUTE.PROFILE.ROOT)

      cy.wait('@getProfile').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.be.oneOf([200, 304])
      })

      //   Check if form fields are disabled
      cy.get('[data-test-id="skills_tab"]').should('be.visible').click()
      cy.get('[data-test-id="skills"]').should('be.visible')
      cy.get('[data-test-id="edit-skill"]')
        .scrollIntoView()
        .should('be.visible')
        .click()
      cy.location().then((location) => {
        expect(location.pathname).to.equal(ROUTE.PROFILE.SKILLS)
      })
      cy.get('[data-test-id="user-skill"]').should('be.visible')
      cy.get('[data-test-id="create"]')
        .scrollIntoView()
        .should('be.visible')
        .click()
      cy.get('#add-user-skill').should('be.visible')

      cy.get('#multiple-limit-tags').click()
      cy.get('.MuiAutocomplete-popper').should('be.visible')
      cy.get('.MuiAutocomplete-option').first().click()
      cy.get('#multiple-limit-tags').should('not.have.value', '')
      cy.get('[data-test-id="create-button"]').should('not.be.disabled')
      cy.get('.skill-label')
        .eq(2)
        .then((element) => {
          const rect = element[0].getBoundingClientRect()
          const x = rect.x + rect.width / 2
          const y = rect.y + rect.height / 2
          cy.get('body').click(x, y)
        })
      cy.get('[data-test-id="add-btn"]').should('be.visible').click()
      cy.get('[data-test-id="delete-btn"]').last().should('be.visible').click()
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
      cy.get('[data-test-id="user-skill-list"]').first().click()
      cy.get('[data-test-id="delete-btn"]').click()
      cy.get('[data-test-id="confirmation-component"]').should('be.visible')
      cy.get('[data-test-id="confirmation-button"]').should('be.disabled')
      cy.get('[name="confirm"]').type('test')
      cy.get('[data-test-id="confirmation-button"]').should('be.disabled')
      cy.get('[name="confirm"]').clear().type('delete')
      cy.intercept(
        'DELETE',
        `${Cypress.env('BASE_URL')}/v1/employee/user_skills/*`
      ).as('skillDelete')
      cy.get('[data-test-id="confirmation-button"]')
        .should('not.be.disabled')
        .click()
      cy.wait('@skillDelete').then((interception) => {
        const response = interception.response
        expect(response.statusCode).to.equal(204)
      })
    })
  })
})
