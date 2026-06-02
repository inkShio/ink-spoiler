export default class InkSpoiler {
	constructor(selector, options) {
		this.spoilers = document.querySelectorAll(selector);

		if (this.spoilers) {
			this.spoilers.forEach((el, i) => {
				let defaultOptions = {
					a11y: true,
					animation: true,
					duration: 350,
					classNames: {
						container: 'ink-spoiler',
						panel: 'ink-spoiler__panel',
						text: 'ink-spoiler__text',
						content: 'ink-spoiler__content',
						contentActive: 'show'
					},
					changeBeforeOpening: () => { },
					changeAfterOpening: () => { },
					changeBeforeClosing: () => { },
					changeAfterClosing: () => { }
				};
				this.options = Object.assign(defaultOptions, options);
				this.panel = el;
				this.panelState = this.panel.dataset.spoilerState;
				this.panelId = `inkspoiler-${Math.random().toString(16).slice(2)}`;
				this.box = this.panel.closest(`.${this.options.classNames.container}`);
				this.content = this.box.querySelector(`.${this.options.classNames.content}`);

				this.init();
				this.events(this.panel);
			});
		}
	}

	init() {
		if (this.panel.hasAttribute('data-spoiler-target')) {
			this.content.id = this.panel.dataset.spoilerTarget.slice(1);
		} else {
			this.panel.dataset.spoilerTarget = '#' + this.panelId;
			this.content.id = this.panelId;
		}

		if (this.options.a11y) {
			this.panel.setAttribute('role', 'button');
			this.panel.setAttribute('aria-expanded', this.panelState == 'show' ? true : false);
			this.panel.setAttribute('aria-controls', this.content.id);
		}

		this.switchPanel(this.panel);
		this.switchText(this.panel, true);
	}

	events(el) {
		el.addEventListener('click', () => {
			const content = document.querySelector(el.dataset.spoilerTarget);

			if (this.options.animation && content.classList.contains('animation')) return;

			const isExpanded = el.dataset.spoilerState == 'hide' ? true : false;
			const isGroup = el.getAttribute('data-spoiler-group');

			el.dataset.spoilerState = isExpanded
				? (el.dataset.spoilerState = 'show')
				: (el.dataset.spoilerState = 'hide');

			this.switchPanel(el);
			this.switchText(el);

			if (isGroup) {
				document.querySelectorAll(`[data-spoiler-group='${isGroup}']`).forEach((group) => {
					if (el.dataset.spoilerTarget !== group.dataset.spoilerTarget) {
						const content = document.querySelector(group.dataset.spoilerTarget);

						if (this.options.animation) {
							this.slideUp(content, group);
						} else {
							group.dataset.spoilerState = 'hide';
							content.classList.remove(this.options.classNames.contentActive);
						}
						if (this.options.a11y) group.setAttribute('aria-expanded', false);
					}
				});
			}
		});
	}

	switchText(el, init) {
		if (!el.getAttribute('data-spoiler-text')) return;

		const switchText = el.dataset.spoilerText;
		const panelText = el.querySelector(`.${this.options.classNames.text}`).textContent;

		if (init && el.dataset.spoilerState == 'show' || init == undefined) {
			el.querySelector(`.${this.options.classNames.text}`).textContent = switchText;
			el.dataset.spoilerText = panelText;
		}
	}

	switchPanel(el) {
		const content = document.querySelector(el.dataset.spoilerTarget);

		if (el.dataset.spoilerState == 'show') {
			this.options.changeBeforeOpening(el.closest(`.${this.options.classNames.container}`));
			if (!content.hasAttribute(this.options.classNames.contentActive)) {
				this.options.animation ? this.slideDown(content) : content.classList.add(this.options.classNames.contentActive);
				if (this.options.a11y) el.setAttribute('aria-expanded', true);
			}
			this.options.changeAfterOpening(el.closest(`.${this.options.classNames.container}`));
		} else {
			this.options.changeBeforeClosing(el.closest(`.${this.options.classNames.container}`));
			this.options.animation ? this.slideUp(content) : content.classList.remove(this.options.classNames.contentActive);
			if (this.options.a11y) el.setAttribute('aria-expanded', false);
			this.options.changeAfterClosing(el.closest(`.${this.options.classNames.container}`));
		}
	}

	slideDown(content) {
		if (content.classList.contains('animation')) return;

		content.classList.add('animation', this.options.classNames.contentActive);
		const height = content.offsetHeight;
		content.style.height = 0;
		content.style.overflow = 'hidden';
		content.style.transition = `height ${this.options.duration}ms ease`;
		content.offsetHeight;
		content.style.height = `${height}px`;

		window.setTimeout(() => {
			content.style.height = '';
			content.style.transition = '';
			content.style.overflow = '';
			content.classList.remove('animation');
		}, this.options.duration);
	}

	slideUp(content, el = null) {
		if (content.classList.contains('animation')) return;

		if (el) el.dataset.spoilerState = 'hide';

		content.classList.add('animation');
		content.style.height = `${content.offsetHeight}px`;
		content.offsetHeight;
		content.style.height = 0;
		content.style.overflow = 'hidden';
		content.style.transition = `height ${this.options.duration}ms ease`;

		window.setTimeout(() => {
			content.style.height = '';
			content.style.transition = '';
			content.style.overflow = '';
			content.classList.remove(this.options.classNames.contentActive);
			content.classList.remove('animation');
		}, this.options.duration);
	}
}
