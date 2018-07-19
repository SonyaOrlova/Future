import AbstractView from './abstract-view';

export default class LoadingView extends AbstractView {
	constructor() {
		super();
	}

	get template() {
		return `
		<div id="loading">
			<div id="loading_1" class="loading"></div>
			<div id="loading_2" class="loading"></div>
			<div id="loading_3" class="loading"></div>
		</div>
		`;
	}
}
