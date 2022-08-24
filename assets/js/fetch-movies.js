// // ---------------------------------------------------
//  function pegaElem(elemento) {
// 	return document.querySelector(elemento);
// }
// // ---------------------------------------------------
// // SALVA DADOS LOCAL STORAGE
//  function salvaDadosLocalStorage(nome, bd) {
// 	localStorage.setItem(nome, JSON.stringify(bd));
// }
// // PEDGA DADOS LOCAL STORAGE
//  function pegaDadosLocalStorage(bd) {
// 	var bd = JSON.parse(localStorage.getItem(bd));	
// 	return bd;
// }

// var url = 'https://api.themoviedb.org/3/'
// var query = 'genre/movie/list?';
// var API_KEY = 'api_key=1787315acea95582c62c2ef4a134b49e';
// var pt = "&language=pt-BR";
// var urlImg = 'https://image.tmdb.org/t/p/original/';

//  var bd_acao = 28;
//  var bd_aventura = 12;
//  var bd_comedia = 35;
//  var bd_drama = 18;
//  var bd_fantasia = 14;
//  var bd_horror = 27;
//  var bd_ficcao = 878;

//  function pegaFilmesApi(genero, nomeBanco,categoria, ano) {
// var dados = pegaDadosLocalStorage(nomeBanco);

// 		if (dados === null || dados.length <= 0) {
// 		dados = [];
// 				fetch("https://api.themoviedb.org/3/discover/movie?with_genres=" + genero + "&" + API_KEY + pt + "&year=" + ano)
// 				.then(function (resposta) {
// 					return resposta.json();	
// 				})
// 				.then(function (data) {
// 					var results = data.results;
// 					results.forEach(function (index, i) {
// 								var id = Math.round( Math.random()*1e13 );
// 					 			dados.push( 
// 								{
// 								'id'            : id,
// 								'titulo'		: index.title,
// 								// 'valor'		    : "39,90",
// 								'valor'		    : randoValor(),
// 								'categoria'		: categoria,
// 								'resumo'		: index.overview,
// 								'nota'		    : index.vote_average,
// 								'poster'		: urlImg + index.poster_path,
// 								'background'	: urlImg + index.backdrop_path,
// 								}
// 								);
// 					});
// 					salvaDadosLocalStorage(nomeBanco ,dados);						
// 				});
// 		} 
// };

// function randoValor() {
// 	var valores = ['29,90','39,90','49,90','59,90','69,90'];
// 	var indexRandon = Math.round( Math.random() * 4);
// 		return valores[indexRandon];
// };


// pegaFilmesApi(bd_acao, 'bd_acao_test','Ação',2022);
// pegaFilmesApi(bd_aventura, 'bd_aventura_test','Aventura',2021);
// pegaFilmesApi(bd_comedia, 'bd_comedia_test','Comédia',2020);
// pegaFilmesApi(bd_drama, 'bd_drama_test','Drama',2019);
// pegaFilmesApi(bd_fantasia, 'bd_fantasia_test','Fantasia',2018);
// pegaFilmesApi(bd_horror, 'bd_horror_test','Horror',2017);
// pegaFilmesApi(bd_ficcao, 'bd_ficcao_test','Ficção',2016);


// var arr1 = pegaDadosLocalStorage('bd_acao_test');
// var arr2 = pegaDadosLocalStorage('bd_aventura_test');
// var arr3 = pegaDadosLocalStorage('bd_comedia_test');
// var arr4 = pegaDadosLocalStorage('bd_drama_test');
// var arr5 = pegaDadosLocalStorage('bd_fantasia_test');
// var arr6 = pegaDadosLocalStorage('bd_horror_test');
// var arr7 = pegaDadosLocalStorage('bd_ficcao_test');

// setTimeout(function () { 
// 	var allArr = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5, ...arr6, ...arr7];
// 	salvaDadosLocalStorage('bd_todos_test' ,allArr);	
// }, 500);


