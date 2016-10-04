// ==UserScript==
// @name            Brchan Rusifikator
// @version         3.2.4
// @namespace       https://brchan.org/*
// @author          Y0ba, Isset, pngcrypt
// @updateURL       https://raw.github.com/Isseq/Brchanrus.user.js/master/Brchanrus.meta.js
// @run-at          document-start
// @grant           none
// @include         https://brchan.org/*
// @include         http://brchan.org/*
// @include         https://www.brchan.org/*
// @include         http://www.brchan.org/*
// @nocompat        Chrome
// ==/UserScript==

const TYPE_FIRSTNODE = 0;
const TYPE_LASTNODE = 1;

/* cfg = [
	[ /url-regexp/, [
		["replacer_type", "selector", "search-text", "replace-text", true],
		[.....]
	]],

	[.....]
]

	url-regexp: regexp for url match (search in path, not domain), root url is: /

	replacer_type:
		css
		txt - inner text
		reg - regexp
		att - attribute

	selector: css selector

	search-text:
		for css: is replace-text
		for txt: type of node (TYPE_FIRSTNODE or TYPE_LASTNODE without quotes!)
		for reg: regexp for search
		for att: name of tag's attribute

	replace-text:
		for css: - (not needed)
		for txt,reg,att: text for replace

	true
		required for regex replace, true = replace as html
*/

