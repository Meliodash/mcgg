const enemies = [];
const MAX = 7;

const input = document.getElementById('enemyInput');
const counter = document.getElementById('counter');
const list = document.getElementById('enemyList');
const result = document.getElementById('result');

function updateCounter() {
    counter.textContent = `${enemies.length}/${MAX}`;
}

function addEnemy() {
    const name = input.value.trim();
    if (!name || enemies.length >= MAX) return;

    enemies.push(name);
    input.value = '';
    updateCounter();

    list.innerHTML = enemies
        .map(e => `<span class="enemy-tag">${e}</span>`)
        .join('');

    result.className = '';
    result.textContent = 'Siap dihitung';
}

function setWaiting(text) {
    result.className = 'waiting';
    result.textContent = text;
}

function showResult(lines) {
    result.className = '';
    result.textContent = lines.join('\n');
}

async function calculate() {
    if (enemies.length !== MAX) {
        alert('Masukkan 7 lawan');
        return;
    }

    setWaiting('Memproses');

    try {
        const res = await fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enemies })
        });

        const data = await res.json();

        // ✅ OUTPUT HANYA NAMA
        showResult([
            data.ronde8,
            data.ronde9,
            data.ronde10
        ]);

    } catch (e) {
        result.className = '';
        result.textContent = 'Server error';
    }
}

function resetAll() {
    enemies.length = 0;
    input.value = '';
    list.innerHTML = '';
    updateCounter();
    setWaiting('Menunggu input');
}

updateCounter();
setWaiting('Menunggu input');
