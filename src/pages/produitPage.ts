import { Locator, Page } from "@playwright/test";

export class ProduitPage {
  readonly page: Page;
  readonly productListe: Locator;
  readonly productItems: Locator;
  readonly barRecherche: Locator;
  readonly Search: Locator;
  readonly premierProduit: Locator;
  readonly nomProduit: Locator;
  readonly prixProduit: Locator;
  readonly descriptionProduit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productListe = page.locator(".features_items");
    this.productItems = page.locator(".features_items .col-sm-4");
    this.barRecherche = page.locator("#search_product");
    this.Search = page.locator("#submit_search");
    this.premierProduit = page.locator(".features_items .col-sm-4").first();
    this.nomProduit = page.locator('.product-information h2');
    this.prixProduit= page.locator('.product-information span span');
    this.descriptionProduit= page.locator('.product-information p').first();
  }
  async ouvrirUrl(): Promise<void> {
    await this.page.goto("/products");
    await this.page.waitForURL('/.*products');
  }
  async getNbrProduit(): Promise<number> {
    return await this.productItems.count();
  }
  async accepterPopup(): Promise<void> {
    try {
      const popup = this.page.locator(
        "xpath=/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]/p",
      );
      await popup.waitFor({ state: "visible", timeout: 1000 });
      await popup.click();
    } catch { }
  }

  // ***** Scénario 2 ********
  async rechercherProduit(nom: string): Promise<void> {
    await this.barRecherche.fill(nom);
    await this.Search.click();
  }
  async getResultatRecherche(): Promise<string[]> {
    const count = await this.productItems.count();
    const nomProduitObtenu: string[] = [];

    for (let i = 0; i < count; i++) {
      const text =
        (await this.productItems
          .nth(i)
          .locator(".productinfo p")
          .textContent()) ?? "";
      nomProduitObtenu.push(text.toLowerCase().trim());
    }
    return nomProduitObtenu;
  }

  // ***** Scénario 3 ********

  async cliquerPremierProduit(): Promise<void> {
    await this.premierProduit.locator('a[href*="product_details"]').click();  //* cad que l'url contient product_details
  }

  async getNomProduit(): Promise<string> {
    return await this.nomProduit.textContent() ?? '';
  }

  async getPrixProduit(): Promise<string> {
    return await this.prixProduit.textContent() ?? '';
  }

  async getdescriptionProduit(): Promise<string> {
    return await this.descriptionProduit.textContent() ?? '';
  }






}
