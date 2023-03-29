@order
Feature: Select items 
  As a customer
  I want to able to select items and goto checkout page with correct total price

  Background: 
    Given Customer has logged on to the application

  @demo
  Scenario: Order success
    When She order below items in home page:
        |item     |
        |iPhone 12|
        |iPhone 11|
    Then Order page should be displayed with total price correctly
    
  
  