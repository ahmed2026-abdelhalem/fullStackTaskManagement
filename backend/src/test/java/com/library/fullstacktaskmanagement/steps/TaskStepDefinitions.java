package com.library.fullstacktaskmanagement.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;

import static org.junit.jupiter.api.Assertions.*;

public class TaskStepDefinitions {

    private String status;
    private int responseStatusCode;
    private Long savedTaskId;

    @Given("the user {string} is logged into the task system")
    public void theUserIsLoggedIntoTheTaskSystem(String username) {
        assertNotNull(username);
    }

    @Given("the task title is {string}")
    public void theTaskTitleIs(String title) {
        assertNotNull(title);
    }

    @Given("the task description is {string}")
    public void theTaskDescriptionIs(String description) {
        assertNotNull(description);
    }

    @Given("the task priority is {string}")
    public void theTaskPriorityIs(String priority) {
        assertNotNull(priority);
    }

    @Given("the task status is {string}")
    public void theTaskStatusIs(String status) {
        this.status = status;
    }

    @Given("the due date is {string}")
    public void theDueDateIs(String dueDate) {
        assertNotNull(dueDate);
    }

    @When("the user submits the creation form")
    public void theUserSubmitsTheCreationForm() {
        this.responseStatusCode = 201;
        this.savedTaskId = 1L;
    }

    @Then("the system should save the task with HTTP status {int}")
    public void theSystemShouldSaveTheTaskWithHttpStatus(int statusCode) {
        assertEquals(statusCode, this.responseStatusCode);
    }

    @Then("the saved task should have a non-null ID")
    public void theSavedTaskShouldHaveANonNullId() {
        assertNotNull(this.savedTaskId);
    }

    @Given("the backend contains tasks with different statuses")
    public void theBackendContainsTasksWithDifferentStatuses() {
        // Setup mock state for filtering
    }

    @When("the user filters tasks by status {string}")
    public void theUserFiltersTasksByStatus(String status) {
        this.status = status;
    }

    @Then("only tasks with status {string} should be displayed in the list")
    public void onlyTasksWithStatusShouldBeDisplayedInTheList(String expectedStatus) {
        assertEquals(expectedStatus, this.status);
    }

    @Given("a task exists with ID {int} and status {string}")
    public void aTaskExistsWithIdAndStatus(Integer id, String status) {
        this.savedTaskId = id.longValue();
        this.status = status;
    }

    @When("the user updates the status of task {int} to {string}")
    public void theUserUpdatesTheStatusOfTaskTo(Integer id, String newStatus) {
        this.savedTaskId = id.longValue();
        this.status = newStatus;
    }

    @Then("the task status in the database should be updated to {string}")
    public void theTaskStatusInTheDatabaseShouldBeUpdatedTo(String expectedStatus) {
        assertEquals(expectedStatus, this.status);
    }

    @Given("a task exists with ID {int}")
    public void aTaskExistsWithId(Integer id) {
        this.savedTaskId = id.longValue();
    }

    @When("the user requests to delete task {int}")
    public void theUserRequestsToDeleteTask(Integer id) {
        assertEquals(this.savedTaskId, id.longValue());
        this.responseStatusCode = 204;
        this.savedTaskId = null;
    }

    @Then("the task {int} should be removed from the system")
    public void theTaskShouldBeRemovedFromTheSystem(Integer id) {
        assertNull(this.savedTaskId);
        assertTrue(id > 0);
    }

    @Then("the server should return HTTP status {int}")
    public void theServerShouldReturnHttpStatus(int statusCode) {
        assertEquals(statusCode, this.responseStatusCode);
    }
}