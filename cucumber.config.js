module.exports = {
    default: {
        paths: ['src/features/**/*.feature'],
        require: [
            'src/hooks/hooks.ts',   // ou 'src/hooks/*.ts'
            'src/steps/**/*.ts',
            'src/support/pageFixture.ts'
        ],
        tags: '@registration',
        requireModule: ['ts-node/register'],
        format: [
            'progress-bar',
            'allure-cucumberjs/reporter',
            ['html', 'rapports/cucumber-report.html'],
            ['json', 'rapports/cucumber-report.json']
        ],
        formatOptions: {
            snippetInterface: 'async-await'
        }
    }
}