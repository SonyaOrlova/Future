import SearchView from '../views/search-view';
import PaginationView from '../views/pagination-view';
import GridView from '../views/grid-view';
import DetailView from '../views/detail-view';

import scrollingToElem from '../utils/scrolling';
import {descSort, ascSort} from '../utils/sorting';

const LIMIT_RECORDS = 50;

export default class ContentScreen {
	constructor(data) {
		this.originalState = {
			data: data,
			sortFlag: false,
			checkedHeaderName: undefined
		}

		this.filteredState = {
			data: [...data],
			sortFlag: false,
			checkedHeaderName: undefined
		}

		this.pages = {
			pagesCount: null,
			currentPage: null
		};

		this.root = document.createElement(`div`);

		this.search = this.createSearchView();
		this.root.appendChild(this.search.element);

		this.pagination = this.createPaginationView(this.originalState);
		this.root.appendChild(this.pagination.element);

		this.grid = this.createGridView(this.originalState);
		this.root.appendChild(this.grid.element);

		this.detail = this.createDetailView();
		this.root.appendChild(this.detail.element);
	}

	createSearchView() {
		const search = new SearchView();
		search.onGridSearch = (phrase) => this.filterData(phrase);
		return search;
	}

	createPaginationView(state) {
		this.restartPaginationProps(state.data);

		const pagination = new PaginationView(this.pages.pagesCount);

		pagination.onPaginationBtnClick = (currentPage) => {
			this.pages.currentPage = +currentPage;
			this.updateGridView(state);
		}
		return pagination;
	}

	createGridView(state) {
		let gridViewState = {
			firstRowIndex: (this.pages.currentPage - 1) * LIMIT_RECORDS,
			lastRowIndex: this.pages.currentPage * LIMIT_RECORDS, 
			sortFlag: state.sortFlag,
			checkedHeaderName: state.checkedHeaderName
		};

		const grid = new GridView(state.data, gridViewState);

		grid.renderCheckedItem = (item) => this.updateDetailView(item);
		grid.renderCheckedHeader = (checkedHeaderType, checkedHeaderName) => this.sortData(checkedHeaderType, checkedHeaderName);
		grid.showSortIcon();
		grid.showCurrentPage();
		return grid;
	}

	createDetailView(item) {
		const detail = new DetailView(item);
		return detail;
	}

	upgradePaginationView(state) {
		const newPagination = this.createPaginationView(state);
		this.root.replaceChild(newPagination.element, this.pagination.element);
		this.pagination = newPagination;
	}

	updateGridView(state) {
		const newGrid = this.createGridView(state);
		this.root.replaceChild(newGrid.element, this.grid.element);
		this.grid = newGrid;
	}

	updateDetailView(item) {
		const newDetail = this.createDetailView(item);
		this.root.replaceChild(newDetail.element, this.detail.element);
		this.detail = newDetail;
		scrollingToElem(this.detail.element);
	}

	restartPaginationProps(data) {
		this.pages.pagesCount = Math.ceil(data.length / LIMIT_RECORDS);
		this.pages.currentPage = 1;
	}

	renewContent(state) {
		this.upgradePaginationView(state);
		this.updateGridView(state);
	}

	sortData(checkedHeaderType, checkedHeaderName) {
		let state;
		this.filterFlag ? state = this.filteredState : state = this.originalState;

		state.sortFlag = !state.sortFlag;
		state.checkedHeaderName = checkedHeaderName;

		state.sortFlag === true ? 
		state.data.sort(descSort(checkedHeaderType, checkedHeaderName)) :
		state.data.sort(ascSort(checkedHeaderType, checkedHeaderName));

		this.renewContent(state);
	}

	filterData(text) {
		const textToFind = new RegExp(text, `ig`);
		let searchFlag = false;

		if (text === ``) {
			this.filterFlag = false;
			this.renewContent(this.originalState);
		} else {
			let filteredArray = [];
			this.originalState.data.forEach((item) => {
				for (let key in item) {
					searchFlag = textToFind.test(item[key]);
					if (searchFlag) {
						filteredArray.push(item);
						break;
					};
				}
			})
			this.filterFlag = true;
			this.filteredState = {
				data: filteredArray,
				sortFlag: false,
				checkedHeaderName: undefined
			}
			this.renewContent(this.filteredState);
		}
	}
}
