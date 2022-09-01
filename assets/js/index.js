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



function defineBaseDadosTudo() {
		defineBaseDados('bd_acao','Ação');
		defineBaseDados('bd_aventura','Aventura');
		defineBaseDados('bd_comedia','Comédia');
		defineBaseDados('bd_drama','Drama');
		defineBaseDados('bd_fantasia','Fantasia');
		defineBaseDados('bd_horror','Horror');
		defineBaseDados('bd_ficcao','Ficção');
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
var btnLoginNav = document.querySelectorAll('.btn-login-nav');
var modalLogin = pegaElem('.modal--login--container');
var btnLoginEntrar = pegaElem('.btn-entrar-login'); // active
var btnLoginCadastrar = pegaElem('.btn-cadastrar-login');
var telaEntrar = pegaElem('.tela--entrar'); // ocultar 
var telaCadastrar = pegaElem('.tela--cadastrar');  

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
	imputNomeTelaCadastrar.focus();
})
btnLoginEntrar.addEventListener('click', function () {
	btnLoginCadastrar.classList.remove('active');
	btnLoginEntrar.classList.add('active');
	telaCadastrar.classList.add('ocultar');
	telaEntrar.classList.remove('ocultar');
	imputEmailTelaEntrar.focus();
})

// ----------------------------------------------------------------------------------------------
// FECHA MODAL NO ESC
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 27) {
        fechaModalLogin();
    }
};
// ----------------------------------------------------------------------------------------------
// MODAL PRODUTOS
function abreModalLogin() {
	travaScrollBars();
	var top = window.scrollY;
	modalLogin.style.top = `${top}px`;
	modalLogin.classList.toggle('ocultar');
	imputEmailTelaEntrar.focus();
};
function fechaModalLogin() {
	destravaScrollBars();
	modalLogin.classList.add('ocultar');
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
// resetUser();
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
		imputEmailTelaEntrar.focus();
		imputEmailTelaEntrar.classList.add('invalid');
		mensagemLogin(msgLogin,"msg-erro",":-( ERRO!... <br> Favor inserir um email!");

		setTimeout(function () {
			imputEmailTelaEntrar.placeholder = "Email";
			imputEmailTelaEntrar.classList.remove('invalid')
		},1250);

		} else if  (imputSenhaTelaEntrar.value === "") {
		imputSenhaTelaEntrar.focus();
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
		// console.log(obj[i].email + "   " + imputEmailTelaEntrar.value)
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
				},900);
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
	imputEmailCadastrar.focus();
	imputEmailCadastrar.placeholder = "Email já cadastrado!"
	mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Email já existe!");

	setTimeout(function () {
	imputEmailCadastrar.placeholder = "Email"
	imputEmailCadastrar.classList.remove('invalid')
	},800);

	return;
} 
} 
	
	if (imputNomeTelaCadastrar.value === "") {
		imputNomeTelaCadastrar.focus();
		mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Digite um nome!");
		imputNomeTelaCadastrar.classList.add('invalid')
		
		setTimeout(function () {
			imputNomeTelaCadastrar.classList.remove('invalid')
		},800);
	}
	else if (imputEmailCadastrar.value === "") 
	{
		imputEmailCadastrar.focus();
		mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Digite um email!");
		imputEmailCadastrar.classList.add('invalid')

		setTimeout(function () {
			imputEmailCadastrar.classList.remove('invalid')
		},800);
	}
	else if (imputSenhaCadastrar.value === "") 
	{
		imputSenhaCadastrar.focus();
		mensagemLogin(msgCadastro,"msg-erro",":-( ERRO!... <br> Digite uma senha!");
		imputSenhaCadastrar.classList.add('invalid')

		setTimeout(function () {
			imputSenhaCadastrar.classList.remove('invalid')
		},800);
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
		},800);
			// fechaModalUsuario();
	}		
}


btnCadastrarTelaEntrar.addEventListener('click', function (e) {
	e.preventDefault();
	inserirDados();
})