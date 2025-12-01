// --- JAVASCRIPT ---

let entregas = [];
let indiceEdicao = -1;

// NOVA VARIÁVEL: Guarda qual linha foi clicada (-1 significa nenhuma)
let indiceSelecionado = -1;

// Elementos
const modal = document.getElementById("modalAdicionar");
const tbody = document.getElementById("tabela-corpo");
const form = document.getElementById("formEntrega");
const tituloModal = document.querySelector(".modal-box h3");
const btnEditarSidebar = document.getElementById("btnEditarSidebar"); // O botão da navbar

// --- INTERAÇÃO COM A NAVBAR ---

// Quando clica no botão "Editar" da barra lateral
btnEditarSidebar.addEventListener("click", function() {
    if (indiceSelecionado === -1) {
        alert("Por favor, clique em uma linha da tabela para selecionar primeiro.");
    } else {
        // Se tiver alguém selecionado, abre a edição para ele
        prepararEdicao(indiceSelecionado);
    }
});


// --- FUNÇÕES DE MODAL ---

function abrirModal() {
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
    form.reset();
    indiceEdicao = -1;
    tituloModal.innerText = "Nova Entrega";
}

// --- FUNÇÕES DE LÓGICA ---

// Função chamada ao clicar numa linha da tabela
// Função chamada ao clicar numa linha da tabela
function selecionarLinha(index) {
    // LÓGICA DE TOGGLE (ALTERNAR)
    if (indiceSelecionado === index) {
        // Se eu cliquei na mesma linha que já estava marcada, eu desmarco.
        indiceSelecionado = -1; 
    } else {
        // Se eu cliquei numa linha nova, eu marco essa nova.
        indiceSelecionado = index;
    }

    // Recarrega a tabela para atualizar as cores (adicionar ou remover o cinza)
    carregarTabela(); 
}

function prepararEdicao(index) {
    indiceEdicao = index;
    const entrega = entregas[index];

    document.getElementById("inputNome").value = entrega.nome;
    document.getElementById("inputID").value = entrega.id;
    document.getElementById("inputData").value = entrega.data;
    document.getElementById("inputStatus").value = entrega.status;

    tituloModal.innerText = "Editar Entrega";
    abrirModal();
}

function excluirEntrega(index) {
    if(confirm("Tem certeza?")) {
        entregas.splice(index, 1);
        indiceSelecionado = -1; // Limpa a seleção se excluir
        carregarTabela();
    }
}

function obterClasseStatus(status) {
    if (status === "Embalado") return "status-embalado";
    if (status === "Transportando") return "status-transportando";
    if (status === "Entregado") return "status-entregado";
    if (status === "Interrompido") return "status-interrompido";
    return "";
}

// --- SUBMIT ---

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const novaEntrega = {
        nome: document.getElementById("inputNome").value,
        id: document.getElementById("inputID").value,
        data: document.getElementById("inputData").value,
        status: document.getElementById("inputStatus").value
    };

    if (indiceEdicao >= 0) {
        entregas[indiceEdicao] = novaEntrega;
    } else {
        entregas.push(novaEntrega);
    }

    carregarTabela();
    fecharModal();
});

// --- RENDERIZAÇÃO ---

function carregarTabela() {
    tbody.innerHTML = "";

    if (entregas.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center; padding: 20px;'>Nenhuma entrega.</td></tr>";
        return;
    }

    entregas.forEach((entrega, index) => {
        const classeCor = obterClasseStatus(entrega.status);
        
        // Verifica se esta é a linha selecionada para aplicar a classe CSS
        const classeSelecionada = (index === indiceSelecionado) ? "selecionada" : "";

        // Adicionei onclick="selecionarLinha(${index})" na tag <tr>
        const linha = `
            <tr class="${classeSelecionada}" onclick="selecionarLinha(${index})">
                <td><strong>${entrega.nome}</strong></td>
                <td>${entrega.id}</td>
                <td>${entrega.data}</td>
                <td><span class="status-badge ${classeCor}">${entrega.status}</span></td>
                <td>
                    <button class="action-btn" onclick="excluirEntrega(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        
        tbody.innerHTML += linha;
    });
}

carregarTabela();