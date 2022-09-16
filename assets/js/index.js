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
// ----------------------------------------------------------------------------------------------
// // TRAVA SCROLLBAR
// function travaScrollBars() {
//     document.documentElement.style.overflowY = 'hidden';
// }
// // DESTRAVA SCROLLBAR
// function destravaScrollBars() {
//     document.documentElement.style.overflowY = 'initial';
// }
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
// ----------------------------------------------------------------------------------------------
// BASE DE DADOS
var bd_usuarios = [
	{
	"id":1,
	"nome":"Administrador",
	"email":"adm@adm.com",
	"senha":"adm", 
	"tipo":"adm",
	}
 ];

function verificaLocalStorage() {
	var obj = pegaDadosLocalStorage('bd_usuarios');
		
	if (obj === null) {
		salvaDadosLocalStorage("bd_usuarios", bd_usuarios);
	}
}
// ----------------------------------------------------------------------------------------------
// VERIFICA LOCAL STORAGE SE ESTIVER VAZIO ADICIONA UM ITEM
verificaLocalStorage();



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

		if (srtNomeBanco === 'bd_destaques') {
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
									'slide'         : data[i].slide,
									}
								);
								salvaDadosLocalStorage(srtNomeBanco, obj)
							}			
					};

		} else {
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
		}
		
	};
});
};



function defineBaseDadosTudo() {
		defineBaseDados('bd_acao','Ação');
		defineBaseDados('bd_aventura','Aventura');
		defineBaseDados('bd_comedia','Comédia');
		defineBaseDados('bd_drama','Drama');
		defineBaseDados('bd_fantasia','Fantasia');
		defineBaseDados('bd_horror','Horror');
		defineBaseDados('bd_ficcao','Ficção');
		defineBaseDados('bd_destaques','Destaques');
 } 
defineBaseDadosTudo();

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

	dados.forEach(function (index) {

				var Ptitulo = index.titulo;
				var Pid = index.id;
				var Pcategoria = index.categoria;
				var SRCcardIMG = index.poster;
				var Pvalor = index.valor;

				criaCard(Ptitulo,Pid,Pcategoria,SRCcardIMG,Pvalor,cardContainer);

	});

};

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

function criaCard(Ptitulo,Pid,Pcategoria,SRCcardIMG,Pvalor,elementoWrapper) {

var wrapper = pegaElem(elementoWrapper);

var divContainer = document.createElement('div');
divContainer.setAttribute("class","card-container");

            var divCard = document.createElement("div");
            divCard.setAttribute("class","card");
            divContainer.appendChild(divCard);

						var divOcultar = document.createElement("div");
						divOcultar.setAttribute("class","ocultar");
							var divOcultarP1 = document.createElement('p');
							var divOcultarP2 = document.createElement('p');
							var divOcultarP3 = document.createElement('p');
							divOcultarP1.setAttribute("class","conteudo-titulo");
							divOcultarP2.setAttribute("class","conteudo-id");
							divOcultarP3.setAttribute("class","conteudo-categoria");
							divOcultarP1.textContent=`${Ptitulo}`;
							divOcultarP2.textContent=`${Pid}`;
							divOcultarP3.textContent=`${Pcategoria}`;
							divOcultar.appendChild(divOcultarP1);
							divOcultar.appendChild(divOcultarP2);
							divOcultar.appendChild(divOcultarP3);
						divCard.appendChild(divOcultar);

						var divIconeBluray = document.createElement('div');
						divIconeBluray.setAttribute("class", "svg-bluray-container");
							var divIconeBlurayIMG = document.createElement('img');
							divIconeBlurayIMG.setAttribute("class","svg-bluray");
							divIconeBlurayIMG.src = 'assets/img/bluray.svg';
							divIconeBluray.appendChild(divIconeBlurayIMG);	
						divCard.appendChild(divIconeBluray);

						var divImg = document.createElement('div');
						divImg.setAttribute("class","card-img");
							var divImgIMG = document.createElement('img');
							divImgIMG.setAttribute("class","conteudo-img");
							divImgIMG.src = SRCcardIMG;
							divImg.appendChild(divImgIMG);
						divCard.appendChild(divImg);

						var divValor = document.createElement('div');
						divValor.setAttribute("class", "card-valor");
							var divValorP = document.createElement('p');
							divValorP.setAttribute("class","conteudo-valor");
							divValorP.textContent=`${Pvalor}`;
							divValor.appendChild(divValorP);
						divCard.appendChild(divValor);


			var divBotoes = document.createElement('div');
			divBotoes.setAttribute("class","card-btns-wrapper");
					var divBotoesBTN1 = document.createElement('button');
					var divBotoesBTN2 = document.createElement('button');
					divBotoesBTN1.setAttribute("class","btncard btn-detalhes");
					divBotoesBTN2.setAttribute("class","btncard btn-cart");
					divBotoesBTN1.innerHTML = '<i class="fa-solid fa-eye fa-xl"></i>';
					divBotoesBTN2.innerHTML = '<i class="fa-solid fa-cart-shopping fa-xl"></i>';
					divBotoes.appendChild(divBotoesBTN1);
					divBotoes.appendChild(divBotoesBTN2);
			divContainer.appendChild(divBotoes);
            
    
wrapper.appendChild(divContainer);

};
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

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
var timePlus = 100;

