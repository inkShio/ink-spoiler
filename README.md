# InkSpoiler
Простая JavaScript-библиотека спойлера и aккордеона.
Минимум стилей. Кастомизируй под свои нужды.
Посмотреть примеры можно [тут](https://inkshio.github.io/ink-spoiler/).

## Установка
```shell
npm i ink-spoiler --save
```

## Подключение
```js
import InkSpoiler from 'ink-spoiler';
```
```scss
// InkSpoiler
@use '/path/to/node_modules/ink-spoiler/src/ink-spoiler';
// или если нужно переопределить стандартные классы
@use '/path/to/node_modules/ink-tabs/src/ink-spoiler' with (
  $spoiler-container: 'ink-spoiler',
  $spoiler-active: 'show'
);
```
```js
const spoilers = new InkSpoiler('.js-spoiler');
```

```html
<div class="ink-spoiler">
  <div class="ink-spoiler__panel js-spoiler" data-spoiler-state="hide" data-spoiler-target="#my-custom-id" data-spoiler-text="Закрыть" data-spoiler-group="A">
    <div class="ink-spoiler__text">Спойлер</div>
  </div>
  <div class="ink-spoiler__content">Контент</div>
</div>
```
## Описание по data атрибутам
| Название свойства                                       | Значение        | Описание                                                                            |
| ------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------- |
| data-spoiler-state="hide",<br>data-spoiler-state="show" | Обязательное    | Атрибут указывающий открыт или закрыт спойлер.                                      |
| data-spoiler-target="#myID"                             | Не обязательное | Используйте данный атрибут если хотите задать свой ID.                              |
| data-spoiler-text="Закрыть"                             | Не обязательное | Используйте данный атрибут если хотите, что бы менялся текст при открытии/закрытии. |
| data-spoiler-group="A"                                  | Не обязательное | Используйте данный атрибут на нескольких спойлерах, что бы получить aккордеон.      |

## Конфигурация
| Название свойства   | Тип      | Начальное значение   | Описание                                                                      |
| ------------------- | -------- | -------------------- | ----------------------------------------------------------------------------- |
| a11y                | boolean  | true                 | Включить/выключить доступность (accessibility).                               |
| animation           | boolean  | true                 | Включить/выключить анимацию открытия/закрытия контента.                       |
| duration            | number   | 350                  | Время открытия/закрытия контента в ms. Работает только при `animation: true`. |
| classNames          | object   | {}                   | Объект с именами классов для кастомизации.                                    |
| - container         | string   | ink-spoiler          | Класс главного контейнера.                                                    |
| - panel             | string   | ink-spoiler__panel   | Класс панели.                                                                 |
| - text              | string   | ink-spoiler__text    | Класс текста.                                                                 |
| - content           | string   | ink-spoiler__content | Класс  контента.                                                              |
| - contentActive     | string   | show                 | Активный класс контента.                                                      |
| changeBeforeOpening | function |                      | Срабатывает перед открытием спойлера.                                         |
| changeAfterOpening  | function |                      | Срабатывает после открытие спойлера.                                          |
| changeBeforeClosing | function |                      | Срабатывает перед закрытием спойлера.                                         |
| changeAfterClosing  | function |                      | Срабатывает после закрытие спойлера.                                          |

## Пример конфигурации
```js
const spoiler = new InkSpoiler('.js-spoiler', {
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
  changeBeforeOpening: (spoiler) => console.log(spoiler),
  changeAfterOpening: (spoiler) => console.log(spoiler),
  changeBeforeClosing: (spoiler) => console.log(spoiler),
  changeAfterClosing: (spoiler) => console.log(spoiler)
});
```

## Команды для сборки
```
npm run build - продакшн
npm run dev - разработка
```
