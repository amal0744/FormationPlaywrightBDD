import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/register.page";
import { pageFixture } from "../../support/pageFixture";

let registerPage: RegisterPage | undefined;

function getRegisterPage(): RegisterPage {
  if (!registerPage || registerPage.page !== pageFixture.page) {
    registerPage = new RegisterPage(pageFixture.page);
  }
  return registerPage;
}

When('je clique sur {string} dans la section New User Signup', async function (button: string) {
  const page = getRegisterPage();
  await page.acceptCookiePopup();
  await expect(page.newUserSignupTitle).toBeVisible();
  await page.newUserSignupTitle.click();
  await expect(page.signupButton).toHaveText(button);
});

When('je remplis le champ {string} avec {string}', async function (field: string, value: string) {
  const page = getRegisterPage();

  if (field === "Name" || field === "Email Address") {
    const signupValue = field === "Email Address" && value === "testuser+1@example.com"
      ? `testuser+${Date.now()}@example.com`
      : value;
    await page.fillSignupField(field, signupValue);
    return;
  }

  await page.fillAccountField(field, value);
});

When('je clique sur le bouton {string}', async function (button: string) {
  const page = getRegisterPage();

  if (button === "Signup") {
    await page.clickInitialSignup();
  } else if (button === "Create Account") {
    await page.clickCreateAccount();
  } else {
    throw new Error(`Bouton non géré : ${button}`);
  }
});

When('je sélectionne le titre {string}', async function (title: string) {
  await getRegisterPage().selectTitle(title);
});

When('je sélectionne la date de naissance {string} {string} {string}', async function (day: string, month: string, year: string) {
  await getRegisterPage().selectBirthdate(day, month, year);
});

When('je coche {string}', async function (option: string) {
  await getRegisterPage().checkOption(option);
});

When('je sélectionne le pays {string}', async function (country: string) {
  await getRegisterPage().selectCountry(country);
});

When('je laisse le champ {string} vide', async function (field: string) {
  const page = getRegisterPage();
  await page.fillSignupField(field, "");
});

Then('le compte est créé avec succès', async function () {
  await expect(getRegisterPage().accountCreatedTitle).toBeVisible();
});

Then("un message d'erreur indique que l'email existe déjà", async function () {
  await expect(getRegisterPage().existingEmailErrorMessage).toBeVisible();
  await expect(getRegisterPage().existingEmailErrorMessage).toContainText("Email Address already exist!");
});

Then('un message de validation indique que le champ est obligatoire', async function () {
  const page = getRegisterPage();
  const validationMessage = await page.signupNameInput.evaluate((element) =>
    (element as HTMLInputElement).validationMessage,
  );

  expect(validationMessage).not.toBe("");
});