---
id: score-traffic-quality
title: Оцениваем качество трафика и ловим ботов при помощи Javascript

# author: Pushflow
# author_title: Front End Engineer @ Facebook
# author_url: https://github.com/yangshun
# author_image_url: https://avatars0.githubusercontent.com/u/1315101?s=400&v=4
tags: [качество трафика, binom, боты]
image: /img/blog/ru/og-2020-07-18-traffic-quality.png
---


Оценка качества трафика поможет нам отсекать мусорные источники трафика и площадки без необходимости тратить деньги на их полноценный тест. В данной статье мы покажем скрипты, которые используем для оценки качества трафика и понимания заинтересованности аудитории в вашем прилендинге. Для распределения трафика мы будем использовать [Binom](https://cp.binom.org/aff/go/upor_defo) и его [систему событий](https://docs.binom.org/events.php). Если вы используете другой трэкер, то наверняка в нем есть похожий функционал и вы легко сможете взять принципы из статьи и адаптировать под ваш трэкер.

Что мы будем делать? Мы будем выполнять различные Javascript проверки на прилендинге, чтобы определить, насколько это "настоящий" пользователь, или бот, который просто скликивает вашу рекламу или, например, другой арбитражник, который из под прокси спаит ваши прилендинги.

**Итак, две главные задачи:**

1. Понять количество некачественного трафика
2. Понять заинтересованность живых пользователей вашим прилендингом.
<!--truncate-->

**Для этого будем собирать следующие Events:**

1. Загрузка страницы
2. Провел 3 секунды на лендинге
3. Провел 12 секунды на лендинге
4. Скрол на странице
5. Результат скрипта определения качества клика
6. 100% Бот

**Передача эвентов в Binom**

Перед стартом для упрощения передачи эвентов в бином создадим функцию, которая будет передавать номер эвента и его значение в бином:

```jsx
// Замените на урл на URL вашего трэкера, без / в конце
var tracker_url = 'https://youtrackerurl.com';

function lp_callback(eventNumber, value) {
  var o = document.createElement("img");
  if (typeof window['getUclick'] === 'function') {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value + '&uclick=' + getUclick();
  } else {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value;
  }
}
```

Теперь, для того, чтобы передать эвент, нужно вызвать функцию lp_callback() и передать в нее два аргумента: номер эвента и значение. Например, чтобы передать event_8, равный 1, нужно вызвать lp_callback(8,1)

# Javascript проверки

### 1. Загрузка страницы

Ключевой параметр, если ваши лендинги находятся не на одном сервере с трэкером. Скрипт будет передавать в event_1 значение равное 1:

```jsx
window.addEventListener("DOMContentLoaded", function () {
	lp_callback(1,1);
});
```

*DOMContentLoaded — происходит, когда весь HTML был полностью загружен и пройден парсером, после чего срабатывает наш lp_callback*

**Почему эвент загрузки страницы один из важнейших параметров для внешних лендингов?** 

Во-первых, по нему мы можем понять, сколько кликов у нас не долетает до прорисовки страницы. На этот параметр мы можем влиять изменениями в нашей инфраструктуре, т.е. переносе трэкера и лендингов ближе к пользователю. 

Во-вторых, по этому эвенту мы будем считать все остальные события. Например, сейчас пробивка прилендинга (LP CTR) в бином считается так: все клики пробившие лэндинг разделить на вообще все клики. Но, например, на зоне может быть нормальный трафик, но плохая загрузка страницы по техническим причинам, то LP CTR будет крайне низким. Поэтому мы считаем пробивку приленда как все клики пробившие лендинг разделить на клики прогрузившие страницу. Подробнее об этом позже.

### 2-3. Провел 3 или 12 секунд на лендинге

Помогает нам понять заинтересованность пользователей в нашем прилендинге. Эвент должен запускаться после загрузки страницы, поэтому объединим его со скриптом выше

```jsx
window.addEventListener("DOMContentLoaded", function () {
	// Эвент загрузки страницы
	lp_callback(1,1);

	// Эвент 3 секунд
  setTimeout(function () {
    lp_callback(2, 1)
  }, 3 * 1000);

	// Эвент 12 секунд
  setTimeout(function () {
    lp_callback(3, 1)
  }, 12 * 1000);
});
```

### 4. Скрол на странице

Также поможет нам понять заинтересованность юзера в вашем предложении

```jsx
// Эвент скрола
var scroll = 0;
window.onscroll = function () {
  if (scroll != 1) {
    scroll = 1;
    lp_callback(4, 1)
  }
};
```

### 5-6. Скрипт определения качества клика

Тут будет немного магии. По классике у каждого арбитражника есть какой-то набор правил, по которым он определяет ботовый трафик: совпадение navigator.platform с юзерагентом, наличие Java или плагинов в браузере, но так как мы имеем только 10 эвентов в биноме, то передавать все значения смысла нет. Тут нам на помощь приходит скрипт из [Pushflow](https://pushflow.net/index.ru.html) для определения качества трафика, который все это делает за один заход. Собственно, данный скрипт делает 35 таких проверок в браузере и еще с пяток на сервере, что позволяет определить с большой долей вероятности подмену юзерагента, наличие признаков прокси или впн в соединении, различных ботов, headless браузеры, режим инкогнито и т.д.. Скрипт загружается асинхронно, без блокировки страницы, и выполняет все в фоновом режиме, т.е. никак не влияет на скорость загрузки страницы. Он запускает все свои проверки и выдает оценку качества пользователя от 0 до 1. Подробнее о скрипте можно почитать в личном кабинете [Pushflow](https://pushflow.net/app/).

Итак, начнем интеграцию. Для этого будем использовать два эвента в биноме: 

event_5 — те, кто не прошел проверку по качеству: люди за прокси, впн, подозрительные браузеры и устройства или оси, но там могут быть вполне себе живые конвертящие пользователи.

event_6 — те, кто точно является ботом или нежелательным пользователем. В него будем передавать данные со всех источников, если это точно не качественный пользователь. Если вы используете серверную клоаку или другие сервисы, то мы будем передавать данные о ботовости из них в данный event.

Итак, если скрипт определения качества трафика от Pushflow возвращает значение меньше 1, тогда записываем в подозрительных юзеров, если значение меньше или равно 0.4, то в ботов. Подробнее о градации читайте в ЛК Pushflow

```jsx
function pushflowCallback(result) {
	// Все клики с качеством меньше 1 записываем в подозрительныe, event5
  if (result.quality < 1) { lp_callback(5, 1); }

	// Все клики с качеством меньше или равным 0.4 записываем в ботов, event6
  if (result.quality <= 0.4) { lp_callback(6, 1); }
}

// Полностью замените строчку ниже, точно такой же строчкой из ЛК Pushflow
// (function (d, t){ var s=d.createEle....
```

Чтобы данный скрипт заработал, нам нужно скопировать сгенерируемый код из ЛК Pushflow и заменить в нем функцию pushflowCallback на пример выше.

На этом со сбором эвентов закончим и перейдем к настройке формул в самом Binom.

## Формулы в Binom

После передачи эвентов в бином нам нужно создать столбцы для отображения переданных данных. Для этого идем в трэкер в раздел «Настройки > Статистика > Колонки». 

### Кастомный **LP CTR**

Первое, что мы сделаем, это добавим новую формулу LP CTR. Стандартная формула выглядит как lp_clicks/clicks*100. Во-первых, логично видеть LP CTR только по кликам, у которых прогрузилась страница (т.е. пользователь увидел, что ему предлагается и дошел до конца), во-вторых, нам неинтересно, когда LP CTR прокликивают боты и тем самым его завышают, их из этой формулы логично удалить. 

**Новая формула звучать будет так:** 

(ЛП клики-боты)/(загрузка страницы-боты)*100

Под ботами мы можем понимать 100% ботов или подозрительных пользователей, т.е. event_5 или event_6, тут уже выбирает каждый сам, мы остановимся на event_6 (100% бот).

**Итоговая формула в бином:**
``((lp_clicks-event_6)/(event_1-event_6))*100``

### Loaded, %

Наш ключевой эвент загрузки страницы у пользователя:

**Итоговая формула в бином:**
``event_1/clicks*100``

### 3s и 12s

Пользователь провел 3 секунды на сайте. **Здесь нужно заметить**, что event_2 мы делим не на все клики, а только на те, у кого страница загрузилась, т.е. на event_1

**Итоговая формула для 3s в бином:**
``event_2/event_1*100``

**Итоговая формула для 12s в бином:**
event_3/event_1*100

### Scroll

**Итоговая формула в бином:**

``event_4/event_1*100``

### Quality

В event_5 мы передавали значение 1 для всех подозрительных пользователей: кто использует впн или прокси, у кого браузер не проходит те или иные проверки на живого пользователя и т.д. Делаем формулу, которая будет показывать, сколько нормальных пользователей у вас осталось.

**Итоговая формула в бином:**

``100-event_5/event_1*100``

### Bots

Клики, в ком мы точно уверены, что это мусорный трафик. Если в этот эвент мы еще передаем с серверной клоаки, тогда нужно делить event_6 на все клики, если только из скрипта оценки качества, тогда на event_1. Мы передаем и серверную клоаку, поэтому делим на все клики.

**Итоговая формула в бином:**

``event_6/clicks*100``

### Usage

Имея все собранные данные, можем попробовать вывести абстрактную формулу, которая будет показывать заинтересованность пользователя в конкретном прилендинге. Для этого возьмем соотношения таких параметров как: 3 секунды на приленде, скролл, пробивка приленда (пробивка приленда — важный показатель, поэтому ему сделаем коэффициент x2). Сложим все эти параметры, разделим на их количество, умножим на 10, чтобы было красиво. Выйдет довольно субъективный, но полезный показатель, по которому можно увидеть сильно выбивающиеся из общей картины площадки и источники трафика.

**Итоговая формула в бином:**

``(event_2/event_1+event_4/event_1+((lp_clicks-event_6)/(event_1-event_6))*2)/3*10``

### Not Unique, %

Бонусом еще добавим % не уникальных пользователей (почему-то в стандартном биноме этого нет):
``(clicks-unique_clicks)/clicks*100``

## **Финальный скрипт**

Ниже представлен скрипт, в котором нужно заменить:

1. tracker_url на ссылку с доменом вашего трэкера
2. Вставить сгенерируемый код из ЛК Pushflow и заменить в нем функцию pushflowCallback на функцию из нашего примера.

```jsx
// Замените на урл на URL вашего трэкера, без / в конце
var tracker_url = 'https://youtrackerurl.com';

function lp_callback(eventNumber, value) {
  var o = document.createElement("img");
  if (typeof window['getUclick'] === 'function') {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value + '&uclick=' + getUclick();
  } else {
    o.src = tracker_url + '/click.php?event' + eventNumber + '=' + value;
  }
}

window.addEventListener("DOMContentLoaded", function () {
	// Эвент загрузки страницы
	lp_callback(1,1);

	// Эвент 3 секунд
  setTimeout(function () {
    lp_callback(2, 1)
  }, 3 * 1000);

	// Эвент 12 секунд
  setTimeout(function () {
    lp_callback(3, 1)
  }, 12 * 1000);
});

// Эвент скрола
var scroll = 0;
window.onscroll = function () {
  if (scroll != 1) {
    scroll = 1;
    lp_callback(4, 1)
  }
};

function pushflowCallback(result) {
	// Всех клики с качеством меньше 1 записываем в подозрительных, event5
  if (result.quality < 1) { lp_callback(5, 1); }

	// Всех клики с качеством меньше или равным 0.4 записываем в ботов, event6
  if (result.quality <= 0.4) { lp_callback(6, 1); }
}

// Полностью замените строчку ниже, точно такой же строчкой из ЛК Pushflow
// (function (d, t){ var s=d.createEle....
```

Далее берем получившийся код, идем на [https://javascript-minifier.com/](https://javascript-minifier.com/), где мы его минифицируем, получившийся код заворачиваем в тэг <script></script> и вставляем все это к себе на прилендинг внутри тэга <header></header>.

Должно получится что-то вроде (приведенный код ниже не рабочий, читайте выше, что нужно сделать):

```jsx
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="utf-8">
		<title></title>
		<meta name="description" content="">
		<meta name="author" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="">
		<script>
			var tracker_url="https://youtrackerurl.com";function lp_callback(c,l){var t=document.createElement("img");"function"==typeof window.getUclick?t.src=tracker_url+"/click.php?event"+c+"="+l+"&uclick="+getUclick():t.src=tracker_url+"/click.php?event"+c+"="+l}window.addEventListener("DOMContentLoaded",function(){lp_callback(1,1),setTimeout(function(){lp_callback(2,1)},3e3),setTimeout(function(){lp_callback(3,1)},12e3)});var scroll=0;function pushflowCallback(c){c.quality<1&&lp_callback(5,1),c.quality<=.4&&lp_callback(6,1)}window.onscroll=function(){1!=scroll&&(scroll=1,lp_callback(4,1))};
		</script>
	</head>
<body>
```