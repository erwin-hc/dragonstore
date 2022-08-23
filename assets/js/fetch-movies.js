import * as gb from './global.js'; 

var url = 'https://api.themoviedb.org/3/'
var query = 'genre/movie/list?';
var API_KEY = 'api_key=1787315acea95582c62c2ef4a134b49e';
var pt = "&language=pt-BR";
var urlImg = 'https://image.tmdb.org/t/p/original/';

export var bd_acao = 28;
export var bd_aventura = 12;
export var bd_comedia = 35;
export var bd_drama = 18;
export var bd_fantasia = 14;
export var bd_horror = 27;
export var bd_ficcao = 878;

// https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=1787315acea95582c62c2ef4a134b49e&language=pt-BR&year=1980

export function pegaFilmesApi(genero, nomeBanco,categoria, ano) {
var dados = gb.pegaDadosLocalStorage(nomeBanco);
		if (dados === null || dados.length <= 0) {
		dados = [];
				fetch("https://api.themoviedb.org/3/discover/movie?with_genres=" + genero + "&" + API_KEY + pt + "&year=" + ano)
				.then(function (resposta) {
					return resposta.json();	
				})
				.then(function (data) {
					var results = data.results;
					results.forEach(function (index, i) {
					 			dados.push( 
								{
								'id'            : i + 1,
								'titulo'		: index.title,
								// 'valor'		    : "39,90",
								'valor'		    : randoValor(),
								'categoria'		: categoria,
								'resumo'		: index.overview,
								'nota'		    : index.vote_average,
								'poster'		: urlImg + index.poster_path,
								'background'	: urlImg + index.backdrop_path,
								}
								);
					});
					gb.salvaDadosLocalStorage(nomeBanco ,dados);						
				});
		} 
};

function randoValor() {
	var valores = ['29,90','39,90','49,90','59,90','69,90'];
	var indexRandon = Math.round( Math.random() * 4);
		return valores[indexRandon];
};


pegaFilmesApi(bd_acao, 'bd_acao','Ação',2022);
pegaFilmesApi(bd_aventura, 'bd_aventura','Aventura',2021);
pegaFilmesApi(bd_comedia, 'bd_comedia','Comédia',2020);
pegaFilmesApi(bd_drama, 'bd_drama','Drama',2019);
pegaFilmesApi(bd_fantasia, 'bd_fantasia','Fantasia',2018);
pegaFilmesApi(bd_horror, 'bd_horror','Horror',2017);
pegaFilmesApi(bd_ficcao, 'bd_ficcao','Ficção',2016);


var arr1 = gb.pegaDadosLocalStorage('bd_acao');
var arr2 = gb.pegaDadosLocalStorage('bd_aventura');
var arr3 = gb.pegaDadosLocalStorage('bd_comedia');
var arr4 = gb.pegaDadosLocalStorage('bd_drama');
var arr5 = gb.pegaDadosLocalStorage('bd_fantasia');
var arr6 = gb.pegaDadosLocalStorage('bd_horror');
var arr7 = gb.pegaDadosLocalStorage('bd_ficcao');

var allArr = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5, ...arr6, ...arr7];
gb.salvaDadosLocalStorage('bd_todos' ,allArr);	

function randomDestaques() {
	
	var obj = gb.pegaDadosLocalStorage('bd_todos');
	var imgDestaque1 = gb.pegaElem('.imgDestaque1');
	var imgDestaque2= gb.pegaElem('.imgDestaque2');
	var imgDestaque3 = gb.pegaElem('.imgDestaque3');
	var textoDestaque1 = gb.pegaElem('.textoDestaque1');
	var textoDestaque2 = gb.pegaElem('.textoDestaque2');
	var textoDestaque3 = gb.pegaElem('.textoDestaque3');
	
	var ird = Math.round( Math.random() * 130);
	textoDestaque1.innerHTML = obj[ird].titulo;
	textoDestaque2.innerHTML = obj[ird + 1].titulo;
	textoDestaque3.innerHTML = obj[ird + 2].titulo;
	imgDestaque1.src = obj[ird].background;
	imgDestaque2.src = obj[ird + 1].background;
	imgDestaque3.src = obj[ird + 2].background;


}
randomDestaques();

// imgDestaque
// textoDestaque