import { Given, Then, When } from "@cucumber/cucumber";
import { ProduitPage } from "../../pages/produitPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";


Given('je suis sur la page des produits', async function () {
    pageFixture.produitPage = new ProduitPage(pageFixture.page);
    await pageFixture.produitPage.ouvrirUrl();
    await pageFixture.produitPage.accepterPopup();
});

Then('je devrais voir une liste des produits', async function () {
    await expect(pageFixture.produitPage.productListe).toBeVisible();
});

Then('le nombre de produit affiché devrait etre superieur a {int}', async function (count: number) {
    const nbrProduits = await pageFixture.produitPage.getNbrProduit();
    expect(nbrProduits).toBeGreaterThan(count);
});

// ***** Scénario 2 ********

When('je recherche le produit {string}', async function (nom: string) {
    await pageFixture.produitPage.rechercherProduit(nom);
});

Then('je devrais consulter le mot recherché {string}', async function (nom: string) {
    const listeObtenu = await pageFixture.produitPage.getResultatRecherche();

    for (const text of listeObtenu) {
        await expect(text).toContain(nom.toLowerCase());

    }
});

// ***** Scénario 3 ********

When('je clique sur le premier produit', async function () {
    await pageFixture.produitPage.cliquerPremierProduit();
});

Then('je devrais voir le nom du produit', async function () {
    const nomProduit = await pageFixture.produitPage.getNomProduit();
    await expect(nomProduit.length).toBeGreaterThan(0);
});

Then('je devrais voir le prix du produit', async function () {
    const prixProduit = await pageFixture.produitPage.getPrixProduit();
    await expect(prixProduit).toContain('Rs.');
});

Then('je devrais voir la description du produit', async function () {
    await expect(pageFixture.produitPage.descriptionProduit).toBeVisible();
});

