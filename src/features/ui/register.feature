@registration
Feature: Inscription d'un nouvel utilisateur sur exerciceautomation
  En tant que nouvel utilisateur
  Je veux pouvoir m'inscrire
  Afin d'accéder aux fonctionnalités réservées aux membres

Background:
  Given je suis sur la page de la connexion

  @smoke
  Scenario: inscription réussie
    When je clique sur "Signup" dans la section New User Signup
    And je remplis le champ "Name" avec "Test User"
    And je remplis le champ "Email Address" avec "testuser+1@example.com"
    And je clique sur le bouton "Signup"
    And je sélectionne le titre "Mr"
    And je remplis le champ "Password" avec "Test1234"
    And je sélectionne la date de naissance "1" "January" "1990"
    And je coche "Sign up for our newsletter"
    And je coche "Receive special offers"
    And je remplis le champ "First name" avec "Test"
    And je remplis le champ "Last name" avec "User"
    And je remplis le champ "Company" avec "Test Company"
    And je remplis le champ "Address" avec "123 Rue Test"
    And je remplis le champ "Address2" avec "Batiment A"
    And je sélectionne le pays "United States"
    And je remplis le champ "State" avec "Test State" 
    And je remplis le champ "City" avec "Test City"
    And je remplis le champ "Zipcode" avec "75001"
    And je remplis le champ "Mobile Number" avec "0600000000"
    And je clique sur le bouton "Create Account"
    Then le compte est créé avec succès

  @regression
  Scenario: email déjà existant
    When je clique sur "Signup" dans la section New User Signup
    And je remplis le champ "Name" avec "Test User"
    And je remplis le champ "Email Address" avec "charfeddine.amal@hotmail.com"
    And je clique sur le bouton "Signup"
    Then un message d'erreur indique que l'email existe déjà

  @regression
  Scenario: champs obligatoires vides
    When je clique sur "Signup" dans la section New User Signup
    And je laisse le champ "Name" vide
    And je laisse le champ "Email Address" vide
    And je clique sur le bouton "Signup"
    Then un message de validation indique que le champ est obligatoire
