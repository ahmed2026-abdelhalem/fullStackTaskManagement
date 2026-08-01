Feature: User Authentication & Security
  As a registered user
  I want to register and log in
  So that I can access my secured endpoints safely

  Scenario: Register a new user
    Given a new user provides username "ahmed_dev" and password "Password123"
    When the user sends a POST request to "/api/auth/register"
    Then the account should be created successfully with HTTP status 201

  Scenario: User Login and JWT Retrieval
    Given a user exists with username "ahmed_dev" and password "Password123"
    When the user posts credentials to "/api/auth/login"
    Then the system should respond with a valid JWT token
    And subsequent requests with the JWT token in Authorization header should be allowed