import { APIRequestContext, APIResponse } from "@playwright/test";
import 'dotenv/config';

//url de base de l'api
const apiBaseUrl = process.env.API_BASE_URL || 'https://automationexercise.com/api';

export class CompteApi {

    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //// API POST Create Compte

    async creerCompte(data: {
        name: string;
        email: string;
        password: string;
        title: string;
        birth_date: string;
        birth_month: string;
        birth_year: string;
        firstname: string;
        lastname: string;
        company: string;
        address1: string;
        country: string;
        zipcode: string;
        state: string;
        city: string;
        mobile_number: string;
    }): Promise<APIResponse> {
        return await this.request.post(`${apiBaseUrl}/createAccount`, {
            form: data
        });
    }
    // parser la réponse de chaque etape
    async parseResponse(reponse: APIResponse): Promise<{
        code: number;
        message: string;
        user: Record<string, unknown>;
    }> {
        const body = await reponse.json();
        return {
            code: body.responseCode,
            message: body.message,
            user: body.user,
        }
    }

    //API GET Read

    async getUserByEmail(email: string, password: string): Promise<APIResponse> {
        return await this.request.get(`${apiBaseUrl}/getUserDetailByEmail`, {
            params: { email, password },
        })
    }

    // API PUT Update

    async updateCompte(data: {
        name: string;
        email: string;
        password: string;
        title: string;
        birth_date: string;
        birth_month: string;
        birth_year: string;
        firstname: string;
        lastname: string;
        company: string;
        address1: string;
        country: string;
        zipcode: string;
        state: string;
        city: string;
        mobile_number: string;
    }): Promise<APIResponse> {
        return await this.request.put(`${apiBaseUrl}/updateAccount`, {
            form: data
        });
    }

    // delete Account 

    async deleteAccount(email: string, password: string): Promise<APIResponse> {
        return this.request.delete(`${apiBaseUrl}/deleteAccount`, {form: {email, password}})
    }
}