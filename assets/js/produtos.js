import * as fm from './fetch-movies.js'; 
import * as gb from './global.js'; 
import * as cli from './clientes.js'; 



// -----------------------------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------------------------
// POPULA TABELAS DE PRODUTOS
function populaTabelaProdutos(nomeBanco, nomeTabela) {
	var dados = gb.pegaDadosLocalStorage(nomeBanco);
	var tbody = gb.pegaElem(nomeTabela).querySelector('tbody');
	tbody.innerHTML = "";
	dados.forEach(function (index, i) {
		var html = `
						
							<td>
								<div class="btn-editar" data-acao="editar" data-index=${i}>
									<i data-acao="editar" class="fa-solid fa-pen-to-square fa-lg"></i>
								</div>											
							</td>
							<td id='tdId'>${index.id}</td>
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

// <tr class="rowHover">
// </tr>

export function populaTabelaProdutosTodas() {
	populaTabelaProdutos('bd_acao', '.tabela__produtos-acao');
	populaTabelaProdutos('bd_aventura', '.tabela__produtos-aventura');
	populaTabelaProdutos('bd_comedia', '.tabela__produtos-comedia');
	populaTabelaProdutos('bd_drama', '.tabela__produtos-drama');
	populaTabelaProdutos('bd_fantasia', '.tabela__produtos-fantasia');
	populaTabelaProdutos('bd_horror', '.tabela__produtos-horror');
	populaTabelaProdutos('bd_ficcao', '.tabela__produtos-ficcao');
}
populaTabelaProdutosTodas();


// ABRE-FECHA MODAL
var btnTableProdutosAdicionar = document.querySelectorAll('.btn-tableProdutos-adicionar');
var modalProduto = gb.pegaElem('.modal__produtos');

var form = gb.pegaElem('.form-produtos');
var formImputNome = gb.pegaElem('[data-formprodutos="nome"]');
var formImputEmail = gb.pegaElem('[data-formprodutos="email"]');
var formImputSenha = gb.pegaElem('[data-formprodutos="senha"]');
var bntFormSalvar =  gb.pegaElem('[data-formprodutos="btn-salvar"]');
var btnFormExcluir = gb.pegaElem('[data-formprodutos="btn-excluir"]');
var btnFormUpdate =  gb.pegaElem('[data-formprodutos="btn-update"]');

var body = gb.pegaElem('.body');
body.addEventListener('click', function (e) {
	if (e.target.classList.contains('modal__produtos')) {
        fechaModalProduto();
	}
})
// FECHA MODAL NO ESC
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        fechaModalProduto();
        cli.fechaModalUsuario();
    }
};

// MODAL PRODUTOS
export function abreModalProduto() {
	gb.travaScrollBars();
	var top = window.scrollY;
	modalProduto.style.top = `${top}px`;
	modalProduto.classList.toggle('ocultar');
	// formImputTitulo.focus();
};
export function fechaModalProduto() {
	gb.destravaScrollBars();
	modalProduto.classList.add('ocultar');
	form.reset();
	bntFormSalvar.disabled = false;
	btnFormUpdate.disabled = true;
	btnFormExcluir.disabled = true;
};

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

// -----------------------------------------------------------------------------------------------

var formImputId = gb.pegaElem('[data-formProdutos="id"]');
var formImputTitulo = gb.pegaElem('[data-formProdutos="titulo"]');
var formImputNota = gb.pegaElem('[data-formProdutos="nota"]');
var formImputValor = gb.pegaElem('[data-formProdutos="valor"]');
var formImputCategoria = gb.pegaElem('[data-formProdutos="categoria"]');
var formImputPoster = gb.pegaElem('[data-formProdutos="poster"]');
var formImputResumo = gb.pegaElem('[data-formProdutos="resumo"]');

var bntFormSalvarProdutos =  gb.pegaElem('[data-formProdutos="btn-salvar"]');
var bntFormUpdateProdutos =  gb.pegaElem('[data-formProdutos="btn-update"]');
var bntFormExcluirProdutos =  gb.pegaElem('[data-formProdutos="btn-excluir"]');

var tabelaProdutos = document.querySelectorAll('.tb-produtos');


var rowIndexPro;
var srtNomeBanco;
var categoria;


// -----------------------------------------------------------------------------------------------
// INSERIR DADOS
function inserirDadosPro(srtNomeBanco, categoria) {

	var obj = gb.pegaDadosLocalStorage(srtNomeBanco);
	var id = obj.length + 1;
	
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
				valor     : formImputValor.value,
				categoria : categoria,
				resumo    : formImputResumo.value,
				nota      : formImputNota.value,
				poster    : formImputPoster.value,
			};

			obj.push(produto);
			gb.salvaDadosLocalStorage(srtNomeBanco, obj);
			form.reset();

			// formImputTitulo.focus();
			fechaModalProduto();
			populaTabelaProdutosTodas()

	}		
}
// -----------------------------------------------------------------------------------------------
// UPDATE
function editarDadosPro(tituloId, srtNomeBanco) {
	var obj = gb.pegaDadosLocalStorage(srtNomeBanco);
	var search_term = tituloId;

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


	// var index = rowIndexPro - 1;
			
	gb.salvaDadosLocalStorage(srtNomeBanco, obj);
	populaTabelaProdutosTodas();

	fechaModalProduto();

}

// DELETE
function deletarDadosPro(tituloRow, srtNomeBanco) {
	var obj = gb.pegaDadosLocalStorage(srtNomeBanco);
	
	var search_term = tituloRow;

	for (var i=obj.length-1; i>=0; i--) {
	    if (obj[i].titulo === search_term) {
	        obj.splice(i, 1);

	    }
	}

	gb.salvaDadosLocalStorage(srtNomeBanco, obj);
	populaTabelaProdutosTodas();

	fechaModalProduto();
}
// -----------------------------------------------------------------------------------------------
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

// BOTAO EDITAR MODAL PRODUTOS
bntFormUpdateProdutos.addEventListener('click', function (e) {
	var tituloId = this.parentElement.parentElement[0].value;
	// e.preventDefault();
	
	editarDadosPro(tituloId, srtNomeBanco);
	bntFormSalvarProdutos.disabled = false;
	bntFormUpdateProdutos.disabled = true;
	bntFormExcluirProdutos.disabled = false;
})


// BOTAO EXCLUIR MODAL PRODUTOS
bntFormExcluirProdutos.addEventListener('click', function () {	
	var tituloRow = this.parentElement.parentElement[1].value;			
	deletarDadosPro(tituloRow,srtNomeBanco);
	form.reset();
	fechaModalProduto();
	bntFormUpdateProdutos.disabled = true;
	bntFormSalvarProdutos.disabled = false;
	bntFormExcluirProdutos.disabled = false;


})


//---------------------------------------------------------------------------------
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

			// formImputTitulo.focus();
			
		} 	
								
	})
});

