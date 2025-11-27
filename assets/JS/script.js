// Dados da tabela (simula um banco de dados)
const vendors = [
    {
        vendor: "Harbor Goods",
        type: "Clothing",
        owner: "Darlene Robertson",
        number: "+61 2 4927 5996",
        email: "miyokoto@mail.ru",
        order: 0,
        address: "82 Subidbazar",
        status: "Pending"
    },
    {
        vendor: "Nova Finds",
        type: "Electric",
        owner: "Annette Black",
        number: "+61 2 6178 5284",
        email: "seema@gmail.com",
        order: 132,
        address: "24 New Market",
        status: "Inactive"
    },
    {
        vendor: "The Local Loft",
        type: "Clothing",
        owner: "Savannah Nguyen",
        number: "+61 8 8223 0323",
        email: "dric@gmail.com",
        order: 200,
        address: "Devtakhum",
        status: "Active"
    }
];

function carregarTabela() {
    const tbody = document.getElementById("tabela-body");

    vendors.forEach((item) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.vendor}</td>
            <td>${item.type}</td>
            <td>${item.owner}</td>
            <td>${item.number}</td>
            <td>${item.email}</td>
            <td>${item.order}</td>
            <td>${item.address}</td>
            <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
        `;

        tbody.appendChild(tr);
    });
}

carregarTabela();
