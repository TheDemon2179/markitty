# Markitty

Веб-сайт **Markitty** — это простой и удобный Markdown редактор с предпросмотром в реальном времени и дополнительными функциями для форматирования текста, особенно полезными для подготовки документов в стиле Markdown.

## Функциональность

**Общие возможности:**

- **Редактор Markdown:** Введите текст в формате Markdown в текстовое поле, и предпросмотр HTML отобразится в режиме реального времени.
- **Предпросмотр HTML:** Мгновенное отображение отрендеренного HTML кода на основе введенного Markdown.
- **Темная/Светлая тема:** Переключение между темной и светлой темами для комфортной работы в любое время суток. Тема сохраняется в браузере.
- **История редактирования:** Навигация по истории введенного текста "Назад" и "Вперед" (до 5 последних версий). История сохраняется в браузере.
- **Копирование для Word:** Кнопка "Скопировать для Word" позволяет скопировать отрендеренный HTML в буфер обмена, для вставки в Microsoft Word с сохранением форматирования.
- **Удаление строк по выделенному тексту:** Выделите текст в предпросмотре и нажмите на плавающую кнопку "Удалить строки с этим текстом", чтобы удалить все строки из исходного Markdown, содержащие выделенный текст.

**Настройки форматирования:**

Блок "Настройки форматирования" предоставляет следующие опции для кастомизации обработки Markdown:

