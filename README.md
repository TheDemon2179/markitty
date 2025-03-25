# Конвертер Markdown в Word

Этот проект представляет собой простой веб-инструмент, который позволяет конвертировать текст в формате Markdown в формат HTML, который затем можно легко скопировать и вставить в документы Word.

## Особенности

- **Ввод Markdown:** Текстовое поле, куда вы можете ввести или вставить свой текст в формате Markdown.
- **Предварительный просмотр в реальном времени:** Отображает введенный Markdown в HTML в реальном времени, показывая, как это будет выглядеть.
- **Копировать для Word:** Кнопка для копирования отображенного HTML в буфер обмена, отформатированного для легкой вставки в Microsoft Word.
- **Переключение темы:** Позволяет переключаться между светлой и темной темами для комфортного просмотра и редактирования.
- **Навигация по истории:** Предоставляет кнопки "Назад" и "Вперед" для навигации по истории ваших вводов Markdown (до 5 версий).
- **Контекстное действие:** Кнопка, которая появляется при выделении текста в предварительном просмотре, позволяя удалять строки во вводе, содержащие выделенный текст.
- **Локальное хранилище:** Сохраняет ваши предпочтения темы и последний введенный текст Markdown в локальном хранилище, поэтому ваши настройки и контент сохраняются между сессиями.

## Как использовать

1. **Введите Markdown:** Введите или вставьте свой текст Markdown в текстовое поле.
2. **Отобразить Markdown:** Нажмите кнопку "Отобразить Markdown", чтобы увидеть предварительный просмотр HTML ниже.
3. **Копировать для Word:** Нажмите кнопку "Скопировать для Word", чтобы скопировать HTML в буфер обмена. Затем вы можете вставить это непосредственно в документ Word, сохранив основное форматирование.
4. **Тема:** Используйте кнопку "Темная тема" для переключения между светлой и темной темами.
5. **История:** Используйте кнопки "← Назад" и "Вперёд →" для навигации по истории ввода.
6. **Контекстное действие:** Выделите текст в предварительном просмотре и нажмите кнопку "Удалить строки с этим текстом", чтобы удалить строки, содержащие этот текст, из ввода.

## Файлы в этом проекте

- `index.html`: Главный HTML-файл, содержащий структуру веб-страницы.
- `style.css`: Содержит все стили CSS для веб-страницы.
- `script.js`: Содержит всю логику JavaScript для веб-страницы.
- `README.md`: Этот файл, содержащий описание проекта.

## Используемые библиотеки

- [Marked.js](https://cdnjs.com/libraries/marked): Библиотека парсера Markdown, используемая для преобразования текста Markdown в HTML.

---

Этот инструмент разработан для быстрого и легкого преобразования Markdown в HTML, совместимый с Word, упрощая процесс создания форматированных документов из Markdown.

# Markdown to Word Converter

This project is a simple web tool that allows you to convert Markdown text into HTML format, which can then be easily copied and pasted into Word documents.

## Features

- **Markdown Input:** A textarea where you can write or paste your Markdown text.
- **Live Preview:** Renders the Markdown input into HTML in real-time, showing you how it will look.
- **Copy to Word:** A button to copy the rendered HTML to the clipboard, formatted for easy pasting into Microsoft Word.
- **Theme Toggle:** Allows switching between a light and dark theme for comfortable viewing and editing.
- **History Navigation:** Provides "Back" and "Forward" buttons to navigate through the history of your Markdown inputs (up to 5 versions).
- **Context Action:** A button that appears when you select text in the preview, allowing you to delete lines in the input that contain the selected text.
- **Local Storage:** Saves your theme preference and the last entered Markdown text in local storage, so your settings and content are preserved across sessions.

## How to Use

1.  **Enter Markdown:** Type or paste your Markdown text into the textarea.
2.  **Render Markdown:** Click the "Отобразить Markdown" button to see the rendered HTML preview below.
3.  **Copy to Word:** Click the "Скопировать для Word" button to copy the HTML to your clipboard. You can then paste this directly into a Word document, preserving basic formatting.
4.  **Theme:** Use the "Темная тема" button to toggle between light and dark themes.
5.  **History:** Use the "← Назад" and "Вперёд →" buttons to navigate through your input history.
6.  **Context Action:** Select text in the preview and click the "Удалить строки с этим текстом" button to remove lines containing that text from the input.

## Files in this project

- `index.html`: The main HTML file containing the structure of the web page.
- `style.css`: Contains all the CSS styles for the web page.
- `script.js`: Contains all the JavaScript logic for the web page.
- `README.md`: This file, providing a description of the project.

## Libraries Used

- [Marked.js](https://cdnjs.com/libraries/marked): A Markdown parser library used to convert Markdown text to HTML.

---

This tool is designed for quick and easy conversion of Markdown to Word-compatible HTML, streamlining the process of creating formatted documents from Markdown.
