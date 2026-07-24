import { Locator, Page } from "@playwright/test";

export class PanierPage {
    readonly page: Page;
    readonly boutonProduit: Locator;
    readonly premierProduit: Locator;
    readonly addCartProduit: Locator;
    readonly confirmAjout: Locator;
    readonly clickBtnViewCart: Locator;
    readonly viewCarteBtn: Locator;
    readonly qteProduit: Locator;
    readonly nomProduit: Locator;
    readonly prixProduit: Locator;
    readonly addCarte: Locator;
    readonly quantite: Locator;
    readonly carteQuantite: Locator;
    readonly cartPrixTotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.boutonProduit = page.locator('.shop-menu.pull-right ul li').nth(1);
        this.premierProduit = page.locator(".features_items .col-sm-4").first();
        this.addCartProduit = page.locator('.btn.btn-default.add-to-cart');
        this.confirmAjout = page.locator('#cartModal .modal-content');
        this.clickBtnViewCart = page.locator('#cartModal .modal-title');
        this.viewCarteBtn = page.locator('#cartModal a[href="/view_cart"]');
        this.qteProduit = page.locator('#cart_info_table tbody tr');
        this.nomProduit = page.locator('#cart_info_table .cart_description h4 a');
        this.prixProduit = page.locator('#cart_info_table tbody tr td.cart_price p');
        this.addCarte = page.locator('.btn.btn-default.cart');
        this.quantite = page.locator('#quantity'); 
        this.carteQuantite = page.locator('#cart_info_table tbody tr td.cart_quantity button');
        this.cartPrixTotal = page.locator('#cart_info_table tbody tr td.cart_total p.cart_total_price');
    }
    async clickBoutonProduit(): Promise<void> {
        await this.boutonProduit.locator('a[href*="/products"]').click();
    }

    async hoverpremierProduit(): Promise<void> {
        await this.premierProduit.hover();
    }

    async clickaddCartProduit(): Promise<void> {
        await this.addCartProduit.click();
    }

    async getclickBtnMessage(): Promise<string> {
        return await this.confirmAjout.textContent() ?? '';
    }
 
    async getviewCarteBtn(): Promise<void> {
        await this.viewCarteBtn.click();
    }

    async getqtePanier() {
        const quantite = await this.qteProduit.count();
        return { quantite };
    }

    async getnomPanier() {
        return await this.nomProduit.first().textContent() ?? '';
    }

    async getprixPanier() {
        return await this.prixProduit.first().textContent() ?? '';
    }


    //************Scenario2*************
    async clickaddCart(): Promise<void> {
        await this.addCarte.click();
    }

    //************Scenario3*************
    async ajouterQuantite(qte : number) : Promise<void> {
        await this.quantite.fill(String(qte));
    }

    async getCarteQte() : Promise <number> {
        const qte = await this.carteQuantite.first().textContent() ?? '';
        return parseInt(qte.trim());
    }

    async getPrixTotal() : Promise <string> {
        return await this.cartPrixTotal.first().textContent() ?? '';
    }
}   