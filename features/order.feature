@order
Feature: Place order
  As a customer
  I want to able to select items and place a order with correct total price

  Background: 
    Given Customer has logged in to the application

  @regression
  Scenario: Check order success when fullfill all informations in shipping address
    When Customer has selected below items in home page and checkout:
        |item     |
        |iPhone 12|
        |iPhone 11|
    And Shipping address is fulfilled with below informations:
        |firstName|lastName |address |state  |postalCode|
        |John     |Doe      |Ha Dong |Ha Noi | 10000    |  
    Then Customer should able to click the submit button to place this order
    And The order should be successfully placed with correct total price


@regression
  Scenario: Check when click to place order without filling shipping address
    When Customer has selected below items in home page and checkout:
        |item     |
        |iPhone 12|
        |iPhone 11|
    And Shipping address is not fulfilled to checkout
    Then Customer unable to click the submit button to place order

    
  
  