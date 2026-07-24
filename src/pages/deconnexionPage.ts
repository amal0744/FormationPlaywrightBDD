import { Page, Locator } from "@playwright/test";

export class DeconnexionPage {
    readonly page: Page;
    readonly navbarLogin: Locator;
    readonly navbarSignup: Locator;
    readonly navbarLogout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navbarLogin = page.locator('a:has-text("Login")');
        this.navbarSignup = page.locator('a:has-text("Signup")');
        this.navbarLogout = page.locator('a:has-text("Logout")');
    }

    async cliquerLogout(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.navbarLogout.click();
        await this.page.waitForLoadState('networkidle'); 
    }

    async isOnLoginPage(): Promise<boolean> {
        const visible = await this.navbarLogin.isVisible().catch(() => false);
        const urlContainsLogin = this.page.url().toLowerCase().includes('login');
        return visible || urlContainsLogin;
    }

    async isNavbarLinkVisible(linkText: string): Promise<boolean> {
        return await this.page.locator(`a:has-text("${linkText}")`).isVisible().catch(() => false);
    }

    async isNavbarLinkHidden(linkText: string): Promise<boolean> {
        const visible = await this.isNavbarLinkVisible(linkText);
        return !visible;
    }
}
