---
title: Сбор подписок в фид
---



## 1. Установка Service Worker
В первую очередь, независимо от выбранного вами способа интеграции, вам нужно скачать Service Worker файл со страницы Фида и загрузить его в корневую директорию вашего веб-сервера, на котором вы планируете производить сбор подписок. Т.е. сервис воркер должен быть доступен по адресу https://yourdomain.com/sw-pushflownet.js


## 2. Выбор способа интеграции
### Интеграция Javascript скрипта 
Подойдет для интеграции в действующий веб-сайт. Нужно скопировать сгенерированный код и вставить его в конец веб-страницы перед закрывающимся ```</body>``` тэгом.

#### Настройки 
- ***Спрашивать подписку при загрузке страницы*** — запрос подписки будет производится через 1.8 секунды после того, как страница будет загружена. Вы можете изменить это значение, [подробнее об Pushflow SDK](/ru/sdk)

#### Запуск скрипта 
Если вы хотите запускать скрипт по какому-либо действию, например, по клику на какую-либо кнопку, то после интеграции скрипта нужно вызывать JS-функцию ```PushflowSDK.askSubscription()```, после чего у пользователя появится окно запроса пуш-подписки.

Например, если вы хотите вызвать окно подписки по клику на кнопку, то можно добавить вызов функции на ```onclick``` событие, например, так:
``` 
<div onclick="PushflowSDK.askSubscription()">Subscribe</div>
```

или же, если вы интегрируете в уже существующий JS-код, то вызов функции может выглядеть так:
```
function cta() {
  <!-- Some code goes here -->
  PushflowSDK.askSubscription();
}
```




### Готовые HTML-шаблоны
Просто скачайте шаблон и разместите у себя на веб-сервере. У пользователей будет произведен запрос подписки через 1.8 секунды, после загрузки страницы.
