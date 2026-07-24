import { Locator, Page, expect } from "@playwright/test";

export class RemoveProduitPage {
    readonly page: Page;
    readonly cartTable: Locator;
    readonly removeProductBtn: Locator;
    readonly cartRows: Locator;

    constructor(page: Page) { 
        this.page = page;
        this.cartTable = page.locator('#cart_info_table');
        this.removeProductBtn = page.locator('.cart_quantity_delete').first();
        this.cartRows = page.locator('#cart_info_table tbody tr');
    }

    async isCartPageVisible(): Promise<boolean> {
        return await this.cartTable.isVisible();
    }

    async clickRemoveProduct(): Promise<void> {
        await this.removeProductBtn.click();
    }

    async waitForCartRowCount(expected: number): Promise<void> {
        await expect(this.cartRows).toHaveCount(expected, { timeout: 5000 });
    }

    async getCartRowCount(): Promise<number> {
        return await this.cartRows.count();
    }
}
