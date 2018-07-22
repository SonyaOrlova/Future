import AbstractView from './abstract-view';

export default class GridView extends AbstractView {
  constructor(data, gridViewState) {
    super();
    this.data = data;
    this.state = gridViewState;
  }

  get template() {
    return `
    <table class="data__table">
    <thead class="data__head">
    <tr>
    <th class="data-head__id" data-type="number" data-name="id">ID</th>
    <th class="data-head__firstName" data-name="firstName">FirstName</th>
    <th class="data-head__lastName" data-name="lastName">LastName</th>
    <th class="data-head__email" data-name="email">Email</th>
    <th class="data-head__phone" data-name="phone">Phone</th>
    <th class="data-head__address" data-name="address">Address</th>
    <th class="data-head__description" data-name="description">Description</th>
    </tr>
    </thead>
    <tbody class="data__body">
    ${[...this.data].map((item) => `
      <tr class="data__item">
      <td class="data__id">${item.id}</td>
      <td class="data__firstName">${item.firstName}</td>
      <td class="data__lastName">${item.lastName}</td>
      <td class="data__email">${item.email}</td>
      <td class="data__phone">${item.phone}</td>
      <td class="data__address">${JSON.stringify(item.address).slice(1, -1)}</td>
      <td class="data__description">${item.description}</td>
      </tr>
      `).join(``)}
    </tbody> 
    </table>
    `;
  }

  // показывает таблицу по страницам
  showCurrentPage() {
    const tbody = this.element.querySelector(`.data__body`);
    const rows = [...tbody.rows];

    rows.forEach((row, index) => {
      if (index < this.state.firstRowIndex || index >= this.state.lastRowIndex) {
        row.style.display = `none`;
      }
    })
  }
  // отрисовывает направление сортировки
  showSortIcon() {
    const thead = this.element.querySelector(`.data__head`);
    const headers = thead.querySelectorAll(`th`);

    const checkedHeader = [...headers].find((header) => header.getAttribute(`data-name`) === this.state.checkedHeaderName);
    if (checkedHeader) {
      this.state.sortFlag ? checkedHeader.classList.add(`downsort`) : checkedHeader.classList.add(`upsort`);
    }
  }
  // возвращает выбранный объект для детализации
  renderCheckedItem() { }
  // возвращает выбранный заголовок для сортировки
  renderCheckedHeader() { }

  onGridHeaderClick(checkedHeader) {
    this.renderCheckedHeader(checkedHeader.getAttribute(`data-type`), checkedHeader.getAttribute(`data-name`));
  }

  onGridBodyClick(checkedCell) {
    this.renderCheckedItem(this.data.find((it) => it.id == checkedCell.parentElement.querySelectorAll(`td`)[0].textContent));
  }

  bind() {
    const grid = this.element.querySelector(`.data__table`);

    grid.addEventListener(`click`, (evt) => 
      evt.target.tagName === `TH` ? this.onGridHeaderClick(evt.target) : this.onGridBodyClick(evt.target));
  }
}
