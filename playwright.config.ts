import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './src',

    use: {
        baseURL: process.env.BASE_URL,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 10000,
        navigationTimeout: 20000
    },
    projects: [
        {
           name: 'chromium',
           use:{...devices['Desktop Chrome']},
        }
    ]

})