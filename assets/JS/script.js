<script>

        [
            { id: "RCS-01", nome: "Carlos Silva", data: "2023-11-20", status: "Aprovado" },
            { id: "RCS-02", nome: "Ana Pereira", data: "2023-11-22", status: "Pendente" },
            { id: "RCS-03", nome: "Loja Tech", data: "2023-11-19", status: "Cancelado" },
            { id: "RCS-04", nome: "Roberto Santos", data: "2023-11-25", status: "Aprovado" },
            { id: "RCS-05", nome: "Fernanda Lima", data: "2023-11-21", status: "Pendente" }
        ];

     
        {
            if (status === "Aprovado") return "status-aprovado"; // Verde
            if (status === "Pendente") return "status-pendente"; // Amarelo
            if (status === "Cancelado") return "status-cancelado"; // Vermelho
            return "";
        }

        {
            const tbody = document.getElementById("tabela-corpo");
            tbody.innerHTML = ""; // Limpa antes de desenhar

            // Para cada entrega na lista, cria uma linha (tr)
            entregas.forEach(entrega => {
                const classeCor = obterClasseStatus(entrega.status);
                
                const linha = `
                    <tr>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                        <td><strong>${entrega.nome}</strong></td>
                        <td>${entrega.id}</td>
                        <td>${entrega.data}</td>
                        <td>
                            <span class="status-badge ${classeCor}">
                                ${entrega.status}
                            </span>
                        </td>
                        <td>
                            <button class="action-btn" title="Editar"><i class="fa-solid fa-pen"></i></button>
                            <button class="action-btn" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                
       
                tbody.innerHTML += linha;
            });
        }

       
</script>