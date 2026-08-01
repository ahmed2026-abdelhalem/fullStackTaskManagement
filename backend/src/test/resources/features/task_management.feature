Feature: Task Management REST API
  As an intern user
  I want to create, filter, and delete my tasks
  So that I can effectively manage my work backlog

  Background:
    Given the user "Ahmed" is logged into the task system

  Scenario: Successfully create a new task
    Given the task title is "Complete Full-Stack Lab"
    And the task description is "Integrate Angular frontend with Spring Boot backend"
    And the task priority is "HIGH"
    And the task status is "PENDING"
    And the due date is "2026-08-15"
    When the user submits the creation form
    Then the system should save the task with HTTP status 201
    And the saved task should have a non-null ID

  Scenario: Filter tasks by status
    Given the backend contains tasks with different statuses
    When the user filters tasks by status "PENDING"
    Then only tasks with status "PENDING" should be displayed in the list

  Scenario: Change status of an existing task
    Given a task exists with ID 4 and status "PENDING"
    When the user updates the status of task 4 to "IN_PROGRESS"
    Then the task status in the database should be updated to "IN_PROGRESS"

  Scenario: Delete a task from the list
    Given a task exists with ID 4
    When the user requests to delete task 4
    Then the task 4 should be removed from the system
    And the server should return HTTP status 204