const markdownInput = document.getElementById('markdownInput')
const preview = document.getElementById('preview')
const renderBtn = document.getElementById('renderBtn')
const copyBtn = document.getElementById('copyBtn')
const themeToggle = document.getElementById('themeToggle')
const prevHistoryBtn = document.getElementById('prevHistory')
const nextHistoryBtn = document.getElementById('nextHistory')
const contextAction = document.getElementById('contextAction')

// Ключи для localStorage
const THEME_KEY = 'darkTheme'
const TEXT_KEY = 'markdownText'
const HISTORY_KEY = 'markdownHistory'
const HISTORY_INDEX_KEY = 'historyIndex'

// Загружаем тему из localStorage
function loadTheme() {
	const darkTheme = localStorage.getItem(THEME_KEY)
	if (darkTheme === 'true') {
		document.body.classList.add('dark')
		themeToggle.textContent = 'Светлая тема'
	} else {
		document.body.classList.remove('dark')
		themeToggle.textContent = 'Темная тема'
	}
}
loadTheme()

themeToggle.addEventListener('click', () => {
	document.body.classList.toggle('dark')
	const isDark = document.body.classList.contains('dark')
	localStorage.setItem(THEME_KEY, isDark)
	themeToggle.textContent = isDark ? 'Светлая тема' : 'Темная тема'
})

// Загружаем сохранённый текст из localStorage
function loadSavedText() {
	const savedText = localStorage.getItem(TEXT_KEY)
	if (savedText) {
		markdownInput.value = savedText
	}
}
loadSavedText()

// Сохранение текста в localStorage при изменениях
markdownInput.addEventListener('input', () => {
	localStorage.setItem(TEXT_KEY, markdownInput.value)
})

// Функция для рендеринга Markdown в HTML
function renderMarkdown() {
	const markdownText = markdownInput.value
	const html = marked.parse(markdownText)
	preview.innerHTML = html
}

// Обновление истории (сохраняем не более 5 версий)
function updateHistory(newText) {
	let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
	// Если последний элемент совпадает с новым, не добавляем
	if (history.length && history[history.length - 1] === newText) return
	history.push(newText)
	if (history.length > 5) {
		history.shift()
	}
	localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
	// Устанавливаем текущий индекс на последний
	localStorage.setItem(HISTORY_INDEX_KEY, history.length - 1)
}

renderBtn.addEventListener('click', () => {
	renderMarkdown()
	updateHistory(markdownInput.value)
})

// Копирование HTML в буфер обмена
copyBtn.addEventListener('click', async function () {
	const htmlContent = preview.innerHTML
	const blobInput = new Blob([htmlContent], { type: 'text/html' })
	const clipboardItemInput = new ClipboardItem({ 'text/html': blobInput })
	try {
		await navigator.clipboard.write([clipboardItemInput])
		alert('Скопировано в буфер обмена!')
	} catch (err) {
		alert('Ошибка при копировании: ' + err)
	}
})

// История: навигация "назад" и "вперёд"
function loadHistoryIndex() {
	const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
	const index =
		parseInt(localStorage.getItem(HISTORY_INDEX_KEY)) || history.length - 1
	return { history, index }
}
prevHistoryBtn.addEventListener('click', () => {
	let { history, index } = loadHistoryIndex()
	if (index > 0) {
		index--
		localStorage.setItem(HISTORY_INDEX_KEY, index)
		markdownInput.value = history[index]
		renderMarkdown()
		localStorage.setItem(TEXT_KEY, history[index])
	}
})
nextHistoryBtn.addEventListener('click', () => {
	let { history, index } = loadHistoryIndex()
	if (index < history.length - 1) {
		index++
		localStorage.setItem(HISTORY_INDEX_KEY, index)
		markdownInput.value = history[index]
		renderMarkdown()
		localStorage.setItem(TEXT_KEY, history[index])
	}
})

// Функция для удаления строк, содержащих выделённый текст
function removeDuplicateLines(selectedText) {
	let lines = markdownInput.value.split('\n')
	// Фильтруем строки, исключая те, которые содержат выделённый текст
	const filtered = lines.filter(line => !line.includes(selectedText.trim()))
	// Запрос подтверждения
	if (
		confirm(
			`Удалить ${
				lines.length - filtered.length
			} строк(и), содержащих "${selectedText.trim()}"?`
		)
	) {
		markdownInput.value = filtered.join('\n')
		localStorage.setItem(TEXT_KEY, markdownInput.value)
		renderMarkdown()
		updateHistory(markdownInput.value)
	}
}

// Отслеживаем выделение текста в блоке preview
preview.addEventListener('mouseup', e => {
	const selection = window.getSelection().toString()
	if (selection.trim().length > 0) {
		// Позиционируем кнопку рядом с выделением
		const range = window.getSelection().getRangeAt(0)
		const rect = range.getBoundingClientRect()
		contextAction.style.top = rect.bottom + window.scrollY + 5 + 'px'
		contextAction.style.left = rect.left + window.scrollX + 'px'
		contextAction.style.display = 'block'
		// Привязываем действие к кнопке
		contextAction.onclick = () => {
			removeDuplicateLines(selection)
			contextAction.style.display = 'none'
			window.getSelection().removeAllRanges()
		}
	} else {
		contextAction.style.display = 'none'
	}
})
// Скрывать кнопку при клике вне выделения
document.addEventListener('click', e => {
	if (!preview.contains(e.target) && e.target !== contextAction) {
		contextAction.style.display = 'none'
	}
})

// При загрузке страницы рендерим сохранённый текст
renderMarkdown()
