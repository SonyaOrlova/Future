import AbstractView from './abstract-view';
import tableTemplate from '../templates/table-template';

import {descSort, ascSort} from '../utils/sorting';

export default class GridView extends AbstractView {
  constructor(data, limitRecords, currentPage) {
    super();
    this.data = data;
    this.state = {
      descSortFlag: false,
      limitRecords,
      currentPage
    };
  }

  get template() {
    return `
    <section class="data">
    <h2 class="data__title visually-hidden">Таблица данных</h2>
    </section>
    ${tableTemplate(this.data, this.state.limitRecords, this.state.currentPage)}
    `;
  }

  // сортирует таблицу
  sortGrid(colType, colNum) {
    const grid = this.element.querySelector(`.data__table`);
    const tbody = grid.querySelector(`.data__body`);
    const rows = [...tbody.rows];

    this.state.descSortFlag === true ? 
    rows.sort(descSort(colType, colNum)) :
    rows.sort(ascSort(colType, colNum));

    grid.removeChild(tbody);
    rows.forEach((row) => tbody.appendChild(row));
    grid.appendChild(tbody);
  }

  // отдает наружу строку для показа деталей
  showDetail() { }

  // поиск по таблице
  gridSearch(phrase) { 
    const grid = this.element.querySelector(`.data__table`);
    const tbody = grid.querySelector(`.data__body`);
    const rows = [...tbody.rows];

    // убирает подсветку по предыдущим результатам
    const lastResults = tbody.querySelectorAll(`.highlighted`);
    if (lastResults) {
      lastResults.forEach((it) => it.classList.remove(`highlighted`));
    }

    const textToFind = new RegExp(phrase, `ig`);
    let searchFlag = false;

    // поиск и подсветка результата
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].cells.length; j++) {
        searchFlag = textToFind.test(rows[i].cells[j].textContent);
        if (searchFlag && phrase !== ``) {
          let result = rows[i].cells[j];
          result.classList.add(`highlighted`);
          break;
        }
      }
      // скрытие столбцов которые не подошли по результату
      if (searchFlag) {
        rows[i].style.display = ``;
      } else {
        rows[i].style.display = `none`;
      }
    }
  }

  onGridClick(evt) { 
    const grid = this.element.querySelector(`.data__table`);

    if (evt.target.tagName === `TH`) {
      // смена флага сортировки
      this.state.descSortFlag = !this.state.descSortFlag; 
      // графическое направление сортировки
      grid.querySelectorAll(`th`).forEach((theader) => {
        theader.classList.remove(`downsort`);
        theader.classList.remove(`upsort`);
      });

      this.state.descSortFlag ? evt.target.classList.add(`downsort`) : evt.target.classList.add(`upsort`);

      this.sortGrid(evt.target.getAttribute(`data-type`), evt.target.cellIndex);
    } else {
      this.showDetail(this.data.find((it) => it.id == evt.target.parentElement.querySelectorAll(`td`)[0].textContent));
    }
  }

  bind() {
    const grid = this.element.querySelector(`.data__table`);
    grid.addEventListener(`click`, (evt) => this.onGridClick(evt));
  }
}
