import AbstractView from './abstract-view';

export default class ControlsView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div class="data__size">
      <button type="button" class="data__size-btn data__size-btn--small">Small DATA</button> 
      <button type="button" class="data__size-btn data__size-btn--big">Big DATA</button>
    </div>
    `;
  }

  onShowSmallDataBtnClick() { }
  onShowBigDataBtnClick() { }

  bind() {
    const showSmallDataBtn = this.element.querySelector(`.data__size-btn--small`);
    const showBigDataBtn = this.element.querySelector(`.data__size-btn--big`);
    
    showSmallDataBtn.addEventListener(`click`, () => this.onShowSmallDataBtnClick());
    showBigDataBtn.addEventListener(`click`, () => this.onShowBigDataBtnClick());
  }
}
