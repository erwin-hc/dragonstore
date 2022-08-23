// HELPERS
export function l(dados) {
	return console.log(dados);
}
// ---------------------------------------------------
export function pegaElem(elemento) {
	return document.querySelector(elemento);
}
// ---------------------------------------------------
// SALVA DADOS LOCAL STORAGE
export function salvaDadosLocalStorage(nome, bd) {
	localStorage.setItem(nome, JSON.stringify(bd));
}
// PEDGA DADOS LOCAL STORAGE
export function pegaDadosLocalStorage(bd) {
	var bd = JSON.parse(localStorage.getItem(bd));	
	return bd;
}

/*-------------------------------------------------------------------------------------------------*/
// TRAVA SCROLLBAR
export function travaScrollBars() {
    document.documentElement.style.overflowY = 'hidden';
}
// DESTRAVA SCROLLBAR
export function destravaScrollBars() {
    document.documentElement.style.overflowY = 'initial';
}

/*-------------------------------------------------------------------------------------------------*/
// MODAL PRODUTOS
export function abreModalProduto() {
	gb.travaScrollBars();
	var top = window.scrollY;
	modalProduto.style.top = `${top}px`;
	modalProduto.classList.toggle('ocultar');
	formImputNome.focus();
};
export function fechaModalProduto() {
	gb.destravaScrollBars();
	modalProduto.classList.add('ocultar');
	form.reset();
	bntFormSalvar.disabled = false;
	btnFormUpdate.disabled = true;
	btnFormExcluir.disabled = false;
};