cfg = [

	// Общие переводы (для всех url)
	[/^/, [
		// Панель меню
		['txt', 'div.boardlist > span > a[href="/"]', TYPE_LASTNODE, ' Главная'],
		['txt', 'div.boardlist > span > a[href="/boards.html"]', TYPE_LASTNODE, ' Список досок'],
		['txt', 'div.boardlist > span > a[href="/random.php"]', TYPE_LASTNODE, ' На случайную доску'],
		['txt', 'div.boardlist > span > a[href="/create.php"]', TYPE_LASTNODE, ' Создать доску'],
		['txt', 'div.boardlist > span > a[href="/mod.php"]', TYPE_LASTNODE, ' Админка'],
		['txt', 'div.boardlist > span > a[href="/bugs.php"]', TYPE_LASTNODE, ' Сообщить об ошибке'],
		['css', 'body > div > a[title="Opções"]', '[Настройки]'],

		['reg', 'div.options_tab > div > fieldset > legend', 'Formatting Options', 'Опции форматирования'],
		['reg', 'div.options_tab > div > fieldset > legend', 'Image hover', 'Всплывающие озображения'],

		[]
	]],

	// Любая доска / тред 
	[/^(mod\.php\?\/|)\w+(\/?$|\/.+\.html)/, [
		['reg', 'div.subtitle > p > a', /Catálogo|Catalog/, 'Каталог тредов'],
		['reg', 'p.intro > a', /Últimas (\d+) Mensagens/, 'Последние $1 сообщений'],

		['reg', 'time', '(Seg)', '(Пнд)'],
		['reg', 'time', '(Ter)', '(Втр)'],
		['reg', 'time', '(Qua)', '(Срд)'],
		['reg', 'time', '(Qui)', '(Чтв)'],
		['reg', 'time', '(Sex)', '(Птн)'],
		['reg', 'time', '(Sáb)', '(Сбт)'],
		['reg', 'time', '(Dom)', '(Вск)'],

		// Посты
		['css', 'span.name', 'Аноним'],
		['txt', 'p.fileinfo', TYPE_FIRSTNODE, 'Файл: '],
		['css', 'a#link-quick-reply', '[Ответить]'],

		// Форма ответа
		['reg', 'table.post-table > tbody > tr > th', 'Nome', 'Имя'],
		['reg', 'table.post-table > tbody > tr > th', 'Opções', 'Опции'],
		['reg', 'table.post-table > tbody > tr > th', 'Assunto', 'Тема/Имя'],
		['reg', 'table.post-table > tbody > tr > th', 'Mensagem', 'Сообщение'],
		['reg', 'table.post-table > tbody > tr > th', 'Verificação', 'Капча'],
		['css', 'table.post-table > tbody > tr > td > div.captcha_html', 'кликните сюда для показа'],
		['reg', 'table.post-table > tbody > tr > th', 'Arquivo', 'Файл'],
		['css', 'div.file-hint', 'кликни / брось файл сюда'],
		['css', 'span.required-wrap > span.unimportant', '= обязательные поля'],
		['css', 'a.show-post-table-options', '[Показать опции]'],
		['att', 'input[name="post"]', 'value', 'Отправить'],
		['css', 'tr#oekaki > th', 'Рисовать'],
		['css', 'tr#upload_embed > th', 'Ссылка на YouTube'],
		['css', 'tr#options-row > th', 'Опции'],

		['reg', 'tr#oekaki > td > a', 'Mostrar oekaki', 'Начать'],
		['reg', 'tr#oekaki > td > span.unimportant', 'substitui arquivos', 'заменяет файл'],
		['reg', 'tr#upload_embed > td > span.unimportant', 'substitui arquivos', 'заменяет файл'],
		['reg', 'tr#options-row > td > div.no-bump-option > label', 'Não bumpar', 'Не поднимать тред (сажа)', true],
		['reg', 'tr#options-row > td > div.spoiler-images-option > label', 'Imagem spoiler', 'Скрыть превью изображения', true],

		// Навигация по страницам
		['reg', 'body > div.pages', 'Anterior', 'Предыдущая', true],
		['reg', 'body > div.pages', 'Próxima', 'Следующая', true],
		['reg', 'body > div.pages', 'Catálogo', 'Каталог', true],

		['reg', 'p.intro > a', 'Responder', 'Ответить'],

		['reg', 'span.toolong', /Mensagem muito longa. Clique <a href="(.*)">aqui<\/a> para ver o texto completo\./, 'Сообщение слишком длинное. Нажмите <a href="$1">здесь</a> чтобы увидеть полный текст.', true],
		['reg', 'div.post > span.omitted', /(\d+) mensagens e (\d+) resposta. com imagem omitida.+/, 'Пропущено ответов: $1 (с изображениями: $2). Нажмите ответить, чтобы посмотреть.'],
		['reg', 'div.post > span.omitted', /(\d+) mensagens omitidas?.*/, ' Пропущено ответов: $1. Нажмите ответить, чтобы посмотреть.'],

		['css',	'a#thread-return',	'[Назад]'],
		['css',	'a#thread-top',		'[Вверх]'],
		['css',	'a#thread-catalog',	'[Каталог]'],

		[]
	]],

	// Ошибки постинга
	[/^post\.php/, [
		['reg', 'head > title', 'Erro', 'Ошибка'],
		['reg', 'header > h1', 'Erro', 'Ошибка', true],
		['reg', 'header > div.subtitle', 'Um erro ocorreu', 'Произошла ошибка'],
		['reg', 'body > div > h2', 'IP detectado como proxy, proxies nao sao permitidos nessa board\. Se voce acha que essa mensagem e um erro entre em contato com a administracao', 'На этом IP обнаружен прокси. Прокси запрещены на этой доске. Если вы считаете, что произошла ошибка, свяжитесь с администрацией'],

		[]
	]],

	// Страница каталога доски
	[/^\w+\/catalog\.html$/, [
		['reg', 'head > title', 'Catalog', 'Каталог'],
		['txt', 'header > h1', TYPE_FIRSTNODE, 'Каталог тредов ('],
		['reg', 'span', 'Ordenar por: ', 'Сортировка по: ', true],
		['css', 'select#sort_by > option[value="bump:desc"]', 'Активности'],

		[]
	]],

	// Список досок
	[/^boards\.html/, [
		// Статистика
		['css', 'main > section > h2', 'Статистика'],
		['reg', 'main > section > p', /Há atualmente (.+) boards públicas, (.+) no total. Na última hora foram feitas (.+) postagens, sendo que (.+) postagens foram feitas em todas as boards desde/, 'В настоящее время доступно $1 публичных досок из $2. За последнюю минуту написано $3 постов. Высего было написано $4 постов начиная с', true],
		['reg', 'main > section > p', 'Última atualização desta página', 'Последнее обновление страницы'],

		// Панель поиска
		['css', 'aside > form > h2', 'Поиск'],
		['reg', 'aside > form label.search-item.search-sfw', 'Ocultar', 'Скрыть', true],
		['att', 'input#search-title-input', 'placeholder', 'Поиск названия...'],
		['att', 'input#search-tag-input', 'placeholder', 'Поиск тэгов...'],
		['css', 'button#search-submit', 'Искать'],

		// Таблица списка досок
		['css', 'th.board-uri', 'Доска'],
		['css', 'th.board-title', 'Название'],
		['css', 'th.board-pph', 'п/ч'],
		['css', 'th.board-unique', 'IP за 72ч'],
		['css', 'th.board-tags', 'Тэги'],
		['css', 'th.board-max', 'Постов'],

		[]
	]],

	// Создание доски
	[/^create\.php/, [
		['css', 'head > title', 'Создание доски'],
		['css', 'header > h1', 'Создание доски'],
		['css', 'header > div.subtitle', 'создание пользовательской доски'], // ??? antes que alguém a crie

		['reg', 'table.modlog > tbody > tr > th', 'URI', 'URL'],
		['reg', 'table.modlog > tbody > tr > th', 'Título', 'Название'],
		['reg', 'table.modlog > tbody > tr > th', 'Subtítulo', 'Описание'],
		['reg', 'table.modlog > tbody > tr > th', 'Usuário', 'Логин'],
		['reg', 'table.modlog > tbody > tr > th', 'Senha', 'Пароль'],

		['reg', 'table.modlog > tbody > tr > td > span', /letras, números e no máximo (\d+) caracteres/, 'буквы, цифры и не более $1 символов'],
		['reg', 'table.modlog > tbody > tr > td > span', /até (\d+) caracteres/, 'до $1 символов'],
		['reg', 'table.modlog > tbody > tr > td > span', 'letras, numeros, pontos e sublinhados', 'буквы, цифры, точки и подчеркивание'],
		['reg', 'table.modlog > tbody > tr > td > span', 'senha para moderar a board, copie-a', 'пароль для модерирования, сохраните его'],
		['reg', 'table.modlog > tbody > tr > td > span', 'opcional,serve para recuperar sua board', 'по желанию, служит для восстановления доски'],

		['att', 'input[type="submit"]', 'value', 'Создать доску'],

		// Ошибки создания / сообщения
		['reg', 'body > div > h2', 'URI inválida', 'Неверный URL'],
		['reg', 'body > div > h2', 'Usuário inválido', 'Недействительный пользователь'],
		['reg', 'body > div > h2', 'A board já existe', 'Доска уже существует'],
		['reg', 'body > div > h2', 'Você errou o codigo de verificação', 'Неверный код подтверждения'],

		['reg', 'body > div > p > a', 'Voltar', 'Назад'],

		['reg', 'body > p', 'Sua board foi criada e está disponível em', 'Ваша доска была создана и доступна по адресу', true],
		['reg', 'body > p', 'Certifique-se de não esquecer a senha de sua board', 'Убедитесь в том, чтобы не забыть пароль к доске', true],
		['reg', 'body > p', 'Você pode gerenciar sua board nessa página', 'Вы можете управлять вашей доской на этой странице', true],

		[]
	]],

	// Любая доска / тред под модеркой
	[/^mod\.php\?\/\w+(|\/|\/.+\.html)$/, [
		// кнопки модерирования
		[]
	]],


	// Админка - логин / ошибки
	[/^mod\.php\b/, [
		['reg', 'header > h1', /Login/, 'Вход'],
		['reg', 'table > tbody > tr > th', /Usuário/, 'Логин'],
		['reg', 'table > tbody > tr > th', /Senha/, 'Пароль'],
		['att', 'input[name="login"]', 'value', 'Войти'],		

		// Ошибки
		['reg', 'header > h1', /Erro/, 'Ошибка', true],
		['reg', 'header > div.subtitle', /Um erro ocorreu/, 'Произошла ошибка'],
		['reg', 'body > div > h2', /Pagina não encontrada/, 'Страница не найдена'],

		['reg', 'div.subtitle > p > a', 'Voltar à dashboard', 'Назад к панели управления'],

		[]
	]],

	// Админка - Главная
	[/^mod\.php\?\/$/, [
		['reg', 'header > h1', 'Dashboard', 'Панель администрирования'],
		['reg', 'fieldset > legend', 'Mensagens', 'Сообщения'],
		['reg', 'fieldset > ul > li', 'Quadro de noticias', 'Доска объявлений', true],
		['reg', 'fieldset > ul > li > ul > li > a', 'Comunicado', 'Коммуникация'],
		['reg', 'fieldset > ul > li > a', 'Ver todas as noticias do quadro de noticias', 'Просмотр всех новостей'],
		['reg', 'fieldset > ul > li > a', /Caixa de entrada \((\d+) unread\)/, 'Входящие (непрочитанных: $1)'],

		['reg', 'fieldset > legend', 'Administração', 'Администрирование'],
		['reg', 'fieldset > ul > li  a', /Fila de denuncias \((\d+)\)/, 'Поступившие жалобы ($1)'],
		['reg', 'fieldset > ul > li > a', 'Lista de bans', 'Список банов'],
		['reg', 'fieldset > ul > li > a', 'Apelos a banimento', 'Аппеляции банов'],
		['reg', 'fieldset > ul > li > a', 'Editar conta', 'Изменить учетную запись'],
		['reg', 'fieldset > ul > li > span', 'nome de usuário, email, senha', 'имя пользователя, адрес электронной почты, пароль'],
		['reg', 'fieldset > ul > li > a', 'Histórico da board', 'История доски'],
		['reg', 'fieldset > ul > li > a', 'Mensagens recentes', 'Последние сообщения'],

		['reg', 'fieldset > legend', 'Boards', 'Доски'],
		['reg', 'fieldset > ul > li > a', 'configurações', 'настройки'],

		['reg', 'fieldset > legend', 'Conta de usuário', 'Учетная запись'],
		['reg', 'fieldset > ul > li > a', 'Logout', 'Выход'],

		[]
	]],

	// Админка - Жалобы
	[/^mod\.php\?\/reports\/?$/, [
		['reg', 'head > title', /Fila de denuncias\s+\((\d+)\)/, 'Поступившие жалобы ($1)'],
		['reg', 'header > h1', /Fila de denuncias \((\d+)\)/, 'Поступившие жалобы ($1)'],
		['att', 'h2.report-header > a', 'title', 'Перейти в тред'],
		['reg', 'h2.report-header', /responder repotado (\d+) vez\(es\)/, 'жалоб на пост: $1', true],
		['reg', 'h2.report-header', /thread repotado (\d+) vez\(es\)/, 'жалоб на тред: $1', true],

		['reg', 'ul.report-actions > li.report-action > a', 'Dismiss', 'Отклонить'],
		['reg', 'ul.report-actions > li.report-action > a', 'Promote', 'Принять'],

		['reg', 'ul.report-content-actions > li.report-content-action', /Descartar todas denúncias a esse conteúdo(.+>)Dismiss All/, 'Отклонить все жалобы к этому посту$1Отклонить все', true],
		['reg', 'ul.report-content-actions > li.report-action', /Promover todas denúncias locais para globais(.+>)Promote All/, 'Передать все жалобы к этому посту в глобальные$1Принять все', true],
		['reg', 'ul.report-content-actions > li.report-content-action', /Clean(.+")Ignorar e descartar denúncias locais dessa mensagem nessa board/, 'Очистить$1Игнорировать и удалить все местные жалобы в этом треде', true], // "

		['reg', 'body > p.unimportant', 'Não há denúncias no momento', 'На данный момент никаких жалоб нет'],

		[]
	]],

	// Админка - Настройка доски
	[/^mod\.php\?\/settings\//, [
		['css', 'head > title', 'Настройки доски'],
		['reg', 'header > h1', 'Configuração da board', 'Настройки доски'],
		['css', 'body > p', 'Внимание: Некоторые изменения не вступят в силу до тех пор, пока не будет написан новый пост на доске.'],

		['reg', 'table > tbody > tr > th', 'URI', 'URL'],
		['reg', 'table > tbody > tr > th', 'Título', 'Название'],
		['reg', 'table > tbody > tr > th', 'Subtítulo', 'Описание'],
		['reg', 'table > tbody > tr > td', 'não pode ser alterado', 'не может быть изменен'],
		['reg', 'table > tbody > tr > th', 'Tipo de board', 'Тип доски'],
		['reg', 'table > tbody > tr > th', /Imagens personalizadas(.+)Marcando essa opção você poderá usar imagens spoiler\/sem-arquivo\/deletado customizadas.+Certifique-se de fazer upload das imagens na página 'imagens customizadas' ou você terá.+erros 404 na sua board/, 'Пользовательские изображения$1Включив эту опцию вы можете использовать кастомные изображения спойлера / нет файла / удалено.<br>Убедитесь в том, что пользовательские изображения загружены, иначе будете получать ошибку 404', true],
		['reg', 'table > tbody > tr > th', 'Embutir YouTube/Vocaroo', 'Разрешить YouTube/Vocaroo'],
		['reg', 'table > tbody > tr > th', 'Exigir que o OP poste uma imagem', 'При создании нового треда изображение обязательно'],
		['reg', 'table > tbody > tr > th', 'Exigir que o OP crie um assunto', 'При создании нового треда поле "Тема" обязательно'],
		['reg', 'table > tbody > tr > th', 'Mostrar IDs dos usuários', 'Показать идентификаторы пользователей'],
		['reg', 'table > tbody > tr > th', 'Mostrar SAGE! em mensagens com sage', 'Показать SAGE! у постов с сажей'],
		['reg', 'table > tbody > tr > th', /Desabilitar caracteres compostos \("Zalgo", texto vietnamita\)/, 'Запретить составные символы ("Zalgo", вьетнамский текст)'], // "
		['reg', 'table > tbody > tr > th', /Ocultar board(.+)Marcando essa opção sua board não aparecer na página de boards/, 'Скрыть доску$1Если эта опция включена, доска не отображается в списке', true],

		['att', 'input#wf_add', 'value', 'Добавить еще фильтр'],
		['att', 'input[value="Salvar alterações"]', 'value', 'Сохранить изменения'],
		
		[]
	]],

	[]
];

// ==============================================================================================
// переменные локализации (для скриптов: настройки, быстрый ответ, и т.п.) 
// ==============================================================================================
var l10n_rus = {
	"Style: ": "Стиль: ",
	"File": "Файл",
	"hide": "скрыть",
	"show": "показать",
	"Show locked threads": "Показать закрепленные треды",
	"Hide locked threads": "Скрыть закрепленные треды",
	"URL": "URL",
	"Select": "Select",
	"Remote": "Remote",
	"Embed": "Embed",
	"Oekaki": "Oekaki",
	"hidden": "hidden",
	"Show images": "Показать изображения",
	"Hide images": "Скрыть изображения",
	"Password": "Пароль",
	"Delete file only": "Удалить только файл",
	"Delete": "Удалить",
	"Reason": "Причина",
	"Report": "Жалоба",
	"Global report": "Жалоба администраторам",
	"Click reply to view.": "Нажмите ответ для просмотра",
	"Click to expand": "Нажмите для раскрытия",
	"Hide expanded replies": "Скрыть раскрытые ответы",
	"Brush size": "Размер кисти",
	"Set text": "Set text",
	"Clear": "Очистить",
	"Save": "Сохранить",
	"Load": "Загрузить",
	"Toggle eraser": "Toggle eraser",
	"Get color": "Get color",
	"Fill": "Заливка",
	"Use oekaki instead of file?": "Use oekaki instead of file?",
	"Edit in oekaki": "Edit in oekaki",
	"Enter some text": "Enter some text",
	"Enter font or leave empty": "Enter font or leave empty",
	"Forced anonymity": "Анонимное имя вместо пользовательских",
	"enabled": "enabled",
	"disabled": "disabled",
	"Sun": "Вс",
	"Mon": "Пн",
	"Tue": "Вт",
	"Wed": "Ср",
	"Thu": "Чт",
	"Fri": "Пт",
	"Sat": "Сб",
	"Catalog": "Каталог тредов",
	"Submit": "Отправить",
	"Quick Reply": "Быстрый ответ",
	"Posting mode: Replying to <small>&gt;&gt;{0}<\/small>": "Posting mode: Replying to <small>&gt;&gt;{0}<\/small>",
	"Return": "Вернуться",
	"Expand all images": "Развернуть все изображения",
	"Shrink all images": "Свернуть все изображения",
	"Hello!": "Привет!",
	"{0} users": "{0} пользователей",
	"(hide threads from this board)": "(скрыть этот тред на этой доске)",
	"(show threads from this board)": "(показать этот тред на этой доске)",
	"No more threads to display": "No more threads to display",
	"Loading...": "Загрузка...",
	"Save as original filename": "Сохранить с оригинальным именем",
	"Reported post(s).": "Жалоба отправлена.",
	"An unknown error occured!": "An unknown error occured!",
	"Something went wrong... An unknown error occured!": "Something went wrong... An unknown error occured!",
	"Working...": "Working...",
	"Posting... (#%)": "Отправка... (#%)",
	"Posted...": "Отправлено...",
	"An unknown error occured when posting!": "An unknown error occured when posting!",
	"Posting...": "Отправка...",
	"Upload URL": "Upload URL",
	"Spoiler Image": "Spoiler Image",
	"Comment": "Комментарий",
	"Watch Thread": "В избранное",
	"Stop watching this thread": "Удалить из избранного",
	"Watch this thread": "В избранное",
	"Unpin this board": "Unpin this board",
	"Pin this board": "Pin this board",
	"Stop watching this board": "Stop watching this board",
	"Watch this board": "Watch this board",
	"Click on any image on this site to load it into oekaki applet": "Click on any image on this site to load it into oekaki applet",
	"Sunday": "Воскресенье",
	"Monday": "Понедельник",
	"Tuesday": "Вторник",
	"Wednesday": "Среда",
	"Thursday": "Четверг",
	"Friday": "Пятница",
	"Saturday": "Суббота",
	"January": "Январь",
	"February": "Феврась",
	"March": "Март",
	"April": "Апрель",
	"May": "Май",
	"June": "Июнь",
	"July": "Июль",
	"August": "Август",
	"September": "Сентябрь",
	"October": "Октябрь",
	"November": "Ноябрь",
	"December": "Декабрь",
	"Jan": "Янв",
	"Feb": "Фев",
	"Mar": "Мар",
	"Apr": "Апр",
	"Jun": "Июн",
	"Jul": "Июл",
	"Aug": "Авг",
	"Sep": "Sep",
	"Oct": "Окт",
	"Nov": "Ноя",
	"Dec": "Дек",
	"AM": "AM",
	"PM": "PM",
	"am": "am",
	"pm": "pm",
	"Your browser does not support HTML5 video.": "Your browser does not support HTML5 video.",
	"[play once]": "[play once]",
	"[loop]": "[loop]",
	"WebM Settings": "WebM Settings",
	"Expand videos inline": "Разворачивать видео в посте",
	"Play videos on hover": "Воспроизводить видео при наведении",
	"Default volume": "Громкость по умолчанию",
	"Tree view": "Tree view",
	"Animate GIFs": "Animate GIFs",
	"Unanimate GIFs": "Unanimate GIFs",
	"WebM": "WebM",
	"No new posts.": "No new posts.",
	"No new threads.": "No new threads.",
	"There are {0} new threads.": "There are {0} new threads.",
	"There are {0} new posts in this thread.": "There are {0} new posts in this thread.",
	"Options": "Настройки",
	"General": "Главная",
	"Storage: ": "Хранилище: ",
	"Export": "Экспорт",
	"Import": "Импорт",
	"Paste your storage data": "Paste your storage data",
	"Erase": "Удалить",
	"Are you sure you want to erase your storage? This involves your hidden threads, watched threads, post password and many more.": "Are you sure you want to erase your storage? This involves your hidden threads, watched threads, post password and many more.",
	"User CSS": "User CSS",
	"Update custom CSS": "Update custom CSS",
	"Enter here your own CSS rules...": "Введите сюда CSS-код ваших стилей...",
	"You can include CSS files from remote servers, for example:": "You can include CSS files from remote servers, for example:",
	"User JS": "JS-скрипты",
	"Update custom Javascript": "Update custom Javascript",
	"Enter here your own Javascript code...": "Enter here your own Javascript code...",
	"You can include JS files from remote servers, for example:": "Вы можете подключать JS-файлы с внешних серверов. Например:",
	"Color IDs": "Color IDs",
	"Update": "Обновить",
	"IP address": "IP адрес",
	"Seen": "Seen",
	"Message for which user was banned is included": "Message for which user was banned is included",
	"Message:": "Сообщение:",
	"Board": "Доска",
	"all": "все",
	"Set": "Set",
	" ago": " ago",
	"Expires": "Expires",
	"never": "никогда",
	"in ": "в ",
	"Staff": "Staff",
	"system": "system",
	"Auto": "Автообновление",
	"Updating...": "Обновление...",
	"Thread updated with {0} new post(s)": "Thread updated with {0} new post(s)",
	"No new posts found": "No new posts found",
	"Thread deleted or pruned": "Thread deleted or pruned",
	"Error: ": "Ошибка: ",
	"Unknown error": "Неизвестная ошибка",
	"Page": "Страница",
	"All": "Все",
	"second(s)": "секунд(ы)",
	"minute(s)": "минут(ы)",
	"hour(s)": "часы(ы)",
	"day(s)": "день(ей)",
	"week(s)": "неделя(ль)",
	"year(s)": "год(ы)",
	"Auto update": "Автообновление",
	"Auto update thread": "Автообновление треда",
	"Show desktop notifications when users quote me": "Показывать уведомления, когда пользователи цитируют меня",
	"Show desktop notifications on all replies": "Показывать уведомления на все ответы",
	"Scroll to new posts": "Прокрутка к новым постам",
	"Verification": "Капча",
	"Enable formatting keybinds": "Включить горячие клавиши",
	"Show formatting toolbar": "Показать панель форматирования",
	"Download All": "Скачать всеl",
	"Hide IDs": "Скрыть все ID",
	"Image hover": "При наведении курсора",
	"Image hover on catalog": "При наведении курсора в каталоге тредов",
	"Image hover should follow cursor": "Следуют за курсором",
	"Number of simultaneous image downloads (0 to disable): ": "Количество одновременных загрузок (0 для отключения): ",
	"Error: Invalid LaTeX syntax.": "Error: Invalid LaTeX syntax.",
	"Show relative time": "Показать относительное время",
	"Favorites": "Избранное",
	"Drag the boards to sort them.": "Для сортировки перетаскивайте доски в списке",
	"Note: Most option changes will only take effect on future page loads.": "Примечание: большинство изменений требует перезагрузки страницы.",
	"Theme": "Тема/CSS",
	"Save custom CSS": "Сохранить пользовательский CSS",
	"Board-specific CSS": "Стиль по умолчанию",
	"Style should affect all boards, not just current board": "Применить стиль ко всем доскам, а не только к текущей",
	"These will be applied on top of whatever theme you choose below.": "These will be applied on top of whatever theme you choose below.",
	"Do not paste code here unless you absolutely trust the source or have read it yourself!": "Вставляйте сюда код только если вы абсолютно доверяете источнику или написали его самостоятельно!",
	"Untrusted code pasted here could do malicious things such as spam the site under your IP.": "Ненадежный код может осуществлять вредоностные действия. Например, отправлять спам с вашего IP.",
	"Save custom Javascript": "Сохранить пользовательский скрипт",
	"Enter your own Javascript code here...": "Введите сюда код вашего скрипта...",
	"(You)": "(Вы)",
	"Use tree view by default": "Использовать TreeView по умолчанию",
	"Show top boards": "Показывать ТОП досок",
	"Loop videos by default": "Бесконечное воспроизведение по умолчанию",
	"YouTube size": "Размер YouTube",
	"OK": "OK",
	"Cancel": "Отмена",
	"Hide post options &amp; limits": "Скрыть опции",
	"Show post options &amp; limits": "Показать опции",
	"Enable gallery mode": "Включить режим галереи",
	"Disable gallery mode": "Выключить режим галереи",
	"Hide post": "Скрывать пост",
	"Add filter": "Добавить фильтр",
	"Delete post": "Удалить пост",
	"Delete file": "Удалить файл",
	"Enable inlining": "При клике на ответы разворачивать их в посте",
	"Formatting Options": "Настройки форматирования",
	"Add Rule": "Добавить правило",
	"Save Rules": "Сохранить правила",
	"Revert": "Отмена",
	"Reset to Default": "По умолчанию",
	"Prefix": "Префикс",
	"Name": "Имя",

	// дополнительные (не заданные в бразильской локализации). Имена искать в main.js
	"Hide inlined backlinked posts": "Скрыть встроенные ответы",
	"Drag and drop file selection": "Включить перетаскивание файла",
	"If you want to make a redistributable style, be sure to\nhave a Yotsuba B theme selected.": "Если вы хотите сделать распространяемый стиль, убедитесь, что\nвыбрана тема Yotsuba B",
	"Customize Formatting": "Форматирование",
	"Spoiler": "Спойлер",
	"Italics": "Курсив",
	"Bold": "Жирный",
	"Underline": "Поддчеркивание",
	"Code": "Код",
	"Strike": "Зачеркнутый",
	"Heading": "Заголовок",
	"Filters": "Фильтры",
	"Clear all filters": "Очистить все",
	"Add": "Добавить",
	"Tripcode": "Трипкод",
	"Subject": "Тема",
	"watchlist": "уведомления",
	"Unhide post": "Не скрывать пост",
	"Post +": "Пост +",

	"":""
};

Object.defineProperty(window, "l10n", {
	get: function() {
		return l10n_rus;
	},

	set: function(value) {}
});
// ==============================================================================================
// ==============================================================================================



class CSSReplace {
	constructor(query, text) {
		this.query = query;
		this.text = text;
	}
	replace(element) {
		for(let el of (element ? element : document).querySelectorAll(this.query)) {
			el.textContent = this.text;
		}
	}
}

class AttributeReplace {
	constructor(query, attr, text) {
		this.query = query;
		this.attr = attr;
		this.text = text;
	}
	replace(element) {
		for(let el of (element ? element : document).querySelectorAll(this.query)) {
			el.setAttribute(this.attr, this.text);
		}
	}
}

class InnerTextReplace {
	constructor(query, type, text) {
		this.query = query;
		this.type = type;
		this.text = text;
	}
	replace(element) {
		for(let el of (element ? element : document).querySelectorAll(this.query)) {
			let node;
			switch(this.type) {
				case TYPE_FIRSTNODE: node = el.firstChild; break;
				case TYPE_LASTNODE: node = el.lastChild; break;
			}
			if(node) {
				node.textContent = this.text;
			}
		}
	}
}

class RegexReplace {
	constructor(query, regex, text, prop) {
		this.query = query;
		this.regex = regex;
		this.text = text;
		this.prop = "textContent";
		switch(prop) {
			case true:
			case 1:
				this.prop = "innerHTML";
				break;
			case 2:
				this.prop = "outerHTML";
				break;
		}
	}
	replace(element) {
		for(let el of (element ? element : document).querySelectorAll(this.query)) {
			if(el[this.prop].match(this.regex)) { // проверка, чтобы не ломать html если исходный текст не найден
				el[this.prop] = el[this.prop].replace(this.regex, this.text);
			}
		}
	}
}

class PostingReplace {
	constructor(regex, text) {
		this.regex = regex;
		this.text = text;
	}
	replace(obj) {
		if(obj.text.match(this.regex)) {
			obj.text = obj.text.replace(this.regex, this.text);
			return true;
		}
	}
}

let replacers = [];
let new_posts_replacers = [
	new CSSReplace('span.name', 'Аноним'),
	new InnerTextReplace('p.fileinfo', TYPE_FIRSTNODE, 'Файл: '),
	new RegexReplace('time', '(Seg)', '(Пнд)'),
	new RegexReplace('time', '(Ter)', '(Втр)'),
	new RegexReplace('time', '(Qua)', '(Срд)'),
	new RegexReplace('time', '(Qui)', '(Чтв)'),
	new RegexReplace('time', '(Sex)', '(Птн)'),
	new RegexReplace('time', '(Sáb)', '(Сбт)'),
	new RegexReplace('time', '(Dom)', '(Вск)')
];
let posting_replacers = [
	new PostingReplace('Você errou o codigo de verificação', 'Неверно введен код капчи'),
	new PostingReplace('Você deve postar com uma imagem', 'Для создания треда нужно прикрепить файл или видео'),
	new PostingReplace('Você errou o codigo de verificação', 'Текст слишком мал или отсутствует')
];

// ==============================================================================================
// загрузка конфига
// ==============================================================================================
(function(){
	//return;
	let url = document.URL.replace(/https?:\/\/[^/]+\/(.+)/i, "$1"); // extract url path
	console.debug("URL: ", url);
	let i = performance.now();
	for(let u of cfg)
	{
		if(u.length != 2 || !url.match(u[0])) // checking url match
			continue;

		console.debug('Used: ', u[0]);

		for(let c of u[1])
		{
			let cl=c.length;
			if(!cl)
				continue;

			switch(c[0])
			{
				case "css":
					if(cl == 3)
					{
						replacers.push(new CSSReplace(c[1], c[2]));
						continue;
					}

				case "txt":
					if(cl == 4)
					{
						replacers.push(new InnerTextReplace(c[1], c[2], c[3]));
						continue;
					}
				case "reg":
					if(cl >= 4 && cl <=5 )
					{
						replacers.push(new RegexReplace(c[1], c[2], c[3], cl==5 ? c[4] : false));
						continue;
					}

				case "att":
					if(cl == 4)
					{
						replacers.push(new AttributeReplace(c[1], c[2], c[3]));
						continue;
					}
			}
			console.debug('** Cfg Error: ', c);
		} // for c
	} // for u
	console.debug("Cfg Loaded: ", performance.now() - i, "ms");
})();


// ==============================================================================================
// ==============================================================================================
var doIt = function() {
	let i = performance.now();
	for(let r of replacers) {
		r.replace();
	}
	console.debug('Replace: ', performance.now() - i, "ms");
};

document.onreadystatechange = function () {
	switch (document.readyState) {
		case "loading":
			document.addEventListener('DOMContentLoaded', doIt);
			break;
		case "interactive":
			doIt();
			break;
		case "complete":
			$(document).on('new_post', function(e, post) {
				for(let r of new_posts_replacers) {
					r.replace(post);
				}
			});

			window.alert_orig = window.alert;

			window.alert = function(msg, do_confirm, confirm_ok_action, confirm_cancel_action) {
				console.debug(msg, do_confirm, confirm_ok_action, confirm_cancel_action);
				msg = {text: msg};
				for(let r of posting_replacers) {
					if(r.replace(msg)) break;
				}
				window.alert_orig(msg.text, do_confirm, confirm_ok_action, confirm_cancel_action);
			};
			doIt();
			break;
	}
};