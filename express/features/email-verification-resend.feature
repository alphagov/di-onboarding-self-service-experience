Feature: A contact form to resend the verification code to mobile

  Background:
    Given that the user is on the `Check your email` page

  Scenario: User doesn’t receive their code
    When they click on the "Not received an email?" link
    Then they should be directed to the following page: "/create/resend-email-code"

  Scenario: The user wants to contact the service via slack
    When they click on the "Not received an email?" link
    And they click on the "Slack channel" link
    Then they should be directed to the following URL: "https://ukgovernmentdigital.slack.com/?redir=%2Farchives%2FC02AQUJ6WTC"

  Scenario: The user wants to contact the service
    When they click on the "Not received an email?" link
    And they click on the "support form" link
    Then they should be directed to the following URL: "https://www.sign-in.service.gov.uk/support"

  Scenario: The user wants the app to resend their code
    When they click on the "Not received an email?" link
    And they select the Submit button
    Then they should be directed to the following page: "/create/check-email"
