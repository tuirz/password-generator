// FONCTION GENERER MDP
function generatePassword(length) {
    const sets = [
        { chars: "abcdefghijklmnopqrstuvwxyz", use: document.getElementById('lowercase')?.checked },
        { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", use: document.getElementById('uppercase')?.checked },
        { chars: "0123456789", use: document.getElementById('numbers')?.checked },
{ chars: "!@#$%^&*()_+-=[]{}|;:,.<>?", use: document.getElementById('specials')?.checked }
];
let all = sets.filter(s => s.use).map(s => s.chars).join('');
if (!all) return "";
let pwd = sets.filter(s => s.use).map(s => s.chars[Math.floor(Math.random() * s.chars.length)]);
for (let i = pwd.length; i < length; i++) pwd.push(all[Math.floor(Math.random() * all.length)]);
return pwd.sort(() => Math.random() - 0.5).join('');

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
    addToHistory(password);
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

// HISTORIQUE DES MDP
let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory') || '[]');

function addToHistory(password) {
    if (!password) return;
    passwordHistory.unshift(password);
    passwordHistory = passwordHistory.slice(0, 5);
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    document.getElementById('history').innerHTML = passwordHistory
        .map(pwd => `<li style="word-break:break-all;background:#222;color:#00e5ff;padding:4px 8px;margin-bottom:6px;border-radius:6px;">${escape(pwd)}</li>`)
        .join('');
}

// AFFICHE L'HISTORIQUE AU CHARGEMENT
window.addEventListener('DOMContentLoaded', () => addToHistory());