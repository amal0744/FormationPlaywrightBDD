import { Locator, Page } from "@playwright/test";
import { config } from "../config/configLoader";
import { BasePage } from "./basePage";
//import { config } from "dotenv";
//import 'dotenv/config';

export class ConnexionPage extends BasePage {
    readonly emailInput: Locator;
    readonly passInput: Locator;
    readonly logintBtn: Locator; 
    readonly logged: Locator;
    readonly msgErreur: Locator;
    
/**commentaire **/

    constructor(page: Page) { 
        super(page);
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passInput = page.locator('[data-qa="login-password"]');
        this.logintBtn = page.locator('[data-qa="login-button"]');
        this.logged = page.locator('li').filter({ hasText: 'Logged in as' });
        this.msgErreur = page.locator('xpath=//*[@id="form"]/div/div/div[1]/div/form/p')
    }

    // navigation 

    async navigate(): Promise<void> {
        await this.page.goto('/login');
    }

    async saisirEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async saisirPassword(password: string): Promise<void> {
        await this.passInput.fill(password);
    }
 
    async cliquerLogin(): Promise<void> {
        await this.logintBtn.click();
    }

    async getLoggedUserName(): Promise<string> {
        const userName = await this.logged.textContent() ?? '';
        return userName.trim();
    }

    // la gestion du popup est centralisée dans BasePage.accepterPopup()

    // login avec les credentials depuis le fichier du .env
    async saisirEmailWithYaml(): Promise<void> {
        //await this.emailInput.fill(process.env.USER_EMAIL || 'charfeddine.amal@hotmail.com');
        await this.emailInput.fill(config.user.admin.login);
    
    }

    async saisirPasswordWithYaml(): Promise<void> {
       // await this.passInput.fill(process.env.USER_PASSWORD || 'azerty');
       await this.passInput.fill(config.user.admin.password);
    }

   async getEmailVide(): Promise <string> {
 return await this.emailInput.evaluate((elm) => {
      return (elm as HTMLInputElement).validationMessage;
 }
 ); 
}

}