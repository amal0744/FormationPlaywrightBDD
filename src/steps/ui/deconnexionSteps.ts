import { When, Then } from "@cucumber/cucumber";
import { DeconnexionPage } from "../../pages/deconnexionPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let deconnexionPage: DeconnexionPage;

When('je clique sur le lien deconnexion', async function () {
  deconnexionPage = new DeconnexionPage(pageFixture.page);
  await deconnexionPage.cliquerLogout();
});
 
Then('je me rederige vers la page de connexion', async function () {
  deconnexionPage = new DeconnexionPage(pageFixture.page);
  const onLogin = await deconnexionPage.isOnLoginPage();
  await expect(onLogin).toBeTruthy();
});

Then('le lien {string} s affiche dans la navbar', async function (link: string) {
  deconnexionPage = new DeconnexionPage(pageFixture.page);
  const visible = await deconnexionPage.isNavbarLinkVisible(link);
  await expect(visible).toBeTruthy();
});

Then('le lien {string} n apparait plus dans la navbar', async function (link: string) {
  deconnexionPage = new DeconnexionPage(pageFixture.page);
  const hidden = await deconnexionPage.isNavbarLinkHidden(link);
  await expect(hidden).toBeTruthy();
});
