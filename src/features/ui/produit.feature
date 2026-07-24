
@produit
Feature: gestion des produits
En tant qu'utulisateur je veux consulter la liste de produit afin de trouver un article souhaité

Background:
Given je suis sur la page des produits 

@afficherListe
Scenario: affichage de la liste des produits
Then je devrais voir une liste des produits
Then le nombre de produit affiché devrait etre superieur a 0

@rechercheProduit
Scenario: recherche d'un produit par mot clé
When je recherche le produit "shirt"
Then je devrais voir une liste des produits
Then je devrais consulter le mot recherché "shirt"

@afficherProduit
Scenario: affichage d'un détail du produit pour vérifier le prix le nom 
When je clique sur le premier produit
Then je devrais voir le nom du produit
And je devrais voir le prix du produit
And je devrais voir la description du produit