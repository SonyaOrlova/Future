import ControlsView from '../views/controls-view';

export default class ControlsScreen {
  constructor() {
    this.content = new ControlsView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
  }

  showSmallData() { }
  showBigData() { }
  
  init() {
    this.content.onShowSmallDataBtnClick = this.showSmallData;
    this.content.onShowBigDataBtnClick = this.showBigData;
  }
}
