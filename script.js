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
    document.getElementById("resultado").innerHTML = ''; // Limpa o resultado do sorteio
}

function atualizarLista() {
    const lista = document.getElementById("listaNomes");
    lista.innerHTML = '';

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

    let amigosSecretos = [...nomes];

    // Embaralhar os nomes aleatoriamente usando Fisher-Yates Shuffle
    for (let i = amigosSecretos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosSecretos[i], amigosSecretos[j]] = [amigosSecretos[j], amigosSecretos[i]];
    }

    // Garantir que ninguém tire a si mesmo
    let invalido = false;
    for (let i = 0; i < amigosSecretos.length; i++) {
        if (amigosSecretos[i] === nomes[i]) {
            invalido = true;
            break;
        }
    }

    // Se houver um nome igual na mesma posição, refazer o sorteio
    if (invalido) {
        return sortearAmigos();
    }

    // Criar os pares sorteados
    const pares = [];
    for (let i = 0; i < amigosSecretos.length; i++) {
        const amigo = nomes[i];
        const amigoSecreto = amigosSecretos[i];
        pares.push(`O amigo secreto de ${amigo} é ${amigoSecreto}`);
    }

    document.getElementById("resultado").innerHTML = '<h2>Amigos Secretos Sorteados:</h2>' + pares.join('<br>');
}
