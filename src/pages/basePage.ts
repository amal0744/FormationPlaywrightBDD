import { Page } from "@playwright/test";

/**
 * Classe de base pour les Page Objects.
 * Centralise les méthodes communes (ex: gestion des popups cookies).
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Accepte le popup de cookies si présent.
     * Utilise un timeout court pour ne pas retarder les tests quand le popup n'est pas affiché.
     */
    async accepterPopup(): Promise<void> {
        try {
            const consentButton = this.page.locator('.fc-consent-root').getByRole('button', { name: 'Consent', exact: true });
            await consentButton.waitFor({ state: 'visible', timeout: 1000 });
            await consentButton.click();
            return;
        } catch {
            // La bannière de consentement peut être absente.
        }

        try {
            const popup = this.page.locator('xpath=/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]/p');
            await popup.waitFor({ state: 'visible', timeout: 1000 });
            await popup.click();
        } catch {
            // Popup absent ou non visible : on ignore
        }
    }
}
