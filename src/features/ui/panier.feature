@panier
Feature: gestion du panier
en tant que utulisateur je veux ajouter des produits a mon panier

  Background:
    Given je suis sur la page de la connexion
    When je saisie mon login ""
    And je saisie mon passeword ""
    And je clique sur le bouton de connexion
    Then je suis connecté en tant que "Logged in as Charfeddine"

  @ajouterPanier
  Scenario: ajouter un produit au panier de la liste
    When je clique sur le bouton produit
    And je survole le premier produit
    And je clique sur le bouton Add to cart
    Then une confirmation d'ajout devrais s'afficher
    When je clique sur le bouton view cart
    Then le panier devrais contenir 1 produit
    And je devrais voir le produit dans le panier
    And le panier contient un prix valide

  @ajouterviewProduit
  Scenario: ajouter un produit en cliquant sur le bouton view product
    When je clique sur le bouton produit
    And je clique sur le premier produit
    Then je devrais voir le nom du produit
    And je clique sur le bouton Add to cart
    Then une confirmation d'ajout devrais s'afficher
    When je clique sur le bouton view cart
    Then le panier devrais contenir 1 produit
    And je devrais voir le produit dans le panier
    And le panier contient un prix valide

  @ajouterAvecQuantite
  Scenario: ajouter plusieurs unite d'un produit depuis la page detail
    When je clique sur le bouton produit
    And je clique sur le premier produit
    Then je devrais voir le nom du produit
    When je change la quantité 3
    And je clique sur le bouton Add to cart
    Then une confirmation d'ajout devrais s'afficher
    When je clique sur le bouton view cart
    Then la quantité dans le panier devrait etre 3
    And le prix total devrait correspondre au prix unitaire multiplier par 3