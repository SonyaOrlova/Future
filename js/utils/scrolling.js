export default (DOMElem) => {
	const selectedPosX = DOMElem.offsetLeft;
	const selectedPosY = DOMElem.offsetTop;

	window.scrollTo(selectedPosX, selectedPosY);
}
