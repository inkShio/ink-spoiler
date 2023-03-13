export default class InkSpoiler {
	constructor(selector, options) {
		this.spoilers = document.querySelectorAll(selector);

		if (this.spoilers) {
			this.spoilers.forEach((el, i) => {
				let defaultOptions = {
					animation: true,
					duration: 350
				};
				this.options = Object.assign(defaultOptions, options);
				this.panel = el;
				this.panelState = this.panel.dataset.spoilerState;
				this.panelId = 'inkspoiler-' + (i + 1);
				this.box = this.panel.closest('.spoiler');
				this.content = this.box.querySelector('.spoiler__content');

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

		this.switchPanel(this.panel);
		this.switchText(this.panel, true);
	}

	events(el) {
		el.addEventListener('click', () => {
			const content = document.querySelector(el.dataset.spoilerTarget);

			if (this.options.animation && content.classList.contains('spoiler__content_animation')) return;

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
							group.dataset.spoilerState = 'hide';
							content.classList.add('spoiler__content_animation');
							content.style.height = `${content.offsetHeight}px`;
							content.offsetHeight;
							content.style.height = 0;
							content.style.overflow = 'hidden';
							content.style.transition = `height ${this.options.duration}ms ease`;

							window.setTimeout(() => {
								content.style.height = '';
								content.style.transition = '';
								content.style.overflow = '';
								content.classList.remove('spoiler__content_show');
								content.classList.remove('spoiler__content_animation');
							}, this.options.duration);
						} else {
							group.dataset.spoilerState = 'hide';
							content.classList.remove('spoiler__content_show');
						}
					}
				});
			}
		});
	}

	switchText(el, init) {
		if (!el.getAttribute('data-spoiler-text')) return;

		const switchText = el.dataset.spoilerText;
		const panelText = el.querySelector('.spoiler__text').textContent;

		if (init && el.dataset.spoilerState == 'show' || init == undefined) {
			el.querySelector('.spoiler__text').textContent = switchText;
			el.dataset.spoilerText = panelText;
		}
	}

	switchPanel(el) {
		const content = document.querySelector(el.dataset.spoilerTarget);

		if (el.dataset.spoilerState == 'show') {
			if (!content.hasAttribute('spoiler__content_show')) {
				if (this.options.animation) {
					if (content.classList.contains('spoiler__content_animation')) return;
					content.classList.add('spoiler__content_show');
					content.classList.add('spoiler__content_animation');
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
						content.classList.remove('spoiler__content_animation');
					}, this.options.duration);
				} else {
					content.classList.add('spoiler__content_show');
				}
			}
		} else {
			if (this.options.animation) {
				if (content.classList.contains('spoiler__content_animation')) return;

				content.classList.add('spoiler__content_animation');
				content.style.height = `${content.offsetHeight}px`;
				content.offsetHeight;
				content.style.height = 0;
				content.style.overflow = 'hidden';
				content.style.transition = `height ${this.options.duration}ms ease`;

				window.setTimeout(() => {
					content.style.height = '';
					content.style.transition = '';
					content.style.overflow = '';
					content.classList.remove('spoiler__content_show');
					content.classList.remove('spoiler__content_animation');
				}, this.options.duration);
			} else {
				content.classList.remove('spoiler__content_show');
			}
		}
	}
}
