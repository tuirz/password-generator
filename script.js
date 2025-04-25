// FONCTION GENERER MDP
function generatePassword(length) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // INCLU TOUS LES CARACTERES
    let allChars = lower + upper + numbers + specials;
    let password = [
        lower[Math.floor(Math.random() * lower.length)],
        upper[Math.floor(Math.random() * upper.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        specials[Math.floor(Math.random() * specials.length)]
    ];

    // RESPECT DU NOMBRE DE CARACTERE 
    for (let i = password.length; i < length; i++) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // MDP ALEATOIRE
    password = password.sort(() => Math.random() - 0.5);

    // MDP FINAL
    return password.join('');
}

// BOUTON GENERER
document.getElementById('generate').addEventListener('click', function() {
    const lengthInput = document.getElementById('length');
    const resultDiv = document.getElementById('password');
    let length = parseInt(lengthInput.value, 10);

    // VERIFICATION DE LA LONGUEUR
    if (isNaN(length) || length < 12 || length > 128) {
        resultDiv.textContent = "Sélectionnez un nombre entre 12 et 128.";
        resultDiv.style.color = "red";
        return;
    }

// AFFICHAGE DU MDP
    const password = generatePassword(length);
    resultDiv.textContent = password;
    resultDiv.style.color = "black";
    checkPasswordStrength(password);
});

// BOUTON COPIER
document.getElementById('copy').addEventListener('click', function() {
    const resultDiv = document.getElementById('password');
    const password = resultDiv.textContent;
    if (password && password.length >= 12) {
        navigator.clipboard.writeText(password);
        resultDiv.style.background = "#d4ffd4";
        setTimeout(() => resultDiv.style.background = "", 800);
    }
});

// BOUTON EFFACER
document.getElementById('clear').addEventListener('click', function() {
    const resultDiv = document.getElementById('password');
    resultDiv.textContent = "";
    resultDiv.style.background = "";
    // CLEAR FORCE WHEN CLICK CLEAR
    document.getElementById('strength-fill').style.width = "0";
    document.getElementById('strength-text').textContent = "";
});

// BARRE FORCE DU MDP
function checkPasswordStrength(password) {
    let hasLower = /[a-z]/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

    let color = "red", text = "Faible", width = "20%";

    if (password.length >= 120 && hasLower && hasUpper && hasNumber && hasSpecial) {
        color = "#00e676"; text = "Excellent"; width = "100%";
    } else if (password.length >= 96) {
        color = "green"; text = "Très fort"; width = "80%";
    } else if (password.length >= 48) {
        color = "yellow"; text = "Fort"; width = "60%";
    } else if (password.length >= 24) {
        color = "orange"; text = "Moyen"; width = "40%";
    }

    let fill = document.getElementById('strength-fill');
    fill.style.width = width;
    fill.style.background = color;

    let strengthText = document.getElementById('strength-text');
    strengthText.textContent = text;
    strengthText.style.color = color;
}