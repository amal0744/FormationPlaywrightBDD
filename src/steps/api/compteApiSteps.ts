import { Before, Given, Then, When } from "@cucumber/cucumber";
import { APIRequestContext, APIResponse, expect, request } from "@playwright/test";
import { CompteApi } from "../../api/compteApi";
import 'dotenv/config';

let apiContext: APIRequestContext;
let compteApi: CompteApi;
let testEmail: string;
let testPassword: string;
let reponse: APIResponse;
let listeData: {
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
};
//soit on met befor dans ce fichier ou bien on peut cree un autre hooks pour API
Before({ tags: '@apiCompte' }, async function () {
  //creer un client http independant
  apiContext = await request.newContext({ baseURL: process.env.API_BASE_URL });
  //instancier la classe CompteApi 
  compteApi = new CompteApi(apiContext);
})
 
// API POST Create Compte

Given('l\'api automatisation exercice est disponible', async function () {
  const reponse = await apiContext.get(`${process.env.API_BASE_URL}/productsList`)
  expect(reponse.status()).toBe(200);
});
console.log("Api disponible");

Given('un email unique doit etre generer', async function () {
  testEmail = `uptotest_${Date.now()}@gmail.com`;
  testPassword = 'azerty';
  listeData = {
    name: "Amal",
    email: testEmail,
    password: testPassword,
    title: "Mme",
    birth_date: '28',
    birth_month: '11',
    birth_year: '2000',
    firstname: 'test',
    lastname: 'test',
    company: 'test',
    address1: 'test',
    country: 'test',
    zipcode: '78140',
    state: 'monreal',
    city: 'test',
    mobile_number: '074125666',
  }
  console.log('email generer :', testEmail);
});

When('je cree le compte avec les donnees generer', async function () {
  reponse = await compteApi.creerCompte(listeData);
  console.log(reponse.status());
});

Then('le code de reponse devrait etre {int}', async function (codeAttendu: number) {
  const body = await compteApi.parseResponse(reponse);
  console.log(body);
  expect(body.code).toBe(codeAttendu);
});

Then('le message devrait contenir {string}', async function (messageAttendu: string) {
  const body = await compteApi.parseResponse(reponse);
  console.log(body);
  expect(body.message).toBe(messageAttendu);
});

// API GET Read

When('je récupere les donneer du compte par email', async function () {
  reponse = await compteApi.getUserByEmail(testEmail, testPassword);
  console.log('retour read', reponse.status());
});

Then('les details devrait contenir le nom de l\'utilisateur', async function () {
  const body = await compteApi.parseResponse(reponse);
  expect(body.user).toBeDefined();
  expect((body.user).name).toBeDefined();
  expect((body.user).email).toBe(testEmail);
  console.log(`user.name: ${(body.user).name}`);
  console.log(`user.email: ${(body.user).email}`);
});

// API PUT Update

When('je met a jour le nom du compte avec {string}', async function (newName: string) {
  const updateData = {
    ...listeData,
    name: newName,
  }
  reponse = await compteApi.updateCompte(updateData),
    console.log(`put new name, ${newName}`);
  console.log(reponse.status());
});

// API Delete 

When('je supprime le compte', async function () {
  reponse = await compteApi.deleteAccount(testEmail, testPassword);
  console.log(reponse.status());

});
