import LoadingView from '../views/loading-view';

export default class LoadingScreen {
  constructor() {
    this.content = new LoadingView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
  }
}
