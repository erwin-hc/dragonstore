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
var inputSearch = document.querySelector('.input-search');
var iconeApagar = pegaElem('.icone-apagar');
var produtosContainer = document.querySelectorAll('.produtos__todos__container');
var cardsWrapperTodos = pegaElem('.cards-wrapper--todos');

inputSearch.addEventListener('keyup', function (event) {

			var  filter, cards, cardContainer, title, i;
			filter = inputSearch.value.toUpperCase();
			cardContainer = document.querySelector('.produtos__inicio--container');

			cards = cardContainer.querySelectorAll('.card-container');
			for (i = 0; i < cards.length; i++) {
			title = cards[i].querySelector(".conteudo-titulo");
			
			if (title.innerText.toUpperCase().indexOf(filter) > -1) {
					cards[i].style.display = "";
					iconeApagar.classList.add('ocultar');
					// cardsWrapperTodos.style.justifyContent = "space-evenly";
			} else {
					cards[i].style.display = "none";
					iconeApagar.classList.remove('ocultar');
					// cardsWrapperTodos.style.justifyContent = "flex-start";
			}

					iconeApagar.addEventListener('click', function (e) {
					inputSearch.value = "";
					title.value = "";
					iconeApagar.classList.add('ocultar');
					
					cards.forEach(function (card) {
					card.style.display = "";
					})
					produtosContainer.forEach(function (section) {
					section.style.display = "";	
					})


					})

			}

			
})

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
function populaCardsProdutos(nomeBanco) {


	var dados = pegaDadosLocalStorage(nomeBanco);
	if (dados === null || dados.length <= 0)
	{
	dados = [];
	}


	dados.forEach(function (index, i) {
				var Ptitulo = index.titulo;
				var Pid = index.id;
				var Pcategoria = index.categoria;
				var SRCcardIMG = index.poster;
				var Pvalor = index.valor;

				criaCard(Ptitulo,Pid,Pcategoria,SRCcardIMG,Pvalor);

	});

};

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

function criaCard(Ptitulo,Pid,Pcategoria,SRCcardIMG,Pvalor) {

var wrapper = pegaElem('.cards-wrapper--todos');

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

var bdTodos = pegaDadosLocalStorage('bd_todos');

if (bdTodos !== null)
{
	populaCardsProdutos('bd_todos');
}




// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

var iconeHamburguer = pegaElem('.icone-hamburguer');
var navLateral = pegaElem('.nav__lateral--inicio');
iconeHamburguer.onclick = abreNavLateral;
var iconeXis = pegaElem('.nav__lateral--icons');
iconeXis.onclick = fechaNavLateral;
var body = pegaElem('.body');

var btnXix = pegaElem('.btn-xix');
btnXix.addEventListener('click', function(e) {
	if (e.target.classList.contains('btn-xix')) {
		fechaModalLogin();
	}	
});
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
        fechaModalLogin();
        fechaModalDetalhes();
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

})
btnLoginEntrar.addEventListener('click', function () {
	btnLoginCadastrar.classList.remove('active');
	btnLoginEntrar.classList.add('active');
	telaCadastrar.classList.add('ocultar');
	telaEntrar.classList.remove('ocultar');

})

function abreModalLogin() {
	travaScrollBars();
	var top = window.scrollY;
	modalLogin.style.top = `${top}px`;
	modalLogin.classList.toggle('ocultar');

};
function fechaModalLogin() {
	destravaScrollBars();
	modalLogin.classList.add('ocultar');
};

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
	// travaScrollBars();
	top = window.scrollY;
	// modalDetalhe.style.top = `${top}px`;
	modalDetalhe.classList.toggle('ocultar');
	produtosInicioContainer.classList.add('ocultar');

};

function fechaModalDetalhes() {
	// destravaScrollBars();
	modalDetalhe.classList.add('ocultar');
	produtosInicioContainer.classList.remove('ocultar');
	window.scroll(0,top);
};

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
var detalheValor = pegaElem('.detalhe_valor');
var detalheBase = pegaElem('.valor_detalhe_base');



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
				detalheValor.innerText = obj[i].valor;
				detalheBase.innerText = obj[i].valor;

			}

			}

			abreModalDetalhes();

			})
})

// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************
var rowLinks = document.querySelectorAll('.row--links');
rowLinks.forEach(function (link) {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		var filtro = e.target.innerText.replace("→","");

		if (filtro == "TODOS") {
			filtro = "";
		}


		var filter, cards, cardContainer, title, i;
			filter = filtro;
			cardContainer = document.querySelector('.produtos__inicio--container');

			cards = cardContainer.querySelectorAll('.card-container');
			for (i = 0; i < cards.length; i++) {
			title = cards[i].querySelector(".conteudo-categoria");
			
			if (title.innerText.toUpperCase().indexOf(filter) > -1) {
					cards[i].style.display = "";
					// iconeApagar.classList.add('ocultar');
					// cardsWrapperTodos.style.justifyContent = "space-evenly";
			} else {
					cards[i].style.display = "none";
					// iconeApagar.classList.remove('ocultar');
					// cardsWrapperTodos.style.justifyContent = "flex-start";
			}

					iconeApagar.addEventListener('click', function (e) {
					inputSearch.value = "";
					title.value = "";
					iconeApagar.classList.add('ocultar');
					
					cards.forEach(function (card) {
					card.style.display = "";
					})
					produtosContainer.forEach(function (section) {
					section.style.display = "";	
					})
					});

			}
	})
})

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    pegaElem('.nav__principal__inicio--container').style.top = "0";
  } else {
    pegaElem('.nav__principal__inicio--container').style.top = "-150px";
  }
  prevScrollpos = currentScrollPos;
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

var carrinhoCount = pegaElem('.icone-carrinho-wrapper');
var iconeCarrinho = pegaElem('.icone-carrinho');
var carrinhoVazioWraper = pegaElem('.carrinho-vazio--wraper');
var carrinhoWrapper = pegaElem('.carrinho--wrapper');

