import Loader from './utils/loader';

import LoadingScreen from './screens/loading-screen';
import ControlsScreen from './screens/controls-screen';
import ContentScreen from './screens/content-screen';
import ErrorScreen from './screens/error-screen';

const controlsInner = document.querySelector(`.controls`);
const contentInner = document.querySelector(`.content`);

const showScreen = (parent, element) => {
	parent.innerHTML = ``;
	parent.appendChild(element);
};

class Appication {
	static load(dataType) {
		this.showLoading();

		if (dataType === `small`) {
			Loader.loadSmallData()
			.then((data) => {
				this.smallData = data;
				this.showContent(this.smallData);
			})
			.catch(Appication.showError);
		}

		if (dataType === `big`) {
			Loader.loadBigData()
			.then((data) => {
				this.bigData = data;
				this.showContent(this.bigData);
			})
			.catch(Appication.showError);
		}
	}

	static start() {
		this.showControls();
	}

	static showControls() {
		const controls = new ControlsScreen();
		showScreen(controlsInner, controls.root);

		controls.showSmallData = () => 
		this.smallData ? this.showContent(this.smallData) : this.load(`small`);

		controls.showBigData = () => 
		this.bigData ? this.showContent(this.bigData) : this.load(`big`);

		controls.init();
	}

	static showContent(data) {
		const content = new ContentScreen(data);
		showScreen(contentInner, content.root);
	}

	static showLoading() {
		const loading = new LoadingScreen();
		showScreen(contentInner, loading.root);
	}

	static showError() {
		const error = new ErrorScreen();
		showScreen(contentInner, error.root);
	}
}

Appication.start();
