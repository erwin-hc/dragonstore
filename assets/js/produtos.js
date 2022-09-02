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
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

// ----------------------------------------------------------------------------------------------
// COLAPSE TABLE

function collapseTable() {
var coll = document.getElementsByClassName("thead-collapse");
	for (var i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
		var content = this.nextElementSibling;
		var seta = this.querySelector('.icone-seta');
		var header = this.querySelector('.thead-cabeçalho');
		var btn = this.parentElement.querySelector('.btn-expande');
		var footer = this.parentElement.querySelector('tfoot');

		    if (content.style.display === "table-row-group") {
		      content.style.display = "none";
		      footer.style.display = "none";
		      header.style.display = "none";
		      seta.innerHTML = `<i class="fa-solid fa-angles-down"></i>Expandir`;

		    } else {
		      content.style.display = "table-row-group";
		      footer.style.display = "table-row-group";
		      header.style.display = "table-row";
		      seta.innerHTML = `<i class="fa-solid fa-angles-up"></i>Recolher`;
		    }
		});
	}
}
collapseTable();

// ----------------------------------------------------------------------------------------------
// POPULA TABELAS DE PRODUTOS
function populaTabelaProdutos(nomeBanco, nomeTabela) {
	var dados = pegaDadosLocalStorage(nomeBanco);
	if (dados === null || dados.length <= 0)
	{
	dados = [];
	}

	var tbody = pegaElem(nomeTabela).querySelector('tbody');
	tbody.innerHTML = "";
	dados.forEach(function (index, i) {
		var html = `						
							<td>
								<div class="btn-editar" data-acao="editar" data-index=${i}>
									<i data-acao="editar" class="fa-solid fa-pen-to-square fa-lg"></i>
								</div>											
							</td>
							<td class="colunaID" id='tdId'>${index.id}</td>
							<td id='tdTitulo'>${index.titulo}</td>
							<td id='tdValor'>${index.valor}</td>
							<td id='tdCategoria'>${index.categoria}</td>
							<td id='tdNota'>${index.nota}</td>
							<td id='tdPoster'>${index.poster}</td>
							<td id='tdResumo'>${index.resumo}</td>
						
					`;
		 var novaLinha = tbody.insertRow(tbody.rows.length);
		 novaLinha.classList.add('rowHover');
		 novaLinha.innerHTML = html;
	});
	
};


function populaTabelaProdutosTodas() {
	populaTabelaProdutos('bd_acao','.tabela__produtos-acao');
	populaTabelaProdutos('bd_aventura','.tabela__produtos-aventura');
	populaTabelaProdutos('bd_comedia','.tabela__produtos-comedia');
	populaTabelaProdutos('bd_drama','.tabela__produtos-drama');
	populaTabelaProdutos('bd_fantasia','.tabela__produtos-fantasia');
	populaTabelaProdutos('bd_horror','.tabela__produtos-horror');
	populaTabelaProdutos('bd_ficcao','.tabela__produtos-ficcao');
}

var bdAcaco = pegaDadosLocalStorage('bd_acao');

if (bdAcaco !== null)
{
	populaTabelaProdutosTodas();
}
else
{
	setTimeout(function () { populaTabelaProdutos('bd_acao','.tabela__produtos-acao');}, 500);
	setTimeout(function () { populaTabelaProdutos('bd_aventura','.tabela__produtos-aventura'); }, 1500);
	setTimeout(function () { populaTabelaProdutos('bd_comedia','.tabela__produtos-comedia'); }, 2500);
	setTimeout(function () { populaTabelaProdutos('bd_drama','.tabela__produtos-drama'); }, 3500);
	setTimeout(function () { populaTabelaProdutos('bd_fantasia','.tabela__produtos-fantasia'); }, 4500);
	setTimeout(function () { populaTabelaProdutos('bd_horror','.tabela__produtos-horror'); }, 5500);
	setTimeout(function () { populaTabelaProdutos('bd_ficcao','.tabela__produtos-ficcao'); }, 6500);
}


// ----------------------------------------------------------------------------------------------
// ABRE-FECHA MODAL
var btnTableProdutosAdicionar = document.querySelectorAll('.btn-tableProdutos-adicionar');
var modalProduto = pegaElem('.modal__produtos');
var modalUsuario = pegaElem('.modal__usuarios');

