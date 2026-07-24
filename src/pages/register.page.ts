import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class RegisterPage extends BasePage {
    readonly newUserSignupTitle: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly titleMrRadio: Locator;
    readonly titleMrsRadio: Locator;
    readonly nameAccountInput: Locator;
    readonly emailAccountInput: Locator;
    readonly passwordInput: Locator;
    readonly daysSelect: Locator;
    readonly monthsSelect: Locator;
    readonly yearsSelect: Locator;
    readonly newsletterCheckbox: Locator;
    readonly offersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedTitle: Locator;
    readonly existingEmailErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.newUserSignupTitle = this.page.locator('h2', { hasText: 'New User Signup!' });
        this.signupNameInput = this.page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = this.page.locator('[data-qa="signup-email"]');
        this.signupButton = this.page.locator('[data-qa="signup-button"]');
        this.titleMrRadio = this.page.locator('input[name="title"][value="Mr"]');
        this.titleMrsRadio = this.page.locator('input[name="title"][value="Mrs"]');
        this.nameAccountInput = this.page.locator('[data-qa="name"]');
        this.emailAccountInput = this.page.locator('[data-qa="email"]');
        this.passwordInput = this.page.locator('[data-qa="password"]');
        this.daysSelect = this.page.locator('[data-qa="days"]');
        this.monthsSelect = this.page.locator('[data-qa="months"]');
        this.yearsSelect = this.page.locator('[data-qa="years"]');
        this.newsletterCheckbox = this.page.locator('input[name="newsletter"]');
        this.offersCheckbox = this.page.locator('input[name="optin"]');
        this.firstNameInput = this.page.locator('[data-qa="first_name"]');
        this.lastNameInput = this.page.locator('[data-qa="last_name"]');
        this.companyInput = this.page.locator('[data-qa="company"]');
        this.addressInput = this.page.locator('[data-qa="address"]');
        this.address2Input = this.page.locator('[data-qa="address2"]');
        this.countrySelect = this.page.locator('[data-qa="country"]');
        this.stateInput = this.page.locator('[data-qa="state"]');
        this.cityInput = this.page.locator('[data-qa="city"]');
        this.zipcodeInput = this.page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = this.page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = this.page.locator('[data-qa="create-account"]');
        this.accountCreatedTitle = this.page.locator('h2', { hasText: 'Account Created!' });
        this.existingEmailErrorMessage = this.page.getByText('Email Address already exist!', { exact: true });
    }

    async navigate(): Promise<void> {
        await this.page.goto('/login'); 
        await this.accepterPopup();
        await this.newUserSignupTitle.click();
    }

    async fillInitialSignup(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async clickInitialSignup(): Promise<void> {
        await this.signupButton.click();
    }

    async selectTitleMr(): Promise<void> {
        await this.titleMrRadio.check();
    }

    async selectTitleMrs(): Promise<void> {
        await this.titleMrsRadio.check();
    }

    async fillAccountName(name: string): Promise<void> {
        await this.nameAccountInput.fill(name);
    }

    async fillAccountPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async selectBirthdate(day: string, month: string, year: string): Promise<void> {
        await this.daysSelect.selectOption({ label: day });
        await this.monthsSelect.selectOption({ label: month });
        await this.yearsSelect.selectOption({ label: year });
    }

    async toggleNewsletter(checked: boolean): Promise<void> {
        if (checked) {
            await this.newsletterCheckbox.check();
        } else {
            await this.newsletterCheckbox.uncheck();
        }
    }

    async toggleOffers(checked: boolean): Promise<void> { 
        if (checked) {
            await this.offersCheckbox.check();
        } else {
            await this.offersCheckbox.uncheck();
        }
    }

    async fillAddress(firstName: string, lastName: string, company: string, address: string, address2: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.addressInput.fill(address);
        await this.address2Input.fill(address2);
        await this.countrySelect.selectOption({ label: country });
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async clickCreateAccount(): Promise<void> {
        await this.createAccountButton.click();
    }

    async selectCountry(country: string): Promise<void> {
        await this.countrySelect.selectOption({ label: country });
    }

    async fillSignupField(field: string, value: string): Promise<void> {
        switch (field) {
            case 'Name':
                await this.signupNameInput.fill(value);
                break;
            case 'Email Address':
                await this.signupEmailInput.fill(value);
                break;
            default:
                throw new Error(`Champ de signup non géré : ${field}`);
        }
    }

    async fillAccountField(field: string, value: string): Promise<void> {
        switch (field) {
            case 'Password':
                await this.passwordInput.fill(value);
                break;
            case 'First name':
                await this.firstNameInput.fill(value);
                break;
            case 'Last name':
                await this.lastNameInput.fill(value);
                break;
            case 'Company':
                await this.companyInput.fill(value);
                break;
            case 'Address':
                await this.addressInput.fill(value);
                break;
            case 'Address2':
                await this.address2Input.fill(value);
                break;
            case 'State':
                await this.stateInput.fill(value);
                break;
            case 'City':
                await this.cityInput.fill(value);
                break;
            case 'Zipcode':
                await this.zipcodeInput.fill(value);
                break;
            case 'Mobile Number':
                await this.mobileNumberInput.fill(value);
                break;
            default:
                throw new Error(`Champ de compte non géré : ${field}`);
        }
    }

    async selectTitle(title: string): Promise<void> {
        if (title === 'Mr') {
            await this.selectTitleMr();
        } else if (title === 'Mrs') {
            await this.selectTitleMrs();
        } else {
            throw new Error(`Titre non géré : ${title}`);
        }
    }

    async checkOption(option: string): Promise<void> {
        if (option.includes('newsletter')) {
            await this.toggleNewsletter(true);
        } else if (option.includes('special offers')) {
            await this.toggleOffers(true);
        } else {
            throw new Error(`Option inconnue : ${option}`);
        }
    }

    async isAccountCreated(): Promise<boolean> {
        return await this.accountCreatedTitle.isVisible();
    }

    async getExistingEmailErrorText(): Promise<string> {
        return (await this.existingEmailErrorMessage.textContent()) ?? '';
    }

    async acceptCookiePopup(): Promise<void> {
        await this.accepterPopup();
    }
}
