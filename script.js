// Seleciona os elementos do HTML que vamos manipular
const display = document.getElementById('result');
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Função para adicionar um caractere ao visor
function appendCharacter(char) {
    // Evita múltiplos operadores ou pontos em sequência
    const lastChar = display.value.slice(-1);
    if (isOperator(lastChar) && isOperator(char)) {
        return; // Não faz nada se o último e o atual são operadores
    }
    if (lastChar === '.' && char === '.') {
        return; // Não permite dois pontos seguidos
    }

    display.value += char;
}

// Função para limpar o visor
function clearDisplay() {
    display.value = '';
}

// Função para apagar o último caractere
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Função para calcular o resultado da expressão no visor
function calculateResult() {
    try {
        // Substitui os símbolos visuais pelos operadores corretos para o cálculo
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        
        // 'eval' calcula a string como uma expressão matemática.
        // É simples para este projeto, mas use com cuidado em projetos maiores.
        const result = eval(expression);

        // Se o resultado for um número válido, exibe no visor
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Erro';
        } else {
            display.value = result;
        }
    } catch (error) {
        // Em caso de expressão inválida (ex: "5++2"), exibe "Erro"
        display.value = 'Erro';
    }
}

// Função auxiliar para verificar se um caractere é um operador
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// --- LÓGICA PARA ALTERNAR O TEMA ---

// Adiciona um "ouvinte" de evento de clique no botão de tema
themeToggleButton.addEventListener('click', () => {
    // A função 'toggle' adiciona a classe 'light-mode' se ela não existir
    // e a remove se ela já existir.
    body.classList.toggle('light-mode');

    // Muda o ícone do botão dependendo do tema atual
    if (body.classList.contains('light-mode')) {
        themeToggleButton.textContent = '☀️';
    } else {
        themeToggleButton.textContent = '🌙';
    }
});
