var prompt = require('prompt-sync')();
const CARD_TYPES = ['eau', 'feu', 'plante'];

function obtenirplayerCardChoice() {
    const cardChoice = prompt('Veuillez choisir votre carte(Eau, Feu ou Plante): ');
    if(!CARD_TYPES.some(card => card === cardChoice.toLowerCase())) { 
        console.log('Votre carte n\'est pas valide');
        obtenirplayerCardChoice();
    }
    return cardChoice.toLowerCase();
        
}

function getBotChoice() {
    return CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)];
}

function getResultOfRound(playerCardChoice, botCardChoice) {
    if (playerCardChoice === botCardChoice) {
        return 'Égalité';
    } else if (
        (playerCardChoice === 'eau' && botCardChoice === 'feu') ||
        (playerCardChoice === 'feu' && botCardChoice === 'plante') ||
        (playerCardChoice === 'plante' && botCardChoice === 'eau')
    ) {
        return 'Victoire';
    } else {
        return 'Perdu';
    }
}

// Fonction principale du jeu
function play() {
    console.log('Bienvenue dans le jeu de bataille de cartes!');
    const pseudo = prompt('Veuillez saisir votre pseudo: ');

    let pointOfPlayer = 0;
    let pointOfBot = 0;

    // Boucle pour trois manches
    for (let manche = 1; manche <= 3; manche++) {
        console.log(`\nManche ${manche}:`);

        const playerCardChoice = obtenirplayerCardChoice();
        const botCardChoice = getBotChoice();

        console.log(`${pseudo} a choisi ${playerCardChoice}`);
        console.log(`Le robot a choisi ${botCardChoice}`);

        const resultRound = getResultOfRound(playerCardChoice, botCardChoice);
        console.log(`Résultat de la manche: ${resultRound}`);

        if (resultRound === 'Victoire') {
            pointOfPlayer++;
        } else if (resultRound === 'Perdu') {
            pointOfBot++;
        }
    }

    console.log(`\nRésultat final:`);
    console.log(`${pseudo}: ${pointOfPlayer} | Robot: ${pointOfBot}`);

    if (pointOfPlayer > pointOfBot) {
        console.log(`${pseudo} remporte la partie!`);
    } else if (pointOfBot > pointOfPlayer) {
        console.log(`Le robot remporte la partie!`);
    } else {
        const replay = prompt('Égalité! Voulez-vous rejouer? taper oui ou non: ');
        if (replay.toLowerCase() === 'oui') {
            play(); 
        } else {
            console.log(`Merci d\'avoir joué. À la prochaine!`);
        }
    }
}

play();