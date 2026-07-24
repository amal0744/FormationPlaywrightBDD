# Formation BDD Playwright TypeScript

![Playwright](https://img.shields.io/badge/Playwright-1.60.0-blue?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue?logo=typescript)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-green?logo=cucumber)

## Description

Ce projet est une formation BDD sur Playwright avec TypeScript et Cucumber, dédiée au test automatisé de l'application e-commerce `automationexercise.com`.

Il couvre des tests UI et API pour valider l'authentification, la recherche et la navigation produit, la gestion du panier, la commande et le CRUD du compte utilisateur.

## Architecture

```
src/
├─ pages/           # Page Objects Playwright
├─ steps/           # Définitions Cucumber BDD
│  ├─ ui/
│  └─ api/
├─ features/        # Scénarios Gherkin
└─ support/         # Fixtures et helpers partagés
```

## Prérequis

- Node.js (version 18+ recommandée)
- npm
- Java JDK installé pour Allure Report
- Navigateurs Playwright installés (via `npx playwright install`)

## Installation

```bash
cd "c:\Users\benha\Desktop\Formation Playwright\formationPlaywrightBDD"
npm install
npx playwright install
```

## Configuration

Créez un fichier `.env` à la racine du projet si nécessaire pour les secrets d'environnement.

Exemple de contenu minimal :

```env
API_BASE_URL=https://automationexercise.com/api
# USER_EMAIL=...
# USER_PASSWORD=...
```

Le projet utilise également `config.yaml` pour les données de test et les identifiants.

## Commandes disponibles

- `npm test` : exécute les tests Cucumber Playwright
- `npm run test:dry` : vérifie la configuration et les steps sans exécuter les actions
- `npm run report` : génère le rapport Allure
- `npm run clean` : supprime les dossiers `allure-results` et `allure-report`

## Structure du projet

```
.
├─ src/
│  ├─ api/
│  ├─ config/
│  ├─ features/
│  │  ├─ ui/
│  │  └─ api/
│  ├─ hooks/
│  ├─ pages/
│  ├─ steps/
│  └─ support/
├─ allure-results/
├─ allure-report/
├─ script/
├─ cucumber.config.js
├─ package.json
├─ playwright.config.ts
├─ tsconfig.json
├─ README.md
└─ config.yaml
```

## Rapport Allure

Après avoir exécuté les tests, générez le rapport Allure avec :

```bash
npm run report
```

Puis ouvrez le rapport généré dans `allure-report/` avec un navigateur.

## Bonnes pratiques

- Gardez les steps Cucumber lisibles et réutilisables.
- Centralisez la logique commune dans des Page Objects.
- Ne mettez pas de secrets directement dans le dépôt.
- Utilisez `config.yaml` pour les données de test et `.env` pour les variables sensibles.
- Exécutez régulièrement `npm run test:dry` lors de l'ajout de nouveaux scénarios.
