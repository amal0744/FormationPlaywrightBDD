const { execSync, spawn } = require('child_process');
const fs = require('fs');

// verifier si le dossier allure existe déja
if (fs.existsSync('allure-results')) { //"rmSync" c pour supprimer le dossier et son contenu
  fs.rmSync('allure-results', { recursive: true });
}
// sert a la recréation d'un nouveau dossier pour stocker les nouveaux resultat
fs.mkdirSync('allure-results');

console.log('Lancement des tests');
try {
  execSync('cucumber-js --config cucumber.config.js', {
    stdio: 'inherit'
  });

} catch (e) {
  // Tests échoués → on continue quand même pour générer le rapport
}

const files = fs.readdirSync('allure-results');

//console.log('allure-results contient', files.lenght, 'fichier.');
console.log(`📁 allure-results contient ${files.length} fichiers`);

//si le dossier est vide alors on arrete l'exécution
if (files.length === 0) {
  process.exit(1);
}

const now = new Date();

const pad = (n) => String(n).padStart(2, '0');

const timestamp =

  `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}` +

  `_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

const outputDir = `allure-report/${timestamp}`;

execSync(`allure generate allure-results --clean -o ${outputDir}`, {

  stdio: 'inherit'

});
/* en mode asynchrone const server = spawn('allure', ['open', outputDir], {

  stdio: 'inherit',

  detached: false,

}); */

//en mode synchrone execSync 
execSync(`npx allure open ${outputDir}`, {
  stdio: 'inherit',
});
