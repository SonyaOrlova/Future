import AbstractView from './abstract-view';

export default class SearchView extends AbstractView {
	constructor() {
		super();
	}

	get template() {
		return `
		<form class="search">
		<input class="search__input" type="text" placeholder="... search">
		<button class="search__submit" type="submit">Go</button>
		</form>
		`;
	}

	onGridSearch() { }

	bind() {
		const searchForm = this.element.querySelector(`.search`);
		const searchInput = this.element.querySelector(`.search__input`);

		searchForm.addEventListener(`submit`, (evt) => {
			evt.preventDefault();
			this.onGridSearch(searchInput.value);
			searchInput.value = ``;
		});
	}
}
