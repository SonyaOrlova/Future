import AbstractView from './abstract-view';

export default class DetailView extends AbstractView {
	constructor(it) {
		super();
		this.it = it;
	}

	get template() {
		if (this.it) {
			return `
			<div class="detail">
			<p> Выбран пользователь: <b>${this.it.firstName + ` ` + this.it.lastName}</b> <p>
			<p>Описание: </br>
			<textarea>${this.it.description}</textarea>
			</p>
			<p>Адрес проживания: <b>${this.it.address[`streetAddress`]}</b></p>
			<p>Город: <b>${this.it.address[`city`]}</b></p>
			<p>Провинция/штат: <b>${this.it.address[`state`]}</b></p>
			<p>Индекс: <b>${this.it.address[`zip`]}</b></p>
			</div>
			`;
		} return ``;
	}
}
