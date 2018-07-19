import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="error">ooops! try to reload this page</div>
    `;
  }
}
