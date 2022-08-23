import * as gb from './global.js'; 
import * as pro from './produtos.js'; 

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
	var obj = gb.pegaDadosLocalStorage('bd_usuarios');
		
	if (obj === null) {
		gb.salvaDadosLocalStorage("bd_usuarios", bd_usuarios);
	}
}

// VERIFICA LOCAL STORAGE SE ESTIVER VAZIO ADICIONA UM ITEM
verificaLocalStorage();
populaTabelaUsuarios();					


// ---------------------------------------------------
// ---------------------------------------------------
// ---------------------------------------------------
// FUNCOES GERAIS
var formImputNome = gb.pegaElem('[data-formUser="nome"]');
var formImputEmail = gb.pegaElem('[data-formUser="email"]');
var formImputSenha = gb.pegaElem('[data-formUser="senha"]');
var formImputTipo = gb.pegaElem('[data-formUser="tipo"]');
var form = gb.pegaElem('.form-usuarios');


// READ
// POPULA TABELA USUARIOS
function populaTabelaUsuarios() {
	verificaLocalStorage();
	var obj = gb.pegaDadosLocalStorage('bd_usuarios');
	var tbody = gb.pegaElem('.tabela__usuarios').querySelector('tbody');
	tbody.innerHTML = "";
	
		obj.forEach(function (index, i) {

				var html = `
				<tr>			
					<td>
						<div class="btn-editar" data-acao="editar" data-index=${i}>
						<i data-acao="editar" class="fa-solid fa-pen-to-square fa-lg"></i>
						</div>											
					</td>
					<td id='tdId'>${index.id}</td>
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

		// tbody.innerHTML += html;

}

// -----------------------------------------------------------------------------------------------
// CRUD USUARIOS
// INSERIR DADOS
function inserirDados() {

	var obj = gb.pegaDadosLocalStorage('bd_usuarios');
	var id = obj.length + 1;
	
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
			gb.salvaDadosLocalStorage("bd_usuarios", obj);
			form.reset();

			formImputNome.focus();
			fechaModalUsuario();
	}		
}
// UPDATE
function editarDados(rowIndexCli) {
	var obj = gb.pegaDadosLocalStorage('bd_usuarios');
	var index = rowIndexCli - 1;

	obj[index] = {
		id    : obj[index].id,
		nome  : formImputNome.value.toUpperCase(),
		email : formImputEmail.value.toLowerCase(),
		senha : formImputSenha.value.toLowerCase(),
		tipo  : formImputTipo.value,
	};

	gb.salvaDadosLocalStorage("bd_usuarios", obj);
	populaTabelaUsuarios();
	fechaModalUsuario();
}

// DELETE
function deletarDados(rowIndexCli) {
	var obj = gb.pegaDadosLocalStorage('bd_usuarios');

	var index = rowIndexCli - 1;

	obj.splice([index]);

	gb.salvaDadosLocalStorage("bd_usuarios", obj);
	populaTabelaUsuarios();

}
// -----------------------------------------------------------------------------------------------
	
var bntFormSalvarCliente =  gb.pegaElem('[data-formUser="btn-salvar"]');
var btnFormExcluirCliente = gb.pegaElem('[data-formUser="btn-excluir"]');
var btnFormUpdateCliente =  gb.pegaElem('[data-formUser="btn-update"]');
var btnTableUserEditar = document.querySelectorAll('.btn-tableUser-editar');
var tabelaUsuarios = gb.pegaElem('.tabela__usuarios');

// CLICK BOTAO FORMULARIO SALVAR
bntFormSalvarCliente.addEventListener('click', function (e) {
		e.preventDefault();
		inserirDados();
		populaTabelaUsuarios();	
})

// CLICK BOTAO FORMULARIO UPDATE
btnFormUpdateCliente.addEventListener('click', function (e) {
			e.preventDefault();
			btnFormUpdateCliente.disabled = true;
			bntFormSalvarCliente.disabled = false;
			btnFormExcluirCliente.disabled = false;
			editarDados(rowIndexCli);
			form.reset();
			formImputNome.focus();
			populaTabelaUsuarios();
})
// CLICK BOTAO FORMULARIO EXCLUIR
btnFormExcluirCliente.addEventListener('click', function () {
	deletarDados(rowIndexCli);
	form.reset();
	modalUsuario.classList.add('ocultar');
	btnFormUpdateCliente.disabled = true;
	bntFormSalvarCliente.disabled = false;
	btnFormExcluirCliente.disabled = false;
})

//---------------------------------------------------------------------------------
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
			formImputNome.value = tdNomeText;
			formImputEmail.value = tdEmailText;
			formImputSenha.value = tdSenhaText;	
			formImputNome.focus();
			return rowIndexCli = tdIdText;	
			}
			} 
			
})

// ABRE / FECHA MODAIS
var btnTableUserAdicionar = gb.pegaElem('.btn-tableUser-adicionar');
var modalUsuario = gb.pegaElem('.modal__usuarios');
var body = gb.pegaElem('.body');


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
        pro.fechaModalProduto();
    }
};

// MODAL USUARIOS
export function abreModalUsuario() {
	gb.travaScrollBars();
	var top = window.scrollY;
	modalUsuario.style.top = `${top}px`;
	modalUsuario.classList.toggle('ocultar');
	formImputNome.focus();
};
export function fechaModalUsuario() {
	gb.destravaScrollBars();
	modalUsuario.classList.add('ocultar');
	form.reset();
	bntFormSalvarCliente.disabled = false;
	btnFormUpdateCliente.disabled = true;
	btnFormExcluirCliente.disabled = false;
};
btnTableUserAdicionar.addEventListener('click', function () {
	abreModalUsuario();
	bntFormSalvarCliente.disabled = false;
	btnFormUpdateCliente.disabled = true;
	btnFormExcluirCliente.disabled = true;

});
