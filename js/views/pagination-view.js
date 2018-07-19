import AbstractView from './abstract-view';

export default class PaginationView extends AbstractView {
	constructor(pagesCount) {
		super();
		this.pagesCount = pagesCount;
		this.currentPage = 1;
	}

	get template() {
		return `
		<div class="pagination">
      ${new Array(this.pagesCount).fill().map((it, index) =>`
      <span class="page" id="${index + 1}">${index + 1}</span>
      `).join(``)}
		</div>
		`;
	}

	onPaginationBtnClick() { }

	bind() {
		const pageElements = this.element.querySelectorAll(`.page`);
		pageElements[0].classList.add(`active`);
		
		pageElements.forEach((page) => page.addEventListener(`click`, (evt) => {
			pageElements.forEach((p) => p.classList.remove(`active`));
			page.classList.add(`active`);
			this.onPaginationBtnClick(evt.target.id);
		}));
	}
}
