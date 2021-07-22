
/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/


const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);
	if (classNames) {

		// element.className.add('test', 'hello', 'world');
		element.classList.add(...classNames);

	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}

	return element;
};


// TODO: Деструктурировать параметры в функции createHeader

const createHeader = ({ title, header: { logo, social, menu } }) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);
	if (logo) {
		const logoImage = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип ' + title
		});
		wrapper.append(logoImage);
	}
	// Блок меню
	if (menu) {
		const menuWrapper = getElement('nav', ['menu-list']);
		const allMenu = menu.map(item => {
			const menuLink = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});

			// menuLink.href = item.link;
			// menuLink.textContent = item.title;
			return menuLink;
		});
		menuWrapper.append(...allMenu);
		// Вывод свойств объекта в консоль (полезно!)
		// console.dir(menuWrapper);
		wrapper.append(menuWrapper);
		const button = getElement('button', ['menu-button']);
		button.addEventListener('click', () => {
			button.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		})
		container.append(button);
	}
	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title
			}));
			socialLink.href = item.link;
			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}
	header.append(container);
	container.append(wrapper);
	return header;
};

// Наиболее простой вариант инициализации переменных в параметрах функции createMain

const createMain = ({
	title,
	main: { genre, rating, description, trailer, slider } }) => {

	// Долгий и неинтересный вариант инициализации переменных :(
	// const title = param.title;
	// const genre = param.main.genre;

	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span',
			['genre', 'animated', 'fadeInRight'],
			{ textContent: genre });

		content.append(genreSpan);
	}

	// alt + shift + f - Табуляция !!!
	// ctrl + shift + l - Console.Log();

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div',
			['rating-number'], {
			textContent: `${rating}/10`
		});
		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
			});
			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}

	content.append(getElement(
		'h1',
		['main-title', 'animated', 'fadeInRight'],
		{ textContent: title }
	));

	if (description) {
		content.append(getElement('p',
			['main-description', 'animated', 'fadeInRight'],
			{ textContent: description },
		));
	}

	if (trailer) {
		const youtubeLink = getElement('a',
			['button', 'animated', 'fadeInRight', 'youtube-modal'],
			{
				href: trailer,
				textContent: 'Смотреть трейлер'
			})
		const youtubeImageLink = getElement('a',
			['play', 'youtube-modal'],
			{
				href: trailer,
				ariaLabel: 'Смотреть трейлер'
			});
		const iconPlay = getElement('img',
			['play-img'],
			{
				src: 'img/play.svg',
				alt: 'Смотреть трейлер',
				ariaHidden: true
			});


		content.append(youtubeLink);
		youtubeImageLink.append(iconPlay);
		wrapper.append(youtubeImageLink);
	}
	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map(item => {

			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: (item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle : '')

			});

			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
					${item.title ? `<p class="card-title">${item.title}</p>` : ''}
					${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
				`;
				card.append(cardDescription);
			}
			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);
		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});

	}

	return main;
}

const createFooter = ({ footer: { copyright, menu } }) => {
	const footerBlock = getElement('footer', ['footer']);
	const contentWrapper = getElement('div', ['container']);
	const footerContentBlock = getElement('div', ['footer-content']);
	const leftBlock = getElement('div', ['left']);
	const copyrightSpan = getElement('span', ['copyright'], { textContent: copyright });
	// Left Block Appending
	leftBlock.append(copyrightSpan);
	// Right Block Appending
	const rightBlock = getElement('div', ['right']);
	const footerNavMenu = getElement('nav', ['footer-menu']);
	const allMenuList = menu.map(item => {
		const link = getElement('a', ['footer-link'], {
			
			href: item.link,
			textContent: item.title
		});
		
		console.log(link);
		

		return link;
	});
	footerNavMenu.append(...allMenuList);
	console.log('allMenuList: ', allMenuList);
	rightBlock.append(footerNavMenu);
	// Final Appending
	footerContentBlock.append(leftBlock, rightBlock);
	contentWrapper.append(footerContentBlock);
	footerBlock.append(contentWrapper);
	return footerBlock;

	
}

const movieConstructor = (selector, options) => {

	// TODO: Footer

	// TODO: Иконка favicon в заголовке страницы
	// if (options.favicon) document.head.append(getElement('link', [], { rel: 'icon', href: options.favicon }));
	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);
		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type)
		});
		document.head.append(favicon);
	}
	// TODO: Изменение заголовка страницы
	if (options.title) document.title = options.title;

	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';
	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	// Тернарный оператор (Смотреть пример ниже)
	app.style.backgroundImage = options.background ? `url("${options.background}")` : '';

	// По старому 'url("' + options.background + '")'

	if (options.header) app.append(createHeader(options));

	if (options.main) app.append(createMain(options));

	if (options.footer) app.append(createFooter(options));
};

// Вызов конструктора и передача в него параметров: селектор класса на index страницы html и объекта

movieConstructor('.app', {
	title: 'Викинги',
	background: 'vikings/background.jpg',
	favicon: 'vikings/logo.png',
	fontColor: '#ffffff',
	backgroundColor: '#141218',
	subColor: '#9D2929',
	header: {
		logo: 'vikings/logo.png',
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com',
				image: 'witcher/social/twitter.svg'
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				image: 'witcher/social/instagram.svg'
			},
			{
				title: 'Facebook',
				link: 'https://facebook.com',
				image: 'witcher/social/facebook.svg'
			}
		],
		menu: [
			{
				title: 'Описание',
				link: '#'
			},
			{
				title: 'Трейлер',
				link: '#'
			},
			{
				title: 'Отзывы',
				link: '#'
			}
		]
	},
	main: {
		genre: '2013, история, драма, боевик, мелодрама, приключения',
		rating: '8',
		description: 'Сериал рассказывает об отряде викингов Рагнара. Он восстал, чтобы стать королём племён викингов. Норвежская легенда гласит, что он был прямым потомком Одина, бога войны и воинов.',
		trailer: 'https://www.youtube.com/watch?v=Auzs95InJzo',
		slider: [
			{
				img: 'vikings/series/series-1.jpg',
				title: 'Обряды посвящения',
				subtitle: 'Серия №1'
			},
			{
				img: 'vikings/series/series-2.jpg',
				title: 'Гнев северян',
				subtitle: 'Серия №2'
			},
			{
				img: 'vikings/series/series-3.jpg',
				title: 'Обездоленные',
				subtitle: 'Серия №3'
			},
			{
				img: 'vikings/series/series-4.jpg',
				title: 'Суд',
				subtitle: 'Серия №4'
			}
		]
	},
	footer: {
		copyright: '© 2021 The Vikings. All right reserved.',
		menu: [
			{
				link: '#',
				title: 'Privacy Policy'
			},
			{
				link: '#',
				title: 'Terms of Service'
			},
			{
				link: '#',
				title: 'Legal'
			}
		]
	}
});


/*

const foo = function(a, b) {
	return a + b;
}



const arrow = (a, b) => {return a + b}
console.log(arrow(5,7));

*/

/* Тернарный оператор (Условный)

let weather = 'rain';

if (weather === 'rain') console.log('Берем зонт'); else console.log('Надеваем шлепки');

console.log(weather === 'rain' ? 'Дождь, берем зонт' : 'Солнце, надеваем шлепки');

*/

// * functions - decorators

/*

const arr = [
	{
		name: 'Fyodor',
		gender: 'Men'
	},

	{
		name: 'Maxime',
		gender: 'Men'
	},

	{
		name: 'Maria',
		gender: 'Women'
	},
];

const decorator = (obj) => {
	if (obj.gender === 'Men') {

		return Object.assign(
			{},
			{ work: 'CHMK' },
			obj);
	}

	return obj;
}
const newArr = arr.map(decorator);
console.log('newArr: ', newArr);
console.log(arr);

*/

/*

const wrapper = (fn) => {
	const cache = []
	return (...args) => {
		const result = fn(...args);
		cache.push({
			[fn.name + JSON.stringify(args)]: result
		})
		console.log(cache);
		return result;
	}
}

const multy = (a, b) => a ** b;

const multyWrapper = wrapper(multy);
multy(5, 3);

console.log(multyWrapper(5, 3));

*/