# InkSpoiler
Простая JavaScript-библиотека спойлера и aккордеона.
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
// $is-active-content-class: 'test';
@import '/path/to/node_modules/ink-spoiler/src/ink-spoiler';
```
```js
const spoilers = new InkSpoiler('.js-spoiler');
```

```html
<div class="spoiler">
  <div class="spoiler__panel js-spoiler" data-spoiler-state="hide" data-spoiler-target="#my-custom-id" data-spoiler-text="Закрыть" data-spoiler-group="A">
    <div class="spoiler__text">Спойлер</div>
  </div>
  <div class="spoiler__content">Контент</div>
</div>
```
## Описание по data атрибутам
|Название свойства|Значение|Описание|
|--|--|--|
|data-spoiler-state="hide",<br>data-spoiler-state="show"|Обязательное|Атрибут указывающий открыт или закрыт спойлер.|
|data-spoiler-target="#myID"|Не обязательное|Используйте данный атрибут если хотите задать свой ID.|
|data-spoiler-text="Закрыть"|Не обязательное|Используйте данный атрибут если хотите, что бы менялся текст при открытии/закрытии.|
|data-spoiler-group="A"|Не обязательное|Используйте данный атрибут на нескольких спойлерах, что бы получить aккордеон.|

## Конфигурация
|Название свойства|Тип|Начальное значение|Описание|
|--|--|--|--|
|activeContentClass|String|'show'|Активный класс, для открытия и закрытия контента. При смене класса, также стоит вписать новый класс в `$is-active-content-class` в стилях.|
|a11y|boolean|true|Включить/выключить доступность (accessibility).|
|animation|boolean|true|Включить/выключить анимацию открытия/закрытия контента.|
|duration|number|350|Время открытия/закрытия контента в ms. Работает только при `animation: true`.|

## Пример конфигурации
```js
const spoiler = new InkSpoiler('.js-spoiler', {
  activeContentClass: 'show',
  a11y: true,
  animation: true,
  duration: 350
});
```
