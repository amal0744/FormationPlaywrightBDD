import { Given, Then, When } from "@cucumber/cucumber";
import { ConnexionPage } from "../../pages/connexionPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let loginPage: ConnexionPage;

Given("je suis sur la page de la connexion", async function () {
  loginPage = new ConnexionPage(pageFixture.page);
  await loginPage.navigate();
}); 

When("je saisie mon login {string}", async function (email) {
  await loginPage.accepterPopup();
 // await loginPage.saisirEmail(email);
  await loginPage.saisirEmailWithYaml();  
});

When("je saisie mon passeword {string}", async function (pass) {
  await loginPage.accepterPopup();
 // await loginPage.saisirPassword(pass);
  await loginPage.saisirPasswordWithYaml();
});

When("je clique sur le bouton de connexion", async function () {
  await loginPage.accepterPopup();
  await loginPage.cliquerLogin();
});

Then("je suis connecté en tant que {string}", async function (resultatAttendu) {
  const textObtenu = await loginPage.getLoggedUserName();
  await loginPage.accepterPopup();
  await expect(textObtenu).toContain(resultatAttendu);
});

Then('je verifie le message d\'erreur afficher {string}', async function (erreurAttendue) {
  
  if(erreurAttendue == 'Your email or password is incorrect!'){
  await expect(loginPage.msgErreur).toBeVisible();
  await expect(loginPage.msgErreur).toContainText(erreurAttendue);
  }
else {
   const validationMessage = loginPage.getEmailVide();
   await expect(validationMessage).toContain(erreurAttendue);
} 

});