if (bdAcaco !== null)
{
	populaCardsProdutosTodas();
}
else
{
	setTimeout(function () { populaCardsProdutos('bd_acao','.cards-wrapper--acao'); }, 500);
	setTimeout(function () { populaCardsProdutos('bd_aventura','.cards-wrapper--aventura'); }, 600 + timePlus);
	setTimeout(function () { populaCardsProdutos('bd_comedia','.cards-wrapper--comedia'); }, 700 + timePlus);
	setTimeout(function () { populaCardsProdutos('bd_drama','.cards-wrapper--drama'); }, 800 + timePlus);
	setTimeout(function () { populaCardsProdutos('bd_fantasia','.cards-wrapper--fantasia'); }, 900 + timePlus);
	setTimeout(function () { populaCardsProdutos('bd_horror','.cards-wrapper--horror'); }, 1000 + timePlus);
	setTimeout(function () { populaCardsProdutos('bd_ficcao','.cards-wrapper--ficcao'); }, 1100 + timePlus);
}


// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

var iconeHamburguer = pegaElem('.icone-hamburguer');
var navLateral = pegaElem('.nav__lateral--inicio');
iconeHamburguer.onclick = abreNavLateral;
var iconeXis = pegaElem('.nav__lateral--icons');
iconeXis.onclick = fechaNavLateral;



// ABRE NAV LATERAL
function abreNavLateral() {
	var top = window.scrollY;
	navLateral.style.top = `calc(${top}px + 15px)`;
	navLateral.classList.remove('remove-nav-lateral');

}
function fechaNavLateral() {
	navLateral.classList.add('remove-nav-lateral');
}

document.addEventListener('scroll', function (e) {
	 fechaNavLateral();	
})

var body = pegaElem('.body');
body.addEventListener('click', function (e) {
	if (!e.target.parentElement.classList.contains('helper')) {
	 fechaNavLateral();
	}
})

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
var btnLoginNav = document.querySelectorAll('.btn-login-nav');
var modalLogin = pegaElem('.modal--login--container');
var btnLoginEntrar = pegaElem('.btn-entrar-login'); // active
var btnLoginCadastrar = pegaElem('.btn-cadastrar-login');
var telaEntrar = pegaElem('.tela--entrar'); // ocultar 
var telaCadastrar = pegaElem('.tela--cadastrar');  

var btnXix = pegaElem('.btn-xix');
btnXix.addEventListener('click', function(e) {
	if (e.target.classList.contains('btn-xix')) {
		fechaModalLogin();
	}	
});

btnLoginNav.forEach(function (btn) {
	btn.addEventListener('click', function () {
	abreModalLogin();
	})
});

modalLogin.addEventListener('click', function (e) {
	if (e.target.classList.contains('modal--login--container')) {
		fechaModalLogin();
	}
})

btnLoginCadastrar.addEventListener('click', function () {
	btnLoginCadastrar.classList.add('active');
	btnLoginEntrar.classList.remove('active');
	telaCadastrar.classList.remove('ocultar');
	telaEntrar.classList.add('ocultar');

})
btnLoginEntrar.addEventListener('click', function () {
	btnLoginCadastrar.classList.remove('active');
	btnLoginEntrar.classList.add('active');
	telaCadastrar.classList.add('ocultar');
	telaEntrar.classList.remove('ocultar');

})

