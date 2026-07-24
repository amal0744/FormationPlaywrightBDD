import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../../support/pageFixture";
import { PaymentPage } from "../../pages/paymentPage";
import { PanierPage } from "../../pages/panierPage";
import { expect } from "@playwright/test";

let paymentPage: PaymentPage;

When('je clique sur le bouton Proceed To Checkout', async function () {
    paymentPage = new PaymentPage(pageFixture.page);
    pageFixture.panierPage = new PanierPage(pageFixture.page);
    await paymentPage.clickBtnCheckout();
});


Then('je devrais voir le recap de ma commande', async function () {
    expect(paymentPage.recapCmd).toBeVisible();
});

When('je vérifie que le montant total correspond a la somme des produits', async function () {
    const prixUnitaireText = await paymentPage.getPrixUnit();
    const prixUnitaire = parseInt(prixUnitaireText.replace('Rs.', '').trim());

    const qte = await paymentPage.getCartQte();
    const prixTotal = prixUnitaire * qte;

    const montantTotal = await paymentPage.getMontantTotal();

    await expect(prixTotal).toBe(montantTotal);

});


When('je saisie un commentaire', async function () {
    await paymentPage.saisieCommentaire();
});


When('je clique sur le bouton place Order', async function () {
    await paymentPage.clickPlaceOrder();
});


Then('la page de payement par carte s\'affiche', async function () {
    await expect(paymentPage.pagePayment).toBeVisible();
    const message = await paymentPage.getPagePayment();
    expect(message).toContain('Payment');
});


When('je saisie les informations de la carte bancaire', async function () {
    await paymentPage.saisieInfoCarte();
});


When('je clique sur le bouton Pay and confirm order', async function () {
    await paymentPage.clickBtnPayment();
});


Then('une confirmation de paiement s\'affiche', async function () {
    await expect(paymentPage.confirmPay).toBeVisible();
    const message = await paymentPage.getConfirmPay();
    expect(message).toContain('Order Placed!');
});


When('je clique sur le bouton Download invoice', async function () {
    await paymentPage.clickDownloadInvoice();
});

