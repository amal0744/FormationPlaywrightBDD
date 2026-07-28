import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "../support/pageFixture";
//import 'dotenv/config';
import *as fs from "fs";
import { title } from "node:process";
import { config } from "../config/configLoader";

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(50_000);
BeforeAll(async function () {
    browser = await chromium.launch({ headless: true });
    console.log('navigateur lancé')
}); 

Before(async function () {
    context = await browser.newContext({
     //   baseURL: process.env.BASE_URL,
     baseURL: config.environnement.urlTest,
        recordVideo: {
            dir: './rapports/video'
        }
    }),
        pageFixture.page = await context.newPage(),
        console.log('une nouvelle page ouverte')

});

After(async function ({ result, pickle }) {
    if (result?.status == Status.PASSED) {
        const img = await pageFixture.page.screenshot({
            path: `./rapports/screenshot/${pickle.name}.png`,
            type: 'png'
        });
        await this.attach(img, 'image/png')
    }
    await pageFixture.page.close();
    await context.close();

    // lancer le video et recuperer son chemin
    const videoPath = await pageFixture.page.video()?.path();
    if (result?.status == Status.PASSED) {
        //garder la video
        const video = fs.readFileSync(videoPath);
        //attacher la video au rapport allure
        await this.attach(video, 'video/webm');
    }
});

AfterAll(async function () {
    await browser.close(),
        console.log('navigateur fermé')
});