iconeCarrinho.addEventListener('click', function () {
	abreModalCarrinho();

	var count = iconeCarrinho.parentElement.getAttribute('total-carrinho');
	if (count == 0) {
		carrinhoVazioWraper.classList.remove('ocultar');
		carrinhoWrapper.classList.add('ocultar');
	}
	else
	{
		carrinhoVazioWraper.classList.add('ocultar');
		carrinhoWrapper.classList.remove('ocultar');
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

function atualizaTotalTabelaCarrinho() {
	var obj = pegaDadosLocalStorage('bd_carrinho');
	if (obj === null || obj.length <= 0)
	{
	obj = [];
	}

	var total, valor;

	var total = obj.map(item => item.valor).reduce((prev, curr) => prev + curr, 0);
	total = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
	totalFoot.value = total;

	carrinhoCount.setAttribute('total-carrinho', obj.length)

}

atualizaTotalTabelaCarrinho();


tabelaCarrinhoItens.addEventListener('click', function (e) {
				if (e.target.classList.contains('qtd-input')) {
							if (e.target.value <1) {
							e.target.value = 1;
							}	
							atualizaTotalTabelaCarrinho();
				}

				if (e.target.classList.contains('delete-input')) {
					e.target.parentElement.parentElement.remove();


								var obj = pegaDadosLocalStorage('bd_carrinho');								
								var search_term = e.target.parentElement.parentElement.cells[1].innerText;

								for (var i=obj.length-1; i>=0; i--) {
								    if (obj[i].item == search_term) {
								        obj.splice(i, 1);
								    }
								}

								salvaDadosLocalStorage('bd_carrinho', obj);
								atualizaTotalTabelaCarrinho();
								populaCarrinho();


					if (tabelaCarrinhoItens.children[0].rows.length <= 0) {
					fechaModalCarrinho();
					} 

				}

				if (e.target.classList.contains('qtd-input')) {
					var id = e.target.parentElement.parentElement.cells[0].innerText;
					var item = e.target.parentElement.parentElement.cells[1].innerText;
					var imagem = e.target.parentElement.parentElement.cells[2].children[0].src;
					var titulo = e.target.parentElement.parentElement.cells[3].innerText;
					var valorBase = parseFloat(e.target.parentElement.parentElement.cells[4].innerText.replace(",","."));
					var valor = parseFloat(e.target.parentElement.parentElement.cells[5].innerText.replace(",","."));
					var valorInput = e.target.parentElement.parentElement.cells[6].children[0].value;
					var valorLinha = valorBase * valorInput;
 					
 						var obj = pegaDadosLocalStorage('bd_carrinho');
						if (obj === null || obj.length <= 0)
						{
						obj = [];
						}

						var search_term = item;

						for (var i=obj.length-1; i>=0; i--) {
						if (obj[i].item == search_term) {

						    obj[i] = {
								id        : id,
								titulo    : titulo,
								valor     : valorLinha,
								valorBase : valorBase,
								imagem    : imagem,
								qtd 	  : valorInput,
								item      : item,
							};
						}
						}

						salvaDadosLocalStorage('bd_carrinho', obj);	
						atualizaTotalTabelaCarrinho();
						populaCarrinho();
					// console.log(valorLinha)
				}

})



function editarDadosPro(id, titulo,valor,valorBase,imagem,qtd) {

}
// toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
var btnCart = document.querySelectorAll('.btn-cart');
var detalheBtn = document.querySelectorAll('.detalhe--btn');
var iconeCart = pegaElem('.icone--cart');


btnCart.forEach(function (btn) {
	btn.addEventListener('click', function (e) {
		var id = this.parentElement.parentElement.children[0].children[0].children[1].innerText;
		var item = Math.round(Math.random()*1e13 );
		var titulo = this.parentElement.parentElement.children[0].children[0].children[0].innerText;
	    var valor = this.parentElement.parentElement.children[0].children[3].children[0].innerText;
	    var valorBase = this.parentElement.parentElement.children[0].children[3].children[0].innerText;
	    var imagem = this.parentElement.parentElement.children[0].children[2].children[0].src;


		addItemCarrinho(id,item,titulo,valor,valorBase,imagem);
		atualizaTotalTabelaCarrinho();

		iconeCart.classList.add('tremer');
		btn.classList.add('tremer');
		setTimeout(function () {
		iconeCart.classList.remove('tremer');
		btn.classList.remove('tremer');
		fechaModalDetalhes();
		}, 500);

	})
})

detalheBtn.forEach(function (btn) {
	btn.addEventListener('click', function (e) {
		var id = this.parentElement.parentElement.children[1].querySelector('.detalhe_id').innerText;
		var item = Math.round(Math.random()*1e13 );
		var titulo = this.parentElement.parentElement.children[1].querySelector('.detalhe_titulo').innerText;
	    var valor = this.parentElement.parentElement.children[1].querySelector('.detalhe_valor').innerText;
	    var valorBase =  this.parentElement.parentElement.children[1].querySelector('.detalhe_valor').innerText;
	    var imagem = this.parentElement.parentElement.children[0].querySelector('.detalhe_img').src;

		addItemCarrinho(id,item,titulo,valor,valorBase,imagem);
		atualizaTotalTabelaCarrinho();


		iconeCart.classList.add('tremer');
		btn.classList.add('tremer');
		setTimeout(function () {
		iconeCart.classList.remove('tremer');
		btn.classList.remove('tremer');
		fechaModalDetalhes();
		}, 500);
	})
})


function addItemCarrinho(id,item,titulo,valor,valorBase,imagem) {

		var obj = pegaDadosLocalStorage('bd_carrinho');
		if (obj === null || obj.length <= 0) {
		obj = [];
		}

		obj.push(
		{
		"id":id,
		"titulo":titulo,
		"valor":parseFloat(valor.replace(",",".")),
		"valorBase":valor, 
		"imagem":imagem,
		"qtd":1,
		"item": item,
		}
		);											
		salvaDadosLocalStorage('bd_carrinho', obj);
		populaCarrinho();


		

}


function populaCarrinho() {
	var dados = pegaDadosLocalStorage('bd_carrinho');
	if (dados === null || dados.length <= 0)
	{
	dados = [];
	}

	var tbody = pegaElem('.tabela__carrinho__itens').querySelector('tbody');
	tbody.innerHTML = "";


	dados.forEach(function (index) {
	var html = `	
					<tr>					
						<td class="ocultar">${index.id}</td>					
						<td class="ocultar">${index.item}</td>					
						<td><img src=${index.imagem} style="width: 50px;"></td>
						<td>${index.titulo}</td>
						<td class="valor-base ocultar">${index.valorBase}</td>
						<td>${index.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
						<td><input class="qtd-input" type="number" value="${index.qtd}"></td>
						<td><i class="delete-input fa-regular fa-trash-can fa-xl"></i></td>
					</tr>
		`;
	 var novaLinha = tbody.insertRow(tbody.rows.length);
	 novaLinha.innerHTML = html;
	});
}

populaCarrinho();

var btnFinalizarCompra = pegaElem('.btn-finalizar-compra');

btnFinalizarCompra.addEventListener('click', function () {
	localStorage.removeItem('bd_carrinho');
	populaCarrinho();
	atualizaTotalTabelaCarrinho();
	fechaModalCarrinho();
})



var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    pegaElem('.nav__principal__inicio--container').style.top = "0";
  } else {
    pegaElem('.nav__principal__inicio--container').style.top = "-150px";
  }
  prevScrollpos = currentScrollPos;
}


var sobreFormulario = pegaElem('.sobre__formulario form');
sobreFormulario[3].addEventListener('click', function (e) {
	e.preventDefault();
	
		if (sobreFormulario[0].value === "") {

		sobreFormulario[0].classList.add('invalid');
		sobreFormulario[0].placeholder = "Favor digitar um email !!!";

		setTimeout(function () {
			sobreFormulario[0].placeholder = "Email";
			sobreFormulario[0].classList.remove('invalid')
		},1250);

		} else if  (sobreFormulario[1].value === "") {

		sobreFormulario[1].classList.add('invalid');
		sobreFormulario[1].placeholder = "Favor digitar um nome !!!";
		
		setTimeout(function () {
			sobreFormulario[1].placeholder = "Nome";
			sobreFormulario[1].classList.remove('invalid')
		},1250);

		} else if  (sobreFormulario[2].value === "") {

		sobreFormulario[2].classList.add('invalid');
		sobreFormulario[2].placeholder = "Favor digitar uma mensagem !!!";
		
		setTimeout(function () {
			sobreFormulario[2].placeholder = "Mensagem";
			sobreFormulario[2].classList.remove('invalid')
		},1250);

		} else {
			sobreFormulario.reset();

		}


})