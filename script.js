let nomes = [];

function adicionarNome() {
    const nomeInput = document.getElementById("nomeInput");
    const nome = nomeInput.value.trim();

    if (nome && !nomes.includes(nome)) {
        nomes.push(nome);
        atualizarLista();
        nomeInput.value = '';
    } else {
        alert("Nome inválido ou já existente na lista!");
    }
}

function verificarEnter(event) {
    if (event.key === 'Enter') {
        adicionarNome();
    }
}

function removerNome(index) {
    nomes.splice(index, 1);
    atualizarLista();
}

function limparLista() {
    nomes = [];
    atualizarLista();

    // Agora também limpa os resultados sorteados
    document.getElementById("resultado").innerHTML = '';
}

function atualizarLista() {
    const lista = document.getElementById("listaNomes");
    lista.innerHTML = ''; // Limpar a lista

    nomes.forEach((nome, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${nome} <button onclick="removerNome(${index})">Remover</button>`;
        lista.appendChild(li);
    });
}

function sortearAmigos() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos dois nomes para sortear!");
        return;
    }

    // Criar uma cópia dos nomes para fazer o sorteio
    const amigosSecretos = [...nomes];
    const pares = [];

    // Criar pares de forma cíclica
    for (let i = 0; i < amigosSecretos.length; i++) {
        const amigo = amigosSecretos[i];
        const proximoAmigo = amigosSecretos[(i + 1) % amigosSecretos.length]; // O último será par do primeiro
        pares.push(`O amigo secreto de ${amigo} é ${proximoAmigo}`);
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = '<h2>Amigos Secretos Sorteados:</h2>' + pares.join('<br>');
}