var form = pegaElem('.form-produtos');
var formImputNome = pegaElem('[data-formprodutos="nome"]');
var formImputEmail = pegaElem('[data-formprodutos="email"]');
var formImputSenha = pegaElem('[data-formprodutos="senha"]');

var bntFormSalvarCliente =  pegaElem('[data-formUser="btn-salvar"]');
var btnFormExcluirCliente = pegaElem('[data-formUser="btn-excluir"]');
var btnFormUpdateCliente =  pegaElem('[data-formUser="btn-update"]');
var bntFormSalvar =  pegaElem('[data-formprodutos="btn-salvar"]');
var btnFormExcluir = pegaElem('[data-formprodutos="btn-excluir"]');
var btnFormUpdate =  pegaElem('[data-formprodutos="btn-update"]');

var body = pegaElem('.body');
body.addEventListener('click', function (e) {
	if (e.target.classList.contains('modal__produtos')) {
        fechaModalProduto();
	}
})
// ----------------------------------------------------------------------------------------------
// FECHA MODAL NO ESC
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        fechaModalProduto();
        fechaModalUsuario();
    }
};
// ----------------------------------------------------------------------------------------------
// MODAL PRODUTOS
function abreModalProduto() {
	travaScrollBars();
	var top = window.scrollY;
	modalProduto.style.top = `${top}px`;
	modalProduto.classList.toggle('ocultar');
};
function fechaModalProduto() {
	destravaScrollBars();
	modalProduto.classList.add('ocultar');
	form.reset();
	bntFormSalvar.disabled = false;
	btnFormUpdate.disabled = true;
	btnFormExcluir.disabled = true;
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
function fechaModalUsuario() {
	destravaScrollBars();
	modalUsuario.classList.add('ocultar');
	form.reset();
	bntFormSalvarCliente.disabled = false;
	btnFormUpdateCliente.disabled = true;
	btnFormExcluirCliente.disabled = false;
};
// ----------------------------------------------------------------------------------------------

btnTableProdutosAdicionar.forEach(function (btn) {
	btn.addEventListener('click', function (e) {
		abreModalProduto();
		bntFormSalvar.disabled = false;
		btnFormUpdate.disabled = true;
		btnFormExcluir.disabled = true;
				var tabelaGenero = e.target.getAttribute('data-genero');
				bntFormSalvarProdutos.setAttribute('data-genero',tabelaGenero);
				bntFormUpdateProdutos.setAttribute('data-genero',tabelaGenero);
				bntFormExcluirProdutos.setAttribute('data-genero',tabelaGenero);
	});
});

// ----------------------------------------------------------------------------------------------
var formImputId = pegaElem('[data-formProdutos="id"]');
var formImputTitulo = pegaElem('[data-formProdutos="titulo"]');
var formImputNota = pegaElem('[data-formProdutos="nota"]');
var formImputValor = pegaElem('[data-formProdutos="valor"]');
var formImputCategoria = pegaElem('[data-formProdutos="categoria"]');
var formImputPoster = pegaElem('[data-formProdutos="poster"]');
var formImputResumo = pegaElem('[data-formProdutos="resumo"]');

var bntFormSalvarProdutos =  pegaElem('[data-formProdutos="btn-salvar"]');
var bntFormUpdateProdutos =  pegaElem('[data-formProdutos="btn-update"]');
var bntFormExcluirProdutos =  pegaElem('[data-formProdutos="btn-excluir"]');

var tabelaProdutos = document.querySelectorAll('.tb-produtos');

var srtNomeBanco;
var categoria;


// ----------------------------------------------------------------------------------------------
// INSERIR DADOS
function inserirDadosPro(srtNomeBanco, categoria) {

	var obj = pegaDadosLocalStorage(srtNomeBanco);
	var id = Math.round( Math.random()*1e13 );
	
	if (formImputTitulo.value === "") {
		formImputTitulo.focus();
		formImputTitulo.placeholder = "Digite um titulo!";
		formImputTitulo.classList.add('invalid');
		
		setTimeout(function () {
			formImputTitulo.placeholder = "Titulo";
			formImputTitulo.classList.remove('invalid')
		},800);
	}
	else if (formImputNota.value === "" || isNaN(formImputNota.value)) 
	{
		formImputNota.focus();
		formImputNota.value = "";
		formImputNota.placeholder = "Somente Números! Use ponto!";
		formImputNota.classList.add('invalid');

		setTimeout(function () {
			formImputNota.placeholder = "Nota";
			formImputNota.classList.remove('invalid')
		},800);
	}
	else if (formImputValor.value === "" || isNaN(formImputValor.value)) 
	{
		formImputValor.focus();
		formImputValor.value = "";
		formImputValor.placeholder = "Somente Números! Use ponto!";
		formImputValor.classList.add('invalid');

		setTimeout(function () {
			formImputValor.placeholder = "Valor";
			formImputValor.classList.remove('invalid')
		},800);
	}
	else if (formImputPoster.value === "") 
	{
		formImputPoster.focus();
		formImputPoster.value = "";
		formImputPoster.placeholder = "Digite uma URL válida!";
		formImputPoster.classList.add('invalid');

		setTimeout(function () {
			formImputPoster.placeholder = "URL-Poster";
			formImputPoster.classList.remove('invalid')
		},800);
	}	
	else if (formImputResumo.value === "") 
	{
		formImputResumo.focus();
		formImputResumo.placeholder = "Digite um resumo!";
		formImputResumo.classList.add('invalid');

		setTimeout(function () {
			formImputResumo.placeholder = "Resumo";
			formImputResumo.classList.remove('invalid')
		},800);
	}
	else
	{		

			var produto = {
				id        : id,
				titulo    : formImputTitulo.value,
				valor     : parseFloat(formImputValor.value).toFixed(2).replace(".", ","),
				categoria : categoria,
				resumo    : formImputResumo.value,
				nota      : formImputNota.value,
				poster    : formImputPoster.value,
			};

			obj.push(produto);
			salvaDadosLocalStorage(srtNomeBanco, obj);
			form.reset();

			// formImputTitulo.focus();
			fechaModalProduto();
			populaTabelaProdutosTodas()

	}		
}
// ----------------------------------------------------------------------------------------------
// UPDATE
function editarDadosPro(produtoID, srtNomeBanco) {
	var obj = pegaDadosLocalStorage(srtNomeBanco);
	var search_term = produtoID;

	for (var i=obj.length-1; i>=0; i--) {
	    if (obj[i].id == search_term) {

	        obj[i] = {
				id        : formImputId.value,
				titulo    : formImputTitulo.value,
				valor     : formImputValor.value,
				categoria : obj[i].categoria,
				resumo    : formImputResumo.value,
				nota      : formImputNota.value,
				poster    : formImputPoster.value,
			};
	    }
	}

			
	salvaDadosLocalStorage(srtNomeBanco, obj);
	populaTabelaProdutosTodas();

	fechaModalProduto();

}
// ----------------------------------------------------------------------------------------------
// DELETE
function deletarDadosPro(produtoID, srtNomeBanco) {
	var obj = pegaDadosLocalStorage(srtNomeBanco);
	
	var search_term = produtoID;

	for (var i=obj.length-1; i>=0; i--) {
	    if (obj[i].id == search_term) {
	        obj.splice(i, 1);
	    }
	}

	salvaDadosLocalStorage(srtNomeBanco, obj);
	populaTabelaProdutosTodas();

	fechaModalProduto();
}
// ----------------------------------------------------------------------------------------------
// BOTAO SALVAR FORM PRODUTOS

bntFormSalvarProdutos.addEventListener('click', function (e) {

var attrGenero = this.getAttribute('data-genero');
switch(attrGenero) {
case 'acao':
srtNomeBanco = 'bd_acao';
categoria = 'Ação';
break;
case 'aventura':
srtNomeBanco = 'bd_aventura';
categoria = 'Aventura';
break;
case 'comedia':
srtNomeBanco = 'bd_comedia';
categoria = 'Comédia';
break;
case 'drama':
srtNomeBanco = 'bd_drama';
categoria = 'Drama';
break;
case 'fantasia':
srtNomeBanco = 'bd_fantasia';
categoria = 'Fantasia';
break;
case 'horror':
srtNomeBanco = 'bd_horror';
categoria = 'Horror';
break;
case 'ficcao':
srtNomeBanco = 'bd_ficcao';
categoria = 'Ficção';
break;
default:
}	
	inserirDadosPro(srtNomeBanco, categoria);
})

// ----------------------------------------------------------------------------------------------
// BOTAO EDITAR MODAL PRODUTOS
bntFormUpdateProdutos.addEventListener('click', function (e) {
	var produtoID = this.parentElement.parentElement[0].value;
	e.preventDefault();
	
	editarDadosPro(produtoID, srtNomeBanco);
	bntFormSalvarProdutos.disabled = false;
	bntFormUpdateProdutos.disabled = true;
	bntFormExcluirProdutos.disabled = false;
})

// ----------------------------------------------------------------------------------------------
// BOTAO EXCLUIR MODAL PRODUTOS
bntFormExcluirProdutos.addEventListener('click', function () {	
	var produtoID = this.parentElement.parentElement[0].value;			
	deletarDadosPro(produtoID,srtNomeBanco);
	form.reset();
	fechaModalProduto();
	bntFormUpdateProdutos.disabled = true;
	bntFormSalvarProdutos.disabled = false;
	bntFormExcluirProdutos.disabled = false;


})


// ----------------------------------------------------------------------------------------------
tabelaProdutos.forEach(function (tabela) {
	tabela.addEventListener('click', function (e) {
	var btnAlvo = e.target.getAttribute('data-acao');	
	var attrGenero = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.btn-tableProdutos-adicionar').getAttribute('data-genero');
	
		if (btnAlvo === 'editar') {

			switch(attrGenero) {
			case 'acao':
			srtNomeBanco = 'bd_acao';
			categoria = 'Ação';
			break;
			case 'aventura':
			srtNomeBanco = 'bd_aventura';
			categoria = 'Aventura';
			break;
			case 'comedia':
			srtNomeBanco = 'bd_comedia';
			categoria = 'Comédia';
			break;
			case 'drama':
			srtNomeBanco = 'bd_drama';
			categoria = 'Drama';
			break;
			case 'fantasia':
			srtNomeBanco = 'bd_fantasia';
			categoria = 'Fantasia';
			break;
			case 'horror':
			srtNomeBanco = 'bd_horror';
			categoria = 'Horror';
			break;
			case 'ficcao':
			srtNomeBanco = 'bd_ficcao';
			categoria = 'Ficção';
			break;
			default:	
			}				

			var tdIdText =    e.target.closest('tr').cells[1].innerText;
			var tdTitulo = 	  e.target.closest('tr').cells[2].innerText;
			var tdValor =     e.target.closest('tr').cells[3].innerText;
			var tdNota =      e.target.closest('tr').cells[5].innerText;
			var tdPoster =    e.target.closest('tr').cells[6].innerText;
			var tdResumo =    e.target.closest('tr').cells[7].innerText;

			abreModalProduto();

			bntFormSalvarProdutos.disabled = true;
			bntFormUpdateProdutos.disabled = false;
			bntFormExcluirProdutos.disabled = false;

			formImputId.value = tdIdText;
			formImputTitulo.value = tdTitulo;
			formImputValor.value = tdValor;
			formImputNota.value = tdNota;
			formImputPoster.value = tdPoster;
			formImputResumo.value = tdResumo;
			
		} 	
								
	})
});

// ----------------------------------------------------------------------------------------------
// BOTAO RESET BANCO DADOS
var btnPainelLimpar = pegaElem('.btn-painel-limpar');
var btnPainelSair = pegaElem('.btn-painel-sair');

btnPainelLimpar.onclick = resetaBase;
btnPainelSair.onclick = resetUser;

function resetaBase() {
	console.log('clicado')
	window.localStorage.clear();
	// window.location.reload(true);
	window.location.href = 'index.html';

}

var nomeUsuario = pegaElem('.nomeUsuario');
setUser();

function setUser() {
	var user = localStorage.getItem('userName');
	nomeUsuario.innerText = user;
}

function resetUser() {	
	localStorage.setItem('userId', "");
	localStorage.setItem('userName', "Faça-Login!");
	localStorage.setItem('userEmail', "");
	localStorage.setItem('isLogaded', false);
	localStorage.setItem('isADM', false);
}