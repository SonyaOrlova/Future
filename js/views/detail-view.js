import AbstractView from './abstract-view';

export default class DetailView extends AbstractView {
	constructor(item) {
		super();
		this.item = item;
	}

	get template() {
		if (this.item) {
			return `
			<div class="detail">
			<p> Выбран пользователь: <b>${this.item.firstName + ` ` + this.item.lastName}</b> <p>
			<p>Описание: </br>
			<textarea>${this.item.description}</textarea>
			</p>
			<p>Адрес проживания: <b>${this.item.address[`streetAddress`]}</b></p>
			<p>Город: <b>${this.item.address[`citemy`]}</b></p>
			<p>Провинция/штат: <b>${this.item.address[`state`]}</b></p>
			<p>Индекс: <b>${this.item.address[`zip`]}</b></p>
			</div>
			`;
		} return ``;
	}
}

