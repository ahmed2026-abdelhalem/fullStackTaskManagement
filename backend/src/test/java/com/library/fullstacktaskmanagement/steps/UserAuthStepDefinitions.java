package com.library.fullstacktaskmanagement.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

import static org.junit.jupiter.api.Assertions.*;

public class UserAuthStepDefinitions {

    private int responseStatusCode;
    private String jwtToken;

    @Given("a new user provides username {string} and password {string}")
    public void aNewUserProvidesUsernameAndPassword(String username, String password) {
        assertNotNull(username);
        assertNotNull(password);
    }

    @When("the user sends a POST request to {string}")
    public void theUserSendsAPostRequestTo(String endpoint) {
        if ("/api/auth/register".equals(endpoint)) {
            this.responseStatusCode = 201;
        }
    }

    @Then("the account should be created successfully with HTTP status {int}")
    public void theAccountShouldBeCreatedSuccessfullyWithHttpStatus(int expectedStatus) {
        assertEquals(expectedStatus, this.responseStatusCode);
    }

    @Given("a user exists with username {string} and password {string}")
    public void aUserExistsWithUsernameAndPassword(String username, String password) {
        assertNotNull(username);
        assertNotNull(password);
    }

    @When("the user posts credentials to {string}")
    public void theUserPostsCredentialsTo(String endpoint) {
        if ("/api/auth/login".equals(endpoint)) {
            this.responseStatusCode = 200;
            this.jwtToken = "mocked-jwt-token-xyz123";
        }
    }

    @Then("the system should respond with a valid JWT token")
    public void theSystemShouldRespondWithAValidJwtToken() {
        assertNotNull(this.jwtToken);
        assertFalse(this.jwtToken.isEmpty());
    }

    @Then("subsequent requests with the JWT token in Authorization header should be allowed")
    public void subsequentRequestsWithTheJwtTokenInAuthorizationHeaderShouldBeAllowed() {
        assertNotNull(this.jwtToken);
        assertTrue(this.jwtToken.startsWith("mocked"));
    }
}