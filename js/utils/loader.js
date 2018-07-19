const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const ServerUrls = {
  SMALL_DATA: `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`,
  BIG_DATA: `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
};

const loadData = (url) => {
  return fetch(url)
  .then(checkStatus)
  .then((response) => response.json());
};

export default class Loader {
  static loadSmallData() {
    return loadData(ServerUrls.SMALL_DATA)
  };
  static loadBigData() {
    return loadData(ServerUrls.BIG_DATA)
  };
}
