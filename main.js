/*Iniciar aplica��o*/

let contatos = [];

let contato = {};

let id = 0;

let btns = undefined;



(function () {



    /* Selecionar o Root*/

    const root = selector('#root');


    /* Aplicando no Container */

    root.appendChild(container());




    /* actions */

    const btn = selector('#btn');

    btn.addEventListener('click', btnControllerAdicionar, null);

}());



/* Container */

function container() {

    const section = createEL('section');

    section.style = 'width: 60%; margin: 0 auto;';


    /* Area de Adicionar Elementos */

    section.appendChild(cabecalho());

    section.appendChild(form());

    section.appendChild(table());


    return section;

};



/* Cabecalho */

function cabecalho() {

    const div = createEL('div');

    div.id = 'cabecalho';

    div.innerHTML = 'Contatos';


    return div;

};



/* FORM */

function form() {

    const form = createEL('form');

    form.appendChild(input('nome'));

    form.appendChild(input('email'));

    form.appendChild(input('telefone'));

    form.appendChild(button('Adicionar'));

    return form;

};



/* INPUT */

function input(text) {

    const input = createEL('input');

    input.id = text;

    input.text = 'text';

    input.placeholder = text[0].toUpperCase() + text.substring(1);


    return input;

};



/* BUTTON */

function button(text) {

    const button = createEL('button');

    button.id = 'btn';

    button.innerHTML = text;


    return button;

};



/* TABLE */

function table() {

    const table = createEL('table');

    const thead = createEL('thead');

    const tbody = createEL('tbody');

    const tr = createEL('tr');

    const thN = createEL('th');

    const thE = createEL('th');

    const thT = createEL('th');

    const thOP = createEL('th');


    thN.innerHTML = 'Nome';

    thE.innerHTML = 'Email';

    thT.innerHTML = 'Telefone';

    thOP.innerHTML = 'Opções'


    tr.appendChild(thN);

    tr.appendChild(thE);

    tr.appendChild(thT);

    tr.appendChild(thOP);

    thead.appendChild(tr);


    table.appendChild(thead);

    table.appendChild(tbody);


    return table;

};



/* Monta objeto Contato preenchido */

function montaContato() {

    const elements = selectorALL('input');


    elements.forEach(element => {

        if (element.name) {

            contato.id = element.name;

            element.removeAttribute('name');

        }

        contato[element.id] = element.value;

        element.value = '';

    });


    return contato;

};



/*Render Table*/

function renderTable() {

    let tbody = selector('table tbody');

    tbody.innerHTML = '';


    contatos.forEach(c => {

        const tr = createEL('tr');

        const tdN = createEL('td');

        const tdE = createEL('td');

        const tdT = createEL('td');

        const tdOP = createEL('td');


        tdN.innerHTML = c.nome;

        tdE.innerHTML = c.email;

        tdT.innerHTML = c.telefone;


        const btnEditar = createEL('button');

        const btnExcluir = createEL('button');


        btnEditar.id = 'editar' + '_' + c.id;

        btnExcluir.id = 'excluir' + '_' + c.id;


        btnEditar.className = 'btn-editar';

        btnExcluir.className = 'btn-excluir';


        btnEditar.innerHTML = 'Editar';

        btnExcluir.innerHTML = 'Excluir';


        tdOP.appendChild(btnEditar);

        tdOP.appendChild(btnExcluir);


        tr.appendChild(tdN);

        tr.appendChild(tdE);

        tr.appendChild(tdT);

        tr.appendChild(tdOP);


        tbody.appendChild(tr);

    });



    // TODO implementar table sem contatos


    btns = selectorALL('button[class^="btn"]');

    btns.forEach(btn => btn.addEventListener('click', btnsControllerExEd, null));

}



/* Controllers */

function btnControllerAdicionar(event) {

    event.preventDefault();


    contato = montaContato();


    if (!contato.id) {

        id++

        contato.id = id;

        contatos.push(contato);

    } else {

        const encontrado = contatos.find(c => c.id == contato.id);

        const indexEncontrado = contatos.indexOf(encontrado);


        contatos.slice(indexEncontrado, 1);

        contatos[indexEncontrado] = contato;

    }

    contato = {};


    renderTable();

};



function btnsControllerExEd(event) {

    event.preventDefault();


    const [tipo, id] = event.target.id.split('_');

    if (tipo === 'excluir') {

        contatos = contatos.filter(c => c.id != id);

        renderTable();

    }


    if (tipo === 'editar') {

        const contatoEncontrado = contatos.find(c => c.id == id);

        const inputs = selectorALL('input');


        inputs.forEach(input => {

            if (input.id == 'nome') {

                input.name = id;

            }

            input.value = contatoEncontrado[input.id];

        });

    }

};





/* Utils */

function createEL(tipo) {

    return document.createElement(tipo);

};

function selector(element) {

    return document.querySelector(element);

};

function selectorALL(element) {

    return document.querySelectorAll(element);

};