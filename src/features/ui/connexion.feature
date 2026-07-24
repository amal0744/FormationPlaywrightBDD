@connexion
Feature: Connexion sur l'application exerciceautomation
En tant qu'utulisateur enregistré sur exerciceautomation je veux pouvoir me connecté

Background:
Given je suis sur la page de la connexion

  @connextionValide
  Scenario: connexion avec des identifiants valides
    
    When je saisie mon login ""
    And je saisie mon passeword ""
    And je clique sur le bouton de connexion
    Then je suis connecté en tant que "Logged in as Charfeddine"

  @connexionInvalide
  Scenario Outline: connexion avec des identifiants invalides

    When je saisie mon login "<email>"
    And je saisie mon passeword "<password>"
    And je clique sur le bouton de connexion
    Then je verifie le message d'erreur afficher "<erreurAttendue>"

    Examples:
      | email                        | password | erreurAttendue                       |
      | amal@gmail.com               | azerty   | Your email or password is incorrect! |
      | charfeddine.amal@hotmail.com | azerrt   | Your email or password is incorrect! |
      |                              |          | Veuillez renseigner ce champ.        |
