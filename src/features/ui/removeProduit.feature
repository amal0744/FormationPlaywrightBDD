@panier
Feature: suppression de produit du panier
en tant qu'utulisateur je veux retirer un produit de mon panier

  Background:
    Given je suis sur la page de la connexion
    When je saisie mon login ""
    And je saisie mon passeword "" 
    And je clique sur le bouton de connexion
    Then je suis connecté en tant que "Logged in as Charfeddine"

  @removeProduit
  Scenario: retirer un produit du panier depuis la page cart
    When je clique sur le bouton produit
    And je clique sur le premier produit
    And je clique sur le bouton Add to cart
    Then une confirmation d'ajout devrais s'afficher
    When je clique sur le bouton view cart
    Then la page du panier s'affiche
    When je clique sur le bouton "X" du produit
    Then le produit est supprimé du panier
