
@apiCompte
Feature: gestion d'un compte utilisateur via des api
En tant que testeur je souhaite validé les operations de gestion sur un compte utilisateur 
via l'api afin de m'assurer que les endpoints fonctionnent correctement

Background: 
Given l'api automatisation exercice est disponible
Given un email unique doit etre generer
When je cree le compte avec les donnees generer
Then le code de reponse devrait etre 201 

@creation
Scenario: cree un compte utilisateur
Then le message devrait contenir "User created!"

@read
Scenario: recuperer les détails d'un compte existant
When je récupere les donneer du compte par email
Then le code de reponse devrait etre 200
And les details devrait contenir le nom de l'utilisateur

@update
Scenario: mettre a jour les informations d'un compte
When je met a jour le nom du compte avec "Amalupdated"
Then le code de reponse devrait etre 200
Then le message devrait contenir "User updated!"

@delete
Scenario: supprimer un compte existant
When je supprime le compte 
Then le code de reponse devrait etre 200
Then le message devrait contenir "Account deleted!"

@fluxCompletCrude
Scenario: flux complet crude : creer , lire , mettre a jour et supprimer
Then le message devrait contenir "User created!"

When je récupere les donneer du compte par email
Then le code de reponse devrait etre 200
And les details devrait contenir le nom de l'utilisateur

When je met a jour le nom du compte avec "Amalupdated"
Then le code de reponse devrait etre 200
Then le message devrait contenir "User updated!"

When je supprime le compte 
Then le code de reponse devrait etre 200
Then le message devrait contenir "Account deleted!"