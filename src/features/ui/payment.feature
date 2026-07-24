@payment
Feature: payment des produits
en tant que utulisateur je veux payer les produits achetés

  Background:
    Given je suis sur la page de la connexion
    When je saisie mon login ""
    And je saisie mon passeword ""
    And je clique sur le bouton de connexion
    Then je suis connecté en tant que "Logged in as Charfeddine"

  @payerProduit
  Scenario: payer les produits achetés
    When je clique sur le bouton produit
    And je clique sur le premier produit
    Then je devrais voir le nom du produit
    And je clique sur le bouton Add to cart
    Then une confirmation d'ajout devrais s'afficher
    When je clique sur le bouton view cart
    And je devrais voir le produit dans le panier
    And le panier contient un prix valide
    When je clique sur le bouton Proceed To Checkout
    Then je devrais voir le recap de ma commande
    When je vérifie que le montant total correspond a la somme des produits
    And je saisie un commentaire
    And je clique sur le bouton place Order
    Then la page de payement par carte s'affiche
    When je saisie les informations de la carte bancaire
    And je clique sur le bouton Pay and confirm order
    Then une confirmation de paiement s'affiche
    When je clique sur le bouton Download invoice

