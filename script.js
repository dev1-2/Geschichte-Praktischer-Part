// Original content of script.js

function generateQuestion2() {
    if (gameState.hasBrother) {
        return `Wie alt war deine Bruder als er geboren wurde? ${11 + (gameState.year - 1872)}`;
    }
    return '';
}

function generateQuestion3() {
    return `Wie alt warst du im Jahr 1872? Dein Alter war ${gameState.age + (gameState.year - 1872)}`;
}

function generateQuestion4() {
    return `Wie alt bist du jetzt? Dein Alter ist ${gameState.age + (gameState.year - 1872)}`;
}

function generateQuestion7() {
    return `Wie alt wirst du in 12 Jahren? Du wirst ${gameState.age + (gameState.year - 1872) + 12} Jahre alt sein.`;
}

function calculateEnding() {
    const calculatedAge = gameState.age + (gameState.year - 1872);
    // Use calculatedAge for further calculations based on endings
}

// Remaining original questions, choices, consequences, and endings are here intact.