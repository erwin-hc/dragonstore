// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
function salvaDadosLocalStorage(nome, bd) {
	localStorage.setItem(nome, JSON.stringify(bd));
}
// PEDGA DADOS LOCAL STORAGE
function pegaDadosLocalStorage(bd) {
	var bd = JSON.parse(localStorage.getItem(bd));	
	return bd;
}
function pegaElem(elemento) {
	return document.querySelector(elemento);
}
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

var url = './assets/js/base-dados.js';
function defineBaseDados(srtNomeBanco,srtCategoria) {
	
	fetch(url)
	.then(function (resposta) {
		return resposta.json();	
	})
	.then(function (data) {
		var obj = pegaDadosLocalStorage(srtNomeBanco);
		if (obj === null || obj.length <= 0) {
		obj = [];
		
			for (var i = 0; i < data.length; i++) {
						if (data[i].categoria == srtCategoria) {
							// console.log(data[i])
							obj.push( 
								{
								'id'            : data[i].id,
								'titulo'		: data[i].titulo,
								'valor'		    : data[i].valor,
								'categoria'		: data[i].categoria,
								'resumo'		: data[i].resumo,
								'nota'		    : data[i].nota,
								'poster'		: data[i].poster,
								'background'	: data[i].background,
								}
							);
							salvaDadosLocalStorage(srtNomeBanco, obj)
						}			
		    };
	};
});
};

defineBaseDados('bd_acao','Ação');
defineBaseDados('bd_aventura','Aventura');
defineBaseDados('bd_comedia','Comédia');
defineBaseDados('bd_drama','Drama');
defineBaseDados('bd_fantasia','Fantasia');
defineBaseDados('bd_horror','Horror');
defineBaseDados('bd_ficcao','Ficção');


setTimeout(function () { 
	var bdTodos = [
	...pegaDadosLocalStorage('bd_acao'),
	...pegaDadosLocalStorage('bd_aventura'),
	...pegaDadosLocalStorage('bd_comedia'),
	...pegaDadosLocalStorage('bd_drama'),
	...pegaDadosLocalStorage('bd_fantasia'),
	...pegaDadosLocalStorage('bd_horror'),
	...pegaDadosLocalStorage('bd_ficcao')
	]
salvaDadosLocalStorage('bd_todos', bdTodos);

}, 500);

// POPULA CARDS DE PRODUTOS

function populaCardsProdutos(nomeBanco, cardContainer) {
	var dados = pegaDadosLocalStorage(nomeBanco);
	if (dados === null || dados.length <= 0)
	{
	dados = [];
	}

	var container = pegaElem(cardContainer);

	container.innerHTML = "";
	dados.forEach(function (index, i) {

	var html = `<div class="card-container">						

						<div class="card">

								<div class="svg-bluray-container">
								<img class="svg-bluray" src="assets/img/bluray.svg">
								</div>

								<div class="card-img">
								<img src="${index.poster}">
								</div>

								<div class="card-valor">
								<p>R$ ${index.valor}</p>
								</div>

						</div>	

						<div class="card-btns-wrapper">	
						<button class="btncard btn-detalhes"><i class="fa-solid fa-eye fa-xl"></i></button>
						<button class="btncard btn-cart"><i class="fa-solid fa-cart-shopping fa-xl"></i></button>
						</div>
			</div>				
	`;
					container.innerHTML += html;

	});

};


function populaCardsProdutosTodas() {
	populaCardsProdutos('bd_acao','.cards-wrapper--acao');
	populaCardsProdutos('bd_aventura','.cards-wrapper--aventura');
	populaCardsProdutos('bd_comedia','.cards-wrapper--comedia');
	populaCardsProdutos('bd_drama','.cards-wrapper--drama');
	populaCardsProdutos('bd_fantasia','.cards-wrapper--fantasia');
	populaCardsProdutos('bd_horror','.cards-wrapper--horror');
	populaCardsProdutos('bd_ficcao','.cards-wrapper--ficcao');
}


var bdAcaco = pegaDadosLocalStorage('bd_acao');

if (bdAcaco !== null)
{
	populaCardsProdutosTodas();
}
else
{
	setTimeout(function () { populaCardsProdutos('bd_acao','.cards-wrapper--acao'); }, 500);
	setTimeout(function () { populaCardsProdutos('bd_aventura','.cards-wrapper--aventura'); }, 1500);
	setTimeout(function () { populaCardsProdutos('bd_comedia','.cards-wrapper--comedia'); }, 2500);
	setTimeout(function () { populaCardsProdutos('bd_drama','.cards-wrapper--drama'); }, 3500);
	setTimeout(function () { populaCardsProdutos('bd_fantasia','.cards-wrapper--fantasia'); }, 4500);
	setTimeout(function () { populaCardsProdutos('bd_horror','.cards-wrapper--horror'); }, 5500);
	setTimeout(function () { populaCardsProdutos('bd_ficcao','.cards-wrapper--ficcao'); }, 6500);
}


// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

var iconeHamburguer = pegaElem('.icone-hamburguer');
var navLateral = pegaElem('.nav__lateral--inicio');
iconeHamburguer.onclick = abreNavLateral;
var iconeXis = pegaElem('.icone-xis');
iconeXis.onclick = fechaNavLateral;
var body = pegaElem('.body');


// ABRE NAV LATERAL
function abreNavLateral() {
	// window.scrollTo(0, 0);
	var top = window.scrollY;
navLateral.style.top = `calc(${top}px + 10px)`;
	// gb.travaScrollBars();
	navLateral.classList.remove('remove-nav-lateral');

}
function fechaNavLateral() {
	// window.scrollTo(0, 0);
	// gb.destravaScrollBars();
	navLateral.classList.add('remove-nav-lateral');
}

// var top = window.scrollY;
// navLateral.style.top = `${top}px`;

document.addEventListener('scroll', function (e) {
	 fechaNavLateral();	
})


body.addEventListener('click', function (e) {
	if (!e.target.parentElement.classList.contains('helper')) {
	 fechaNavLateral();
	}
})

// FECHA MODAL NO ESC
	document.onkeydown = function(e) {
	    e = e || window.event;
	    if (e.keyCode == 27) {
	    	fechaNavLateral();
	    }
	};

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
var btnPainel = document.querySelectorAll('.btn-painel');
var spanNomeUsuario = document.querySelectorAll('.spanNomeUsuario');

var usuario = 'Faça Login!';

function criaSessaoUsuario() {	
	sessionStorage.setItem('sessionUsuario', JSON.stringify(usuario));
	sessionStorage.setItem('isLogaded', true);
}
window.onload = criaSessaoUsuario();

if (sessionStorage.getItem('isLogaded') == 'false') {
	spanNomeUsuario.forEach(function (span) {
		span.innerText = usuario;
	}) 
	btnPainel.forEach(function (btn) {
		btn.classList.add('ocultar');
	})
}

if (sessionStorage.getItem('isLogaded') == 'true') {
	spanNomeUsuario.forEach(function (span) {
		span.innerText = 'Erwin!';
	}) 
	btnPainel.forEach(function (btn) {
		btn.classList.remove('ocultar');
	})
}