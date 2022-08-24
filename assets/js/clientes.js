// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
function pegaElem(elemento) {
	return document.querySelector(elemento);
}
// ----------------------------------------------------------------------------------------------
// SALVA DADOS LOCAL STORAGE
function salvaDadosLocalStorage(nome, bd) {
	localStorage.setItem(nome, JSON.stringify(bd));
}
// ----------------------------------------------------------------------------------------------
// PEDGA DADOS LOCAL STORAGE
function pegaDadosLocalStorage(bd) {
	var bd = JSON.parse(localStorage.getItem(bd));	
	return bd;
}
// ----------------------------------------------------------------------------------------------
// TRAVA SCROLLBAR
function travaScrollBars() {
    document.documentElement.style.overflowY = 'hidden';
}
// DESTRAVA SCROLLBAR
function destravaScrollBars() {
    document.documentElement.style.overflowY = 'initial';
}

// ----------------------------------------------------------------------------------------------
// MODAL PRODUTOS
function abreModalProduto() {
	travaScrollBars();
	var top = window.scrollY;
	modalProduto.style.top = `${top}px`;
	modalProduto.classList.toggle('ocultar');
	formImputNome.focus();
};
function fechaModalProduto() {
	destravaScrollBars();
	modalProduto.classList.add('ocultar');
	form.reset();
	bntFormSalvar.disabled = false;
	btnFormUpdate.disabled = true;
	btnFormExcluir.disabled = false;
};
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
// ----------------------------------------------------------------------------------------------
// BASE DE DADOS
var bd_usuarios = [
	{
	"id":1,
	"nome":"ERWIN GUILHERME STEIN",
	"email":"erwin.stein@gmail.com",
	"senha":"erwin", 
	"tipo":"ADM",
	}
 ];

export function verificaLocalStorage() {
	var obj = pegaDadosLocalStorage('bd_usuarios');
		
	if (obj === null) {
		salvaDadosLocalStorage("bd_usuarios", bd_usuarios);
	}
}
// ----------------------------------------------------------------------------------------------
// VERIFICA LOCAL STORAGE SE ESTIVER VAZIO ADICIONA UM ITEM
verificaLocalStorage();
populaTabelaUsuarios();					

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
// ----------------------------------------------------------------------------------------------
// FUNCOES GERAIS
var formImputID = pegaElem('[data-formUser="id"]');
var formImputNome = pegaElem('[data-formUser="nome"]');
var formImputEmail = pegaElem('[data-formUser="email"]');
var formImputSenha = pegaElem('[data-formUser="senha"]');
var formImputTipo = pegaElem('[data-formUser="tipo"]');
var form = pegaElem('.form-usuarios');

// ----------------------------------------------------------------------------------------------
// READ
// POPULA TABELA USUARIOS
function populaTabelaUsuarios() {
	verificaLocalStorage();
	var obj = pegaDadosLocalStorage('bd_usuarios');
	var tbody = pegaElem('.tabela__usuarios').querySelector('tbody');
	tbody.innerHTML = "";
	
		obj.forEach(function (index, i) {

				var html = `
				<tr>			
					<td>
						<div class="btn-editar" data-acao="editar" data-index=${i}>
						<i data-acao="editar" class="fa-solid fa-pen-to-square fa-lg"></i>
						</div>											
					</td>
					<td class="colunaID" id='tdId'>${index.id}</td>
					<td id='tdNome'>${index.nome}</td>
					<td id='tdEmail'>${index.email}</td>
					<td id='tdSenha'>${index.senha}</td>
					<td id='tdTipo'>${index.tipo}</td>
				</tr>
				 `;
				 var novaLinha = tbody.insertRow(tbody.rows.length);
				 novaLinha.classList.add('rowHover');
				 novaLinha.innerHTML = html;
	});
}

