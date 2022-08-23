import * as gb from './global.js'; 


var iconeHamburguer = gb.pegaElem('.icone-hamburguer');
var navLateral = gb.pegaElem('.nav__lateral--inicio');
iconeHamburguer.onclick = abreNavLateral;
var iconeXis = gb.pegaElem('.icone-xis');
iconeXis.onclick = fechaNavLateral;
var body = gb.pegaElem('.body');


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

// POPULA CARDS DE PRODUTOS

function populaCardsProdutos(nomeBanco, cardContainer) {
	var dados = gb.pegaDadosLocalStorage(nomeBanco);
	var container = gb.pegaElem(cardContainer);

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
		// setTimeout(function () { populaCardsProdutos('bd_acao','.cards-wrapper--acao'); }, 500);
		// setTimeout(function () { populaCardsProdutos('bd_aventura','.cards-wrapper--aventura'); }, 600);
		// setTimeout(function () { populaCardsProdutos('bd_comedia','.cards-wrapper--comedia'); }, 1000);
		// setTimeout(function () { populaCardsProdutos('bd_drama','.cards-wrapper--drama'); }, 1400);
		// setTimeout(function () { populaCardsProdutos('bd_fantasia','.cards-wrapper--fantasia'); }, 1800);
		// setTimeout(function () { populaCardsProdutos('bd_horror','.cards-wrapper--horror'); }, 2200);
		// setTimeout(function () { populaCardsProdutos('bd_ficcao','.cards-wrapper--ficcao'); }, 2400);
}

var bdAcaco = gb.pegaDadosLocalStorage('bd_acao');
	// console.log(bdAcaco)

populaCardsProdutosTodas();

if (bdAcaco !== null)
{
	populaCardsProdutosTodas();
}
else
{
	window.onload = function() {
		setTimeout(function () { populaCardsProdutos('bd_acao','.cards-wrapper--acao'); }, 500);
		setTimeout(function () { populaCardsProdutos('bd_aventura','.cards-wrapper--aventura'); }, 600);
		setTimeout(function () { populaCardsProdutos('bd_comedia','.cards-wrapper--comedia'); }, 1000);
		setTimeout(function () { populaCardsProdutos('bd_drama','.cards-wrapper--drama'); }, 1400);
		setTimeout(function () { populaCardsProdutos('bd_fantasia','.cards-wrapper--fantasia'); }, 1800);
		setTimeout(function () { populaCardsProdutos('bd_horror','.cards-wrapper--horror'); }, 2200);
		setTimeout(function () { populaCardsProdutos('bd_ficcao','.cards-wrapper--ficcao'); }, 2400);
	}
}