// ----------------------------------------------------------------------------------------------
// FECHA MODAL NO ESC
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        fechaModalLogin();
        fechaModalDetalhes();
        fechaNavLateral();
        fechaModalCarrinho();
    }
};
// ----------------------------------------------------------------------------------------------
// MODAL PRODUTOS
function abreModalLogin() {
	var top = window.scrollY;
	modalLogin.style.top = `${top}px`;
	modalLogin.classList.toggle('ocultar');
	produtosInicioContainer.classList.add('ocultar');


};
function fechaModalLogin() {
	modalLogin.classList.add('ocultar');
	produtosInicioContainer.classList.remove('ocultar');
};
// ----------------------------------------------------------------------------------------------
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
var btnPainel = document.querySelectorAll('.btn-painel');
var spanNomeUsuario = document.querySelectorAll('.spanNomeUsuario');
var btnUserLogin = document.querySelectorAll('.btn-login-nav');
var btnUserSair = document.querySelectorAll('.btn-sair-nav');


btnUserSair.forEach(function (btn) {
    btn.addEventListener('click', function () {
	resetUser();
	window.location.reload();
	})
})


function resetUser() {	
	localStorage.setItem('userId', "");
	localStorage.setItem('userName', "Faça-Login!");
	localStorage.setItem('userEmail', "");
	localStorage.setItem('isLogaded', false);
	localStorage.setItem('isADM', false);
}
setUser();



var btnEntrarTelaEntrar = pegaElem('[data-formEntrar="btn-salvar"]');
var btnCadastrarTelaEntrar = pegaElem('[data-formCadastrar="btn-salvar"]');
var imputEmailTelaEntrar = pegaElem('[data-formEntrar="email"]');
var imputSenhaTelaEntrar = pegaElem('[data-formEntrar="senha"]');

var imputNomeTelaCadastrar = pegaElem('[data-formCadastrar="nome"]');
var imputEmailCadastrar = pegaElem('[data-formCadastrar="email"]');
var imputSenhaCadastrar = pegaElem('[data-formCadastrar="senha"]');
var dica = pegaElem('details');

btnEntrarTelaEntrar.addEventListener('click', function (e) {
	e.preventDefault();
	dica.removeAttribute("open");

		if (imputEmailTelaEntrar.value === "") {

		imputEmailTelaEntrar.classList.add('invalid');
		mensagemLogin(msgLogin,"msg-erro",":-( ERRO!... <br> Favor inserir um email!");

		setTimeout(function () {
			imputEmailTelaEntrar.placeholder = "Email";
			imputEmailTelaEntrar.classList.remove('invalid')
		},1250);

		} else if  (imputSenhaTelaEntrar.value === "") {

		imputSenhaTelaEntrar.classList.add('invalid');
		mensagemLogin(msgLogin,"msg-erro",":-( ERRO!... <br> Favor inserir uma senha!");
		
		setTimeout(function () {
			imputSenhaTelaEntrar.placeholder = "Senha";
			imputSenhaTelaEntrar.classList.remove('invalid')
		},1250);

		} else {
		    login();
		}



})
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// MENSAGEM TELA ENTRAR
var msgLogin = pegaElem('.mensagem-tela-entrar');
var msgCadastro = pegaElem('.mensagem-tela-cadastro');