// ----------------------------------------------------------------------------------------------
// CRUD USUARIOS
// INSERIR DADOS
function inserirDados() {

	var obj = pegaDadosLocalStorage('bd_usuarios');
	var id = Math.round( Math.random()*1e13 );
	
	if (formImputNome.value === "") {
		formImputNome.focus();
		formImputNome.placeholder = "Digite um nome!"
		formImputNome.classList.add('invalid')
		
		setTimeout(function () {
			formImputNome.placeholder = "Nome"
			formImputNome.classList.remove('invalid')
		},800);
	}
	else if (formImputEmail.value === "") 
	{
		formImputEmail.focus();
		formImputEmail.placeholder = "Digite um email!"
		formImputEmail.classList.add('invalid')

		setTimeout(function () {
			formImputEmail.placeholder = "Email"
			formImputEmail.classList.remove('invalid')
		},800);
	}
	else if (formImputSenha.value === "") 
	{
		formImputSenha.focus();
		formImputSenha.placeholder = "Digite uma senha!"
		formImputSenha.classList.add('invalid')

		setTimeout(function () {
			formImputSenha.placeholder = "Senha"
			formImputSenha.classList.remove('invalid')
		},800);
	}
	else
	{		
			var usuario = {
				id    : id,
				nome  : formImputNome.value.toUpperCase(),
				email : formImputEmail.value.toLowerCase(),
				senha : formImputSenha.value.toLowerCase(),
				tipo  : formImputTipo.value
			};

			obj.push(usuario);
			salvaDadosLocalStorage("bd_usuarios", obj);
			form.reset();

			formImputNome.focus();
			fechaModalUsuario();
	}		
}
// ----------------------------------------------------------------------------------------------
// UPDATE
function editarDados(clienteID) {
	var obj = pegaDadosLocalStorage('bd_usuarios');
	var search_term = clienteID;

	for (var i=obj.length-1; i>=0; i--) {
	    if (obj[i].id == search_term) {

	        obj[i] = {
					id    : formImputID.value,
					nome  : formImputNome.value.toUpperCase(),
					email : formImputEmail.value.toLowerCase(),
					senha : formImputSenha.value.toLowerCase(),
					tipo  : formImputTipo.value,
			};
	    }
	}
	salvaDadosLocalStorage("bd_usuarios", obj);
	populaTabelaUsuarios();
	fechaModalUsuario();
}
// ----------------------------------------------------------------------------------------------
// DELETE
function deletarDados(clienteID) {
	var obj = pegaDadosLocalStorage('bd_usuarios');

	var search_term = clienteID;

	for (var i=obj.length-1; i>=0; i--) {
	    if (obj[i].id == search_term) {
	        obj.splice(i, 1);

	    }
	}

	salvaDadosLocalStorage("bd_usuarios", obj);
	populaTabelaUsuarios();

}
// -----------------------------------------------------------------------------------------------	
var bntFormSalvarCliente =  pegaElem('[data-formUser="btn-salvar"]');
var btnFormExcluirCliente = pegaElem('[data-formUser="btn-excluir"]');
var btnFormUpdateCliente =  pegaElem('[data-formUser="btn-update"]');
var bntFormSalvar =  pegaElem('[data-formprodutos="btn-salvar"]');
var btnFormExcluir = pegaElem('[data-formprodutos="btn-excluir"]');
var btnFormUpdate =  pegaElem('[data-formprodutos="btn-update"]');
var btnTableUserEditar = document.querySelectorAll('.btn-tableUser-editar');
var tabelaUsuarios = pegaElem('.tabela__usuarios');
// ----------------------------------------------------------------------------------------------
// CLICK BOTAO FORMULARIO SALVAR
bntFormSalvarCliente.addEventListener('click', function (e) {
		e.preventDefault();
		inserirDados();
		populaTabelaUsuarios();	
})
// ----------------------------------------------------------------------------------------------
// CLICK BOTAO FORMULARIO UPDATE
btnFormUpdateCliente.addEventListener('click', function (e) {
			e.preventDefault();

			var clienteID = this.parentElement.parentElement[0].value;	
			btnFormUpdateCliente.disabled = true;
			bntFormSalvarCliente.disabled = false;
			btnFormExcluirCliente.disabled = false;
			editarDados(clienteID);
			form.reset();
			formImputNome.focus();
			populaTabelaUsuarios();
})
// ----------------------------------------------------------------------------------------------
// CLICK BOTAO FORMULARIO EXCLUIR
btnFormExcluirCliente.addEventListener('click', function () {
	var clienteID = this.parentElement.parentElement[0].value;	

	deletarDados(clienteID);
	form.reset();
	modalUsuario.classList.add('ocultar');
	btnFormUpdateCliente.disabled = true;
	bntFormSalvarCliente.disabled = false;
	btnFormExcluirCliente.disabled = false;
})

// ----------------------------------------------------------------------------------------------
var rowIndexCli = null;
tabelaUsuarios.addEventListener('click', function (e) {
	var btnAlvo = e.target.getAttribute('data-acao');

			if (btnAlvo === 'editar') {

			var tdIdText = 	  e.target.closest('tr').cells[1].innerText;
			var tdNomeText =  e.target.closest('tr').cells[2].innerText;
			var tdEmailText = e.target.closest('tr').cells[3].innerText;
			var tdSenhaText = e.target.closest('tr').cells[4].innerText;
			var tdTipoText =  e.target.closest('tr').cells[5].innerText;

			if (tdIdText == 1) {
			return
			} 
			else
			{
			abreModalUsuario();
			bntFormSalvarCliente.disabled = true;
			btnFormUpdateCliente.disabled = false;
			btnFormExcluirCliente.disabled = false;
			formImputID.value = tdIdText;
			formImputNome.value = tdNomeText;
			formImputEmail.value = tdEmailText;
			formImputSenha.value = tdSenhaText;	
			formImputNome.focus();
			return rowIndexCli = tdIdText;	
			}
			} 
			
})

// ----------------------------------------------------------------------------------------------
// ABRE / FECHA MODAIS
var btnTableUserAdicionar = pegaElem('.btn-tableUser-adicionar');
var modalUsuario = pegaElem('.modal__usuarios');
var modalProduto = pegaElem('.modal__produtos');
var body = pegaElem('.body');


body.addEventListener('click', function (e) {
	if (e.target.classList.contains('modal__usuarios')) {
        fechaModalUsuario();
	}
})
// FECHA MODAL NO ESC
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        fechaModalUsuario();
        fechaModalProduto();
    }
};

// ----------------------------------------------------------------------------------------------
// MODAL USUARIOS
function abreModalUsuario() {
	travaScrollBars();
	var top = window.scrollY;
	modalUsuario.style.top = `${top}px`;
	modalUsuario.classList.toggle('ocultar');
	formImputNome.focus();
};
function fechaModalUsuario() {// ----------------------------------------------------------------------------------------------
	destravaScrollBars();
	modalUsuario.classList.add('ocultar');
	form.reset();
	bntFormSalvarCliente.disabled = false;
	btnFormUpdateCliente.disabled = true;
	btnFormExcluirCliente.disabled = false;
};
// ----------------------------------------------------------------------------------------------
btnTableUserAdicionar.addEventListener('click', function () {
	abreModalUsuario();
	bntFormSalvarCliente.disabled = false;
	btnFormUpdateCliente.disabled = true;
	btnFormExcluirCliente.disabled = true;

});
// ----------------------------------------------------------------------------------------------





