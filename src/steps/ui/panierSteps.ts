import { Then, When } from "@cucumber/cucumber";
import { PanierPage } from "../../pages/panierPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";
import { ProduitPage } from "../../pages/produitPage";

let panierPage: PanierPage;

When('je clique sur le bouton produit', async function () {
    panierPage = new PanierPage(pageFixture.page);
    pageFixture.produitPage = new ProduitPage(pageFixture.page);
    await panierPage.clickBoutonProduit();
}); 

When('je survole le premier produit', async function () {
    await panierPage.hoverpremierProduit();
}); 

When('je clique sur Add to cart', async function () {
    await panierPage.clickaddCartProduit();
});

Then('une confirmation d\'ajout devrais s\'afficher', async function () {
    await expect(panierPage.confirmAjout).toBeVisible();
    const message = await panierPage.getclickBtnMessage();
    expect(message).toContain('added');
});

When('je clique sur le bouton view cart', async function () {
    await panierPage.getviewCarteBtn();
});

Then('le panier devrais contenir {int} produit', async function (nombre: number) {
    const result = await panierPage.getqtePanier();
    expect(result.quantite).toBeGreaterThan(0);
});

Then('je devrais voir le produit dans le panier', async function () {
    const nom = await panierPage.getnomPanier();
    expect(nom.length).toBeGreaterThan(0);
});

Then('le panier contient un prix valide', async function () {
    const prix = await panierPage.getprixPanier();
    expect(prix).toContain('Rs.');
});

//************Scenario2*************

Then('je clique sur le bouton Add to cart', async function () {
    await panierPage.clickaddCart();
});

//************Scenario3*************

When('je change la quantité {int}', async function (qte: number) {
    await panierPage.ajouterQuantite(qte);
});

Then('la quantité dans le panier devrait etre {int}', async function (qteCart: number) {
    const qtePanier = await panierPage.getCarteQte();
    await expect(qtePanier).toBe(qteCart);
});


Then('le prix total devrait correspondre au prix unitaire multiplier par {int}', async function (qteProd: number) {
    const prixUnitaireText = await panierPage.getprixPanier();
    const prixTotalText = await panierPage.getPrixTotal();
    const extractPrix = (text: string): number => {
        return parseInt(text.replace('Rs.', '').trim());
    }
    const prixUnitaire = extractPrix(prixUnitaireText);
    const prixTotal = extractPrix(prixTotalText);
    await expect(prixTotal).toBe(prixUnitaire * qteProd);

}

);

