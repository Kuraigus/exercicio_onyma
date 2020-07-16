//Chave de configuracao do firebase para conectar API com o banco de dados
var firebaseConfig = {
    apiKey: process.env.firebase_KEY,
    authDomain: process.env.firebase_DOMAIN,
    databaseURL: process.env.firebase_DATABASEURL,
    projectId: process.env.firebase_PROJECTID,
    storageBucket: process.env.firebase_STORAGEBUCKET,
    messagingSenderId: process.env.firebase_MESSAGINGSENDERID,
    appId: process.env.firebase_APPID
};

module.exports = firebaseConfig