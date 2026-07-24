import { Locator, Page } from "@playwright/test";
import { config } from "../config/configLoader";

export class PaymentPage {

    readonly page: Page;
    readonly btnCheckout: Locator;
    readonly recapCmd: Locator;
    readonly verifSommeProduit: Locator;
    readonly saisieCom: Locator;
    readonly placeOrder: Locator;
    readonly pagePayment: Locator;
    readonly nomCart: Locator;
    readonly nbCart: Locator;
    readonly cvcCart: Locator;
    readonly expMoisCart: Locator;
    readonly expAnCart: Locator;
    readonly btnPay: Locator;
    readonly cartQte: Locator;
    readonly cartPxUnit: Locator;
    readonly confirmPay: Locator;
    readonly btnDownload: Locator;


    constructor(page: Page) {

        this.page = page;
        this.btnCheckout = page.locator('.btn.btn-default.check_out');
        this.recapCmd = page.locator('#address_delivery');
        this.verifSommeProduit = page.locator('xpath=//*[@id="cart_info"]/table/tbody/tr[2]/td[4]/p');
        this.saisieCom = page.locator('textarea.form-control');
        this.placeOrder = page.locator('.btn.btn-default.check_out');
        this.pagePayment = page.locator('.step-one');
        this.nomCart = page.locator('[data-qa="name-on-card"]');
        this.nbCart = page.locator('[data-qa="card-number"]');
        this.cvcCart = page.locator('[data-qa="cvc"]');
        this.expMoisCart = page.locator('[data-qa="expiry-month"]');
        this.expAnCart = page.locator('[data-qa="expiry-year"]');
        this.btnPay = page.locator('[data-qa="pay-button"]');
        this.cartQte = page.locator('xpath=//*[@id="product-1"]/td[4]');
        this.cartPxUnit = page.locator('xpath=//*[@id="product-1"]/td[3]');
        this.confirmPay = page.locator('[data-qa="order-placed"]');
        this.btnDownload = page.locator('a[href*="download_invoice"]');
    }

    async clickBtnCheckout(): Promise<void> {
        await this.btnCheckout.click();
    }

    async getAdressPayment(): Promise<string> {
        return await this.recapCmd.textContent() ?? '';
    }

    async getMontantTotal(): Promise<number> {  //rs7000
        const montantTotal = await this.verifSommeProduit.textContent() ?? '';
        return parseInt(montantTotal.replace('Rs.', '').trim());
    }

    async getPrixUnit(): Promise<string> {   //RS500
        return await this.cartPxUnit.textContent() ?? '';
    }

    async getCartQte(): Promise<number> {
        const text = await this.cartQte.textContent() ?? '';
        return parseInt(text.trim());
    }

    async saisieCommentaire(): Promise<void> {
        await this.saisieCom.fill('message');
    }

    async clickPlaceOrder(): Promise<void> {
        await this.placeOrder.click();
    }

    async getPagePayment(): Promise<string> {
        return await this.pagePayment.textContent() ?? '';
    }

    async saisieInfoCarte(): Promise<void> {
        //  await this.nomCart.fill(process.env.CARD_NAME!);
        //await this.nbCart.fill(process.env.CARD_NUMBER!);
        //await this.cvcCart.fill(process.env.CARD_CVC!);
        //await this.expMoisCart.fill(process.env.CARD_EXP_MONTH!);
        //await this.expAnCart.fill(process.env.CARD_EXP_YEAR!);
        await this.nomCart.fill(config.payment.cardName);
        await this.nbCart.fill(config.payment.cardNumber);
        await this.cvcCart.fill(config.payment.cvc);
        await this.expMoisCart.fill(config.payment.expirationMonth);
        await this.expAnCart.fill(config.payment.expirationYear);


    }


    async clickBtnPayment(): Promise<void> {
        await this.btnPay.click();
    }

    async getConfirmPay(): Promise<string> {
        return await this.confirmPay.textContent() ?? '';
    }

    async clickDownloadInvoice(): Promise<void> {
        await this.btnDownload.click();
    }

}