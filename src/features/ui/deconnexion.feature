@logout
Feature: Deconnexion sur l'application exerciceautomation
En tant qu'utulisateur connecté sur exerciceautomation je veux pouvoir me deconnecter

Background:
   Given je suis sur la page de la connexion
    When je saisie mon login ""
    And je saisie mon passeword ""
    And je clique sur le bouton de connexion
    Then je suis connecté en tant que "Logged in as Charfeddine"

  @logoutValide
 Scenario: deconnexion d un utilisateur connecte
    When je clique sur le lien deconnexion
    Then je me rederige vers la page de connexion
    And le lien "Signup / Login" s affiche dans la navbar
    And le lien "Logout" n apparait plus dans la navbar