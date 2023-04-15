@order
Feature: Place order
  As a customer
  I want to able to select items and place a order with correct total price

  Background: 
    Given Customer has logged in to the application

  @regression @smoke
  Scenario: Check order success when fullfill all informations in shipping address
    When Customer has selected below items in home page and checkout:
        |item           |
        |zara coat 3    |
        |adidas original|
    And Shipping address is fulfilled with this information:
        |country  |
        |vietnam  |
    Then Customer should able to place this order successfully


@regression
  Scenario: Check when click to place order without filling shipping address
    When Customer has selected below items in home page and checkout:
        |item     |
        |adidas original|
    And Shipping address is not fulfilled to checkout
    Then A error message 'Please enter Full Shipping Information' should be displayed when user click to place order

    
  
  