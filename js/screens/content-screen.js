import SearchView from '../views/search-view';
import PaginationView from '../views/pagination-view';
import GridView from '../views/grid-view';
import DetailView from '../views/detail-view';

import scrollingToElem from '../utils/scrolling';

const LIMIT_RECORDS = 50;

export default class ContentScreen {
	constructor(data) {
		this.data = data;
		this.state = {
			pagesCount: Math.ceil(this.data.length / LIMIT_RECORDS),
			currentPage: 1,
			currentItem: undefined
		};

		this.root = document.createElement(`div`);

		this.search = this.createSearchView();
		this.root.appendChild(this.search.element);

		this.pagination = this.createPaginationView();
		this.root.appendChild(this.pagination.element);

		this.grid = this.createGridView();
		this.root.appendChild(this.grid.element);
	}

	createSearchView() {
		const search = new SearchView();
		search.onGridSearch = (phrase) => {
			this.grid.gridSearch(phrase);
		};
		return search;
	}

	createPaginationView() {
		const pagination = new PaginationView(this.state.pagesCount);
		pagination.onPaginationBtnClick = (currentPage) => {
			this.state.currentPage = +currentPage;
			this.updateGridView();
		};
		return pagination;
	}

	createGridView() {
		const grid = new GridView(this.data, this.state.currentPage * LIMIT_RECORDS, this.state.currentPage * LIMIT_RECORDS - LIMIT_RECORDS);
		grid.showDetail = (item) => {
			const detail = new DetailView(item);
			this.root.appendChild(detail.element);
			
			scrollingToElem(detail.element);

			if (this.detail) {
				this.detail.element.remove();
			}
			this.detail = detail;
		};
		return grid;
	}

	updateGridView() {
		const newGrid = this.createGridView();
		this.root.replaceChild(newGrid.element, this.grid.element);
		this.grid = newGrid;
	}
}
