import path from "path";
import fs from "fs";
import * as yaml from "js-yaml";

//definition d'une interface pour sturcturer les données de payment
interface PaymentConfig {
    cardName: string;
    cardNumber: string;
    cvc: string;
    expirationMonth: string;
    expirationYear: string;
}

interface UserConfig {
    login: string;
    password: string;
}

interface EnvironnementConfig {
    urlTest: string;
    urlPreprod: string;
}

export interface AppConfig {
    payment: PaymentConfig;
    user: {
        admin: UserConfig;
        superAdmin: UserConfig;
    };

   /* userSuperAdmin: {
            superAdmin: UserConfig;
    };
    */
    environnement: EnvironnementConfig;
}

//fonction pour charger le fichier yaml,
function loadConfig(): AppConfig {

    //construire le chemin vers config.yaml
    const configPath = path.resolve(__dirname, 'config.yaml');

    //lire le fichier yaml 
    const file = fs.readFileSync(configPath, 'utf-8'); //utf_8 pour decoder et lire texte

    // parcer le fichier yaml en javascript
    const yamlData = yaml.load(file) as any;

    //retourner l'objet generer 
    return {
        payment: yamlData.payment,
        user:{
           admin: yamlData.user.admin,
           superAdmin: yamlData.user.superAdmin,
        },
       // userSuperAdmin: yamlData.user.superAdmin,
        environnement: yamlData.environnement,
    
}
}
export const config = loadConfig();