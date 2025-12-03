/* Tabela começa vazia */
let entregas = [];
let indiceEdicao = -1;

/* Nenhuma linha é selecionada */
let indiceSelecionado = -1;

/* Conexão dos elementos do html */
const modal = document.getElementById("modalAdicionar");
const tbody = document.getElementById("tabela-corpo");
const form = document.getElementById("formEntrega");
const tituloModal = document.querySelector(".modal-box h3");
const btnEditarSidebar = document.getElementById("btnEditarSidebar"); 

/* Configurações referentes ao botão de editar. Caso nenhuma linha da tabela for selecionada, emissão do alerta */
btnEditarSidebar.addEventListener("click", function() {
    if (indiceSelecionado === -1) {
        alert("Por favor, clique em uma linha da tabela para selecionar primeiro.");
    } else {
        
        prepararEdicao(indiceSelecionado);
    }
});



/* Configurações referentes a caixa de preenchimento da tabela */
function abrirModal() {
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
    form.reset();
    indiceEdicao = -1;
    tituloModal.innerText = "Nova Entrega";
}


/* Configurações referentes a ação de selecionar para editar */
function selecionarLinha(index) {
    indiceSelecionado = index;
    carregarTabela(); 
}

/* Configurações referentes a ação de editar */
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

/* Configurações referentes a ação de excluir uma linha  */
function excluirEntrega(index) {
    if(confirm("Tem certeza?")) {
        entregas.splice(index, 1);
        indiceSelecionado = -1; 
        carregarTabela();
    }
}

/* Configurações referentes a coluna de status, cores. */
function obterClasseStatus(status) {
    if (status === "Embalado") return "status-embalado";
    if (status === "Transportando") return "status-transportando";
    if (status === "Entregado") return "status-entregado";
    if (status === "Interrompido") return "status-interrompido";
    return "";
}


/* Configurações referentes a entrega das informações do input na tabela */
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

    mostrarMensagemSucesso(); 
});

/* Configurações referentes a ação de editar, caso usado, ou de nova */
function carregarTabela() {
    tbody.innerHTML = "";

    if (entregas.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center; padding: 20px;'>Nenhuma entrega.</td></tr>";
        return;
    }

    entregas.forEach((entrega, index) => {
        const classeCor = obterClasseStatus(entrega.status);
        
       
        const classeSelecionada = (index === indiceSelecionado) ? "selecionada" : "";

        
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
/* Configurações referentes a mensagem de registro feito com sucesso */
        function mostrarMensagemSucesso() {
            const msg = document.getElementById("msgSucesso");
            
            // Mostra a mensagem
            msg.style.display = "block";

            // Esconde a mensagem automaticamente após 3 segundos (3000 milissegundos)
            setTimeout(function() {
                msg.style.display = "none";
            }, 3000);
        }

/* Configurações referentes a tabela vazia, uma vez que carregada a tela novamente */
carregarTabela();