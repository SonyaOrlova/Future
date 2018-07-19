const createElement = (html) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = html;
  return wrapper;
};

export default class AbstractView {
  constructor() {
    if (this.constructor === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  } // запрещает создавать базовый класс, без наследования

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.createDOMElem();
    this.bind(this._element);
    return this._element;
  }

  createDOMElem() {
    return createElement(this.template);
  }

  bind() {
    // обработчики
  }
}
