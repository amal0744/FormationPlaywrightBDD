import { Then, When } from "@cucumber/cucumber";
import { RemoveProduitPage } from "../../pages/removeProduitPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let removeProduitPage: RemoveProduitPage;

Then('la page du panier s\'affiche', async function () {
  removeProduitPage = new RemoveProduitPage(pageFixture.page);
  const visible = await removeProduitPage.isCartPageVisible();
  await expect(visible).toBeTruthy();
});

When('je clique sur le bouton {string} du produit', async function (buttonText: string) {
  removeProduitPage = new RemoveProduitPage(pageFixture.page);

  if (buttonText === 'X') {
    await removeProduitPage.clickRemoveProduct();
  } else {
    throw new Error(`Bouton non géré dans le test: ${buttonText}`);
  }
});

Then('le produit est supprimé du panier', async function () {
  removeProduitPage = new RemoveProduitPage(pageFixture.page);
  await removeProduitPage.waitForCartRowCount(0);
});