- **Преобразовывать '-' в список:** Включает/отключает автоматическое преобразование строк, начинающихся с `-`, в маркированные списки. При отключении маркеры `-` будут отображаться как обычный текст с переносом строки для каждого элемента.
- **Преобразовывать '1.' в список:** Включает/отключает автоматическое преобразование строк, начинающихся с `1.`, `2.` и т.д., в нумерованные списки. При отключении нумерация будет отображаться как обычный текст с переносом строки для каждого элемента.
- **Маленькая буква в начале элемента списка:** При включении, первая буква каждого элемента списка будет автоматически преобразована в строчную.
- **Маленькая буква после ':' в списках:** При включении, первая буква после двоеточия в элементах списка будет автоматически преобразована в строчную (игнорирует символы Markdown, такие как `**`, `_` и т.п.).
- **Заменять '.' на ';' в списках (кроме последнего):** При включении, точки в конце всех элементов списка, кроме последнего в блоке списка, будут заменены на точки с запятой.
- **Добавить в конце строк списка:** Выпадающий список позволяет выбрать символ пунктуации (точка, запятая, точка с запятой) для добавления в конце каждой строки списка. Опция "Нет" отключает добавление пунктуации.
- **Отключить форматирование \`\`\`блоков кода\`\`\`:** При включении, блоки кода, обозначенные тройными обратными кавычками (\`\`\`), будут отображаться как обычный текст, без применения стиля кода.
- **Применять стиль к \`инлайн-коду\`:** Включает/отключает применение специального стиля (моноширинный шрифт, фон) к тексту, заключенному в одинарные обратные кавычки (\`код\`). При отключении, инлайн-код будет отображаться с обычным шрифтом.
- **Рамки таблиц:** Выпадающий список позволяет выбрать стиль рамок для таблиц, отображаемых в предпросмотре и при копировании в Word:
  - **Нет рамок (Word):** Таблицы отображаются без рамок в предпросмотре и в Word (по умолчанию Markdown стиль).
  - **Все рамки:** Отображает все внутренние и внешние рамки таблицы.
  - **Только внешние:** Отображает только внешнюю рамку таблицы.
  - **Шапка + внешние:** Отображает внешнюю рамку таблицы и нижнюю границу для шапки таблицы (тег `<th>`).
- **Убрать отступы слева (подавить табуляцию):** При включении, весь текст в предпросмотре будет выровнен по левому краю, убирая стандартные отступы для абзацев, списков и других элементов.
- **Выравнивание по ширине:** При включении, текст в предпросмотре будет выровнен по ширине страницы для более равномерного вида.

## Использование

1.  **Ввод Markdown:** Введите ваш текст в формате Markdown в текстовое поле "Введите Markdown здесь...".
2.  **Предпросмотр:** Предпросмотр отрендеренного HTML будет отображаться в блоке ниже в режиме реального времени.
3.  **Настройка форматирования:** Используйте чекбоксы и выпадающие списки в блоке "Настройки форматирования", чтобы настроить обработку Markdown по вашему вкусу. Изменения настроек применяются немедленно.
4.  **Копирование:** Нажмите кнопку "Отобразить Markdown" для финального рендеринга с текущими настройками (также сохраняет историю). Нажмите кнопку "Скопировать для Word", чтобы скопировать HTML в буфер обмена для вставки в Word.
5.  **История:** Используйте кнопки "← Назад" и "Вперёд →" для навигации по истории введенного Markdown текста.
6.  **Удаление строк:** Выделите текст в предпросмотре, чтобы активировать кнопку "Удалить строки с этим текстом" и удалите строки, содержащие выделенный фрагмент.
7.  **Темная тема:** Переключите тему сайта с помощью кнопки "Темная тема" / "Светлая тема" в верхнем правом углу.

## Сохранение настроек

Все настройки, включая выбранную тему, текст в редакторе и опции форматирования, сохраняются в локальном хранилище браузера (localStorage) и будут восстановлены при следующем открытии страницы.

---

<br>

# Markitty (English)

**Markitty** is a simple and user-friendly Markdown editor with a live preview and additional features for text formatting, especially useful for preparing Markdown-style documents.

## Functionality

**General Features:**

- **Markdown Editor:** Enter text in Markdown format in the text area, and an HTML preview will be displayed in real-time.
- **HTML Preview:** Instant display of rendered HTML code based on the entered Markdown.
- **Dark/Light Theme:** Switch between dark and light themes for comfortable work at any time of the day. The theme is saved in the browser.
- **Edit History:** Navigate through the history of entered text "Back" and "Forward" (up to 5 recent versions). History is saved in the browser.
- **Copy for Word:** The "Copy for Word" button allows you to copy the rendered HTML to the clipboard for pasting into Microsoft Word while preserving formatting.
- **Delete Lines by Selected Text:** Select text in the preview and click the floating "Delete lines with this text" button to remove all lines from the original Markdown that contain the selected text.

**Formatting Settings:**

The "Formatting Settings" section provides the following options to customize Markdown processing:

- **Process '-' as list:** Enables/disables automatic conversion of lines starting with `-` into bulleted lists. When disabled, `-` markers will be displayed as plain text with a line break for each item.
- **Process '1.' as list:** Enables/disables automatic conversion of lines starting with `1.`, `2.`, etc., into numbered lists. When disabled, numbering will be displayed as plain text with a line break for each item.
- **Lowercase letter at list item start:** When enabled, the first letter of each list item will be automatically converted to lowercase.
- **Lowercase letter after ':' in lists:** When enabled, the first letter after a colon in list items will be automatically converted to lowercase (ignores Markdown formatting symbols like `**`, `_`, etc.).
- **Replace '.' with ';' in lists (except last):** When enabled, periods at the end of all list items, except for the last one in a list block, will be replaced with semicolons.
- **Add punctuation at the end of list items:** A dropdown list allows you to select a punctuation mark (period, comma, semicolon) to add at the end of each list item line. The "None" option disables adding punctuation.
- **Disable \`\`\`code block\`\`\` formatting:** When enabled, code blocks denoted by triple backticks (\`\`\`) will be displayed as plain text, without code styling.
- **Apply style to \`inline code\`:** Enables/disables applying a special style (monospace font, background) to text enclosed in single backticks (\`code\`). When disabled, inline code will be displayed with the default font.
- **Table Borders:** A dropdown list allows you to select the border style for tables displayed in the preview and when copying to Word:
  - **No borders (Word):** Tables are displayed without borders in the preview and in Word (default Markdown style).
  - **All borders:** Displays all internal and external table borders.
  - **Outer borders only:** Displays only the outer table border.
  - **Header + outer:** Displays the outer table border and a bottom border for the table header (`<th>` tag).
- **Remove left indentation (suppress tabulation):** When enabled, all text in the preview will be aligned to the left edge, removing standard indents for paragraphs, lists, and other elements.
- **Justify text:** When enabled, the text in the preview will be justified to the page width for a more uniform appearance.

## Usage

1.  **Enter Markdown:** Type your text in Markdown format in the "Enter Markdown here..." text area.
2.  **Preview:** The rendered HTML preview will be displayed in the block below in real-time.
3.  **Formatting Settings:** Use the checkboxes and dropdown lists in the "Formatting Settings" section to customize Markdown processing to your liking. Settings changes are applied immediately.
4.  **Copying:** Click the "Render Markdown" button for final rendering with current settings (also saves history). Click the "Copy for Word" button to copy the HTML to the clipboard for pasting into Word.
5.  **History:** Use the "← Back" and "Forward →" buttons to navigate through the history of entered Markdown text.
6.  **Delete Lines:** Select text in the preview to activate the "Delete lines with this text" button and delete lines containing the selected fragment.
7.  **Dark Theme:** Switch the site theme using the "Dark Theme" / "Light Theme" button in the top right corner.

## Settings Saving

All settings, including the selected theme, text in the editor, and formatting options, are saved in the browser's local storage (localStorage) and will be restored the next time you open the page.