function mensagemLogin(elemento, classe, mensagem) {
 var root = document.querySelector(':root');
 var balao = elemento.querySelector('.msg-balao');			
	
	switch(classe) {
	case "msg-erro":
		var cor = '#d9534f';
		break;
	case "msg-sucesso":
		var cor = "#5cb85c";
		break;
	default:
		var cor = "transparent";
		break;
	}

	root.style.setProperty("--cor-borda-after",cor);
	elemento.classList.remove('ocultar');
	balao.classList.add(classe);
	var p = balao.querySelector('p');
	p.innerHTML = mensagem;
	
	setTimeout(function () {
	root.style.setProperty("--cor-borda-after","transparent");
	elemento.classList.add('ocultar');
	console.log()
	},1250);
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// LOGIN
function login() {
	
	var obj = pegaDadosLocalStorage('bd_usuarios');
	var usuarioSessao = [];

	for (var i in obj) {
			var id = obj[i].id;
			var nome = obj[i].nome;
			var email = obj[i].email;
			var senha = obj[i].senha;
			var tipo = obj[i].tipo;

		if ((imputEmailTelaEntrar.value == email)
			&& (imputSenhaTelaEntrar.value == senha)) {
			localStorage.setItem('userId', id);
			localStorage.setItem('userName', nome);
			localStorage.setItem('userEmail', email);
			localStorage.setItem('isLogaded', true);
			if (tipo === "adm") {localStorage.setItem('isADM', true);}
			setUser();			
			mensagemLogin(msgLogin,"msg-sucesso",":-) SUCESSO!... <br> Seja bem vindo!");			
				setTimeout(function () {
					fechaModalLogin();
				},1250);
			break;

        } 
		else {mensagemLogin(msgLogin,"msg-erro",":-( ERRO!... <br> Usuário ou email inválidos!");}

	}

		
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// SETAR USUARIO SESSAO
function setUser() {

	if (localStorage.getItem('isLogaded') == 'false') {
	var nome = localStorage.getItem('userName').split(' ')[0];
	spanNomeUsuario.forEach(function (span) {
	span.innerText = nome;
	}) 
	btnPainel.forEach(function (btn) {
	btn.classList.add('ocultar');
	})
	}

	if (localStorage.getItem('isLogaded') == 'true') {
	var nome = localStorage.getItem('userName').split(' ')[0];
	spanNomeUsuario.forEach(function (span) {
	span.innerText = nome;
	}) 
	btnPainel.forEach(function (btn) {
	btn.classList.remove('ocultar');
	})
	btnUserLogin.forEach(function (btn) {
	btn.classList.add('ocultar');
	})
	btnUserSair.forEach(function (btn) {
	btn.classList.remove('ocultar');
	})
	}

	if (localStorage.getItem('isADM') == 'true') {
	btnPainel.forEach(function (btn) {
	btn.classList.remove('ocultar');
	})
	} else {
	btnPainel.forEach(function (btn) {
	btn.classList.add('ocultar');
	})
	}

}
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// COPIA USUARIO ADMINISTRADOR PARA IMPUTS TELA ENTRAR
var btnCopy = pegaElem('.btn-copy');
btnCopy.addEventListener('click', function () {
	dica.removeAttribute("open");
	imputEmailTelaEntrar.value = "adm@adm.com";
	imputSenhaTelaEntrar.value = "adm"
})


// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// INSERIR DADOS
function inserirDados() {

	var obj = pegaDadosLocalStorage('bd_usuarios');
	var id = Math.round( Math.random()*1e13 );

for (var i=obj.length-1; i>=0; i--) {

if (obj[i].email == imputEmailCadastrar.value) {

	// console.log('igual')
	imputEmailCadastrar.value = "";
	imputEmailCadastrar.classList.add('invalid')

	imputEmailCadastrar.placeholder = "Email já cadastrado!"
	mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Email já existe!");

	setTimeout(function () {
	imputEmailCadastrar.placeholder = "Email"
	imputEmailCadastrar.classList.remove('invalid')
	},1250);

	return;
} 
} 
	
	if (imputNomeTelaCadastrar.value === "") {

		mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Digite um nome!");
		imputNomeTelaCadastrar.classList.add('invalid')
		
		setTimeout(function () {
			imputNomeTelaCadastrar.classList.remove('invalid')
		},1250);
	}
	else if (imputEmailCadastrar.value === "") 
	{

		mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Digite um email!");
		imputEmailCadastrar.classList.add('invalid')

		setTimeout(function () {
			imputEmailCadastrar.classList.remove('invalid')
		},1250);
	}
	else if (imputSenhaCadastrar.value === "") 
	{

		mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Digite uma senha!");
		imputSenhaCadastrar.classList.add('invalid')

		setTimeout(function () {
			imputSenhaCadastrar.classList.remove('invalid')
		},1250);
	}
	else
	{		

			var usuario = {
				id    : id,
				nome  : imputNomeTelaCadastrar.value,
				email : imputEmailCadastrar.value,
				senha : imputSenhaCadastrar.value,
				tipo  : 'usuario'
			};

			obj.push(usuario);
			salvaDadosLocalStorage("bd_usuarios", obj);
			mensagemLogin(msgCadastro,"msg-sucesso",":-) SUCESSO!... <br> Usuário cadastrado com sucesso!");
			// form.reset();
		setTimeout(function () {
			imputEmailTelaEntrar.value = imputEmailCadastrar.value;
			imputSenhaTelaEntrar.value = imputSenhaCadastrar.value;
			btnLoginEntrar.dispatchEvent(new Event('click'));			
		},1250);
			// fechaModalUsuario();
	}		
}


btnCadastrarTelaEntrar.addEventListener('click', function (e) {
	e.preventDefault();
	inserirDados();
})

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
var modalDetalhe = pegaElem('.modal__detalhe--wrapper');
var produtosInicioContainer = pegaElem('.container__inicio');

// MODAL PRODUTOS
var top;
function abreModalDetalhes() {
	top = window.scrollY;
	modalDetalhe.classList.toggle('ocultar');
	produtosInicioContainer.classList.add('ocultar');

};

function fechaModalDetalhes() {
	modalDetalhe.classList.add('ocultar');
	produtosInicioContainer.classList.remove('ocultar');
	window.scroll(0,top);
};
// ----------------------------------------------------------------------------------------------
modalDetalhe.addEventListener('click', function (e) {
	if ((e.target.classList.contains('modal__detalhe--wrapper'))
	    || (e.target.classList.contains('modal__detalhe'))) {
		fechaModalDetalhes();
	}
})
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

var botaoDetalhe = document.querySelectorAll('.btn-detalhes');
var detalheImg = pegaElem('.detalhe_img'); 
var detalheTitulo = pegaElem('.detalhe_titulo'); 
var detalheDescricao = pegaElem('.detalhe_descricao'); 
var detalheNota = pegaElem('.nota');
var detalheValor = pegaElem('.valor');



botaoDetalhe.forEach(function (btn) {
	btn.addEventListener('click', function (e) {

			var srtNomeBanco;

			var attrGenero = btn.parentElement.parentElement.querySelector('.conteudo-categoria').innerText;
			switch(attrGenero) {
			case 'Ação':
			srtNomeBanco = 'bd_acao';
			break;
			case 'Aventura':
			srtNomeBanco = 'bd_aventura';
			break;
			case 'Comédia':
			srtNomeBanco = 'bd_comedia';
			break;
			case 'Drama':
			srtNomeBanco = 'bd_drama';
			break;
			case 'Fantasia':
			srtNomeBanco = 'bd_fantasia';
			break;
			case 'Horror':
			srtNomeBanco = 'bd_horror';
			break;
			case 'Ficção':
			srtNomeBanco = 'bd_ficcao';
			break;
			}

			var obj = pegaDadosLocalStorage(srtNomeBanco);

			for (var i = 0; i < obj.length; i++) {
			var search_term = btn.parentElement.parentElement.querySelector('.conteudo-id').innerText;

			if (obj[i].id == search_term) {
				detalheImg.src = obj[i].poster;
				detalheTitulo.innerText = obj[i].titulo;
				detalheDescricao.innerText = obj[i].resumo;
				detalheNota.innerText = obj[i].nota;
				detalheValor.innerText = "R$ " + obj[i].valor.replace(".",",");

			}

			}

			abreModalDetalhes();

			})
})


var idDestaque = document.querySelectorAll('.id-destaque');
var categoriaDestaque = document.querySelectorAll('.categoria-destaque');
var imgDestaque = document.querySelectorAll('.imgDestaque');
// var modalDetalheWrapper = document.querySelector('.modal__detalhe--wrapper');
function defineSlides() {

	document.querySelectorAll('.imgDestaque')[0].src = pegaDadosLocalStorage('bd_destaques')[0].background;
	document.querySelectorAll('.tituloDestaque')[0].innerHTML = pegaDadosLocalStorage('bd_destaques')[0].titulo;
	document.querySelectorAll('.id-destaque')[0].innerHTML = pegaDadosLocalStorage('bd_destaques')[0].id;
	document.querySelectorAll('.categoria-destaque')[0].innerHTML = pegaDadosLocalStorage('bd_destaques')[0].categoria;

	document.querySelectorAll('.imgDestaque')[1].src = pegaDadosLocalStorage('bd_destaques')[1].background;
	document.querySelectorAll('.tituloDestaque')[1].innerHTML = pegaDadosLocalStorage('bd_destaques')[1].titulo;
	document.querySelectorAll('.id-destaque')[1].innerHTML = pegaDadosLocalStorage('bd_destaques')[1].id;
	document.querySelectorAll('.categoria-destaque')[1].innerHTML = pegaDadosLocalStorage('bd_destaques')[1].categoria;

	document.querySelectorAll('.imgDestaque')[2].src = pegaDadosLocalStorage('bd_destaques')[2].background;
	document.querySelectorAll('.tituloDestaque')[2].innerHTML = pegaDadosLocalStorage('bd_destaques')[2].titulo;
	document.querySelectorAll('.id-destaque')[2].innerHTML = pegaDadosLocalStorage('bd_destaques')[2].id;
	document.querySelectorAll('.categoria-destaque')[2].innerHTML = pegaDadosLocalStorage('bd_destaques')[2].categoria;
	
}
defineSlides();

imgDestaque.forEach(function (img) {
	img.addEventListener('click', function (e) {

		var srtNomeBanco;

			var attrGenero = e.target.parentElement.querySelector('.categoria-destaque').innerText;
			switch(attrGenero) {
			case 'Ação':
			srtNomeBanco = 'bd_acao';
			break;
			case 'Aventura':
			srtNomeBanco = 'bd_aventura';
			break;
			case 'Comédia':
			srtNomeBanco = 'bd_comedia';
			break;
			case 'Drama':
			srtNomeBanco = 'bd_drama';
			break;
			case 'Fantasia':
			srtNomeBanco = 'bd_fantasia';
			break;
			case 'Horror':
			srtNomeBanco = 'bd_horror';
			break;
			case 'Ficção':
			srtNomeBanco = 'bd_ficcao';
			break;
			}

			var obj = pegaDadosLocalStorage(srtNomeBanco);

			for (var i = 0; i < obj.length; i++) {
			var search_term = e.target.parentElement.querySelector('.id-destaque').innerText;

			if (obj[i].id == search_term) {
				detalheImg.src = obj[i].poster;
				detalheTitulo.innerText = obj[i].titulo;
				detalheDescricao.innerText = obj[i].resumo;
				detalheNota.innerText = obj[i].nota;
				detalheValor.innerText = "R$ " + obj[i].valor.replace(".",",");
			}

			}

			abreModalDetalhes();

			})
		// body...
	})

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
var inputSearch = document.querySelector('.input-search');
var produtosDestaques = pegaElem('.produtos__destaques');
var iconeApagar = pegaElem('.icone-apagar');
var produtosContainer = document.querySelectorAll('.produtos__container');

inputSearch.addEventListener('keyup', function (event) {

			var  filter, cards, cardContainer, title, i;
			filter = inputSearch.value.toUpperCase();
			cardContainer = document.querySelector('.produtos__inicio--container');

			cards = cardContainer.querySelectorAll('.card-container');
			for (i = 0; i < cards.length; i++) {
			title = cards[i].querySelector(".conteudo-titulo");
			
			if (title.innerText.toUpperCase().indexOf(filter) > -1) {
					cards[i].style.display = "";
					produtosDestaques.style.display = "";
					iconeApagar.classList.add('ocultar');
			} else {
					cards[i].style.display = "none";
					produtosDestaques.style.display = "none";
					iconeApagar.classList.remove('ocultar');

			}

					iconeApagar.addEventListener('click', function (e) {
					inputSearch.value = "";
					title.value = "";
					iconeApagar.classList.add('ocultar');
					produtosDestaques.style.display = "";
					
					cards.forEach(function (card) {
					card.style.display = "";
					})
					produtosContainer.forEach(function (section) {
					section.style.display = "";	
					})


					})

			}

			ocultaCategorias(produtosContainerAcao);
			ocultaCategorias(produtosContainerAventura);
			ocultaCategorias(produtosContainerComedia);
			ocultaCategorias(produtosContainerDrama);
			ocultaCategorias(produtosContainerFantasia);
			ocultaCategorias(produtosContainerHorror);
			ocultaCategorias(produtosContainerFiccao);
			
})



var produtosContainerAcao = document.querySelector('.produtos__acao__container');
var produtosContainerAventura = document.querySelector('.produtos__aventura__container');
var produtosContainerComedia = document.querySelector('.produtos__comedia__container');
var produtosContainerDrama = document.querySelector('.produtos__drama__container');
var produtosContainerFantasia = document.querySelector('.produtos__fantasia__container');
var produtosContainerHorror = document.querySelector('.produtos__horror__container');
var produtosContainerFiccao = document.querySelector('.produtos__ficcao__container');

function ocultaCategorias(elemento) {
	var childrens = elemento.children[1].children;
	var count = 0;

	for (var i = 0; i<childrens.length; i++) {
		if (childrens[i].style.display == 'none') {
			count++;
		}	
		}
		if (count == 20) {
			elemento.style.display = 'none';
		} else {
			elemento.style.display = '';
		}	
}



// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
var modalCarrinho = pegaElem('.modal__carrinho__wrapper');
var produtosInicioContainer = pegaElem('.container__inicio');

// MODAL PRODUTOS
var top;
function abreModalCarrinho() {
	top = window.scrollY;
	modalCarrinho.classList.toggle('ocultar');
	produtosInicioContainer.classList.add('ocultar');

};

function fechaModalCarrinho() {
	modalCarrinho.classList.add('ocultar');
	produtosInicioContainer.classList.remove('ocultar');
	window.scroll(0,top);
};

modalCarrinho.addEventListener('click', function (e) {
	if ((e.target.classList.contains('modal__carrinho__wrapper'))
	    || (e.target.classList.contains('carrinho--container'))) {
		fechaModalCarrinho();
	}
})

var iconeCarrinho = pegaElem('.icone-carrinho');
var carrinhoVazioWraper = pegaElem('.carrinho-vazio--wraper');

iconeCarrinho.addEventListener('click', function () {
	abreModalCarrinho();

	var count = iconeCarrinho.parentElement.getAttribute('data-carrinho-count');
	if (count == 0) {
		carrinhoVazioWraper.classList.remove('ocultar');
	}
	else
	{
		carrinhoVazioWraper.classList.add('ocultar');
	}

})

var btnContinuarComprando = pegaElem('.btn-continuar-comprando');

btnContinuarComprando.addEventListener('click', function (e) {
	e.preventDefault();
	fechaModalCarrinho();
});

// ---------------------------------------------------------------------------------------
// TABELA ITENS CARRINHO
var tabelaCarrinhoItens = pegaElem('.tabela__carrinho__itens');
var qtdItemTabela = document.querySelectorAll('.qtd-input');
var deleteInput = document.querySelectorAll('.delete-input');
var totalFoot = pegaElem('.total-tfoot');


qtdItemTabela.forEach(function (item) {
item.addEventListener('change', function () {
if (item.value <1) {item.value = 1}
var valor = this.parentElement.parentElement.cells[2];
var valorBase = this.parentElement.parentElement.cells[3];		

var total = parseFloat(valorBase.innerText) * parseFloat(item.value);
valor.innerText = parseFloat(total).toFixed(2);
atualizaValoresTabela();
})
item.addEventListener('click', function () {
atualizaValoresTabela();
})
})



deleteInput.forEach(function (item) {
	item.addEventListener('click', function () {
		this.parentElement.parentElement.cells[4].children[0].value = '1';
		this.parentElement.parentElement.remove();
		atualizaValoresTabela();
		
	})
})

function atualizaValoresTabela() {
	var linhasTabela = tabelaCarrinhoItens.querySelector('tbody').querySelectorAll('tr');
	var total = 0;

	linhasTabela.forEach(function (linha) {
		var txtValor = linha.cells[2].innerText;
		total = parseFloat(txtValor) + parseFloat(total);
	})
		totalFoot.value = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

atualizaValoresTabela();
