const markdownInput = document.getElementById('markdownInput')
const preview = document.getElementById('preview')
const renderBtn = document.getElementById('renderBtn')
const copyBtn = document.getElementById('copyBtn')
const themeToggle = document.getElementById('themeToggle')
const prevHistoryBtn = document.getElementById('prevHistory')
const nextHistoryBtn = document.getElementById('nextHistory')
const contextAction = document.getElementById('contextAction')

const processDashListCheckbox = document.getElementById('processDashList')
const processNumListCheckbox = document.getElementById('processNumList')
const useSemicolonsCheckbox = document.getElementById('useSemicolons')
const listEndingSelect = document.getElementById('listEndingPunctuation')
const processCodeStyleCheckbox = document.getElementById('processCodeStyle')

const lowercaseAfterColonCheckbox = document.getElementById(
	'lowercaseAfterColon'
)
const removeIndentationCheckbox = document.getElementById('removeIndentation')

// Ключи для localStorage
const THEME_KEY = 'darkTheme'
const TEXT_KEY = 'markdownText'
const HISTORY_KEY = 'markdownHistory'
const HISTORY_INDEX_KEY = 'historyIndex'

const PROCESS_DASH_LIST_KEY = 'processDashList'
const PROCESS_NUM_LIST_KEY = 'processNumList'
const USE_SEMICOLONS_KEY = 'useSemicolons'
const LIST_ENDING_KEY = 'listEnding'
const PROCESS_CODE_STYLE_KEY = 'processCodeStyle'

const LOWERCASE_COLON_KEY = 'lowercaseAfterColon'
const REMOVE_INDENT_KEY = 'removeIndentation'

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
	themeToggle.textContent = isDark ? 'Светлая тема' : 'Темная тема'
	saveSettings() // Сохраняем все настройки
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
	// Не сохраняем сразу все настройки при каждом вводе, только текст
	localStorage.setItem(TEXT_KEY, markdownInput.value)
	// Можно добавить debounce, если сохранение будет тормозить
})

// --- Загрузка и применение сохраненных настроек ---
function loadSettings() {
	// Тема
	const darkTheme = localStorage.getItem(THEME_KEY) === 'true'
	document.body.classList.toggle('dark', darkTheme)
	themeToggle.textContent = darkTheme ? 'Светлая тема' : 'Темная тема'

	// Текст
	const savedText = localStorage.getItem(TEXT_KEY)
	if (savedText) {
		markdownInput.value = savedText
	}

	// Настройки форматирования
	processDashListCheckbox.checked =
		localStorage.getItem(PROCESS_DASH_LIST_KEY) !== 'false' // По умолчанию true
	processNumListCheckbox.checked =
		localStorage.getItem(PROCESS_NUM_LIST_KEY) !== 'false' // По умолчанию true
	useSemicolonsCheckbox.checked =
		localStorage.getItem(USE_SEMICOLONS_KEY) === 'true' // По умолчанию false
	listEndingSelect.value = localStorage.getItem(LIST_ENDING_KEY) || 'none' // По умолчанию 'none'
	processCodeStyleCheckbox.checked =
		localStorage.getItem(PROCESS_CODE_STYLE_KEY) !== 'false' // По умолчанию true
	lowercaseAfterColonCheckbox.checked =
		localStorage.getItem(LOWERCASE_COLON_KEY) === 'true' // По умолчанию false
	removeIndentationCheckbox.checked =
		localStorage.getItem(REMOVE_INDENT_KEY) === 'true' // По умолчанию false

	// Применяем стиль кода сразу
	applyCodeStyleSetting()
	applyTabulationSetting() // Применяем настройку отступов
}

// --- Сохранение настроек ---
function saveSettings() {
	localStorage.setItem(THEME_KEY, document.body.classList.contains('dark'))
	localStorage.setItem(TEXT_KEY, markdownInput.value)
	localStorage.setItem(PROCESS_DASH_LIST_KEY, processDashListCheckbox.checked)
	localStorage.setItem(PROCESS_NUM_LIST_KEY, processNumListCheckbox.checked)
	localStorage.setItem(USE_SEMICOLONS_KEY, useSemicolonsCheckbox.checked)
	localStorage.setItem(LIST_ENDING_KEY, listEndingSelect.value)
	localStorage.setItem(PROCESS_CODE_STYLE_KEY, processCodeStyleCheckbox.checked)
	localStorage.setItem(LOWERCASE_COLON_KEY, lowercaseAfterColonCheckbox.checked)
	localStorage.setItem(REMOVE_INDENT_KEY, removeIndentationCheckbox.checked)
}

// Функция для рендеринга Markdown в HTML
function renderMarkdown() {
	let markdownText = markdownInput.value

	// Получаем текущие настройки
	const addEnding = listEndingSelect.value
	const useSemicolons = useSemicolonsCheckbox.checked
	const processDash = processDashListCheckbox.checked
	const processNum = processNumListCheckbox.checked
	const makeLowercase = lowercaseAfterColonCheckbox.checked // Новая настройка

	// ПОРЯДОК ВАЖЕН!
	// 0. Преобразуем в нижний регистр после двоеточия (если включено)
	markdownText = lowercaseAfterColonInLists(markdownText, makeLowercase)

	// 1. Добавляем пунктуацию в конце строк списка (если выбрано)
	markdownText = addListEndingPunctuation(markdownText, addEnding)

	// 2. Обрабатываем точки с запятыми (если включено ИЛИ для исправления последнего элемента)
	markdownText = processSemicolonsInLists(markdownText, useSemicolons)

	// 3. Экранируем маркеры списка (если преобразование ОТКЛЮЧЕНО)
	markdownText = escapeListMarkers(markdownText, !processDash, !processNum)

	// 4. Рендерим с помощью Marked.js
	const html = marked.parse(markdownText)
	preview.innerHTML = html

	// 5. Применяем настройку стиля кода (через CSS)
	applyCodeStyleSetting()

	// 6. Применяем настройку отступов (через CSS)
	applyTabulationSetting()

	// Сохранение настроек происходит в обработчиках событий
}

// Обновление истории (сохраняем не более 5 версий)
function updateHistory(newText) {
	let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
	let currentIndex = parseInt(localStorage.getItem(HISTORY_INDEX_KEY)) || -1 // Используем -1 для пустого

	// Если мы не в конце истории (т.е. были "назад"), обрезаем историю
	if (currentIndex < history.length - 1) {
		history = history.slice(0, currentIndex + 1)
	}

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
	saveSettings() // Сохраняем настройки при ручном рендере
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

processDashListCheckbox.addEventListener('change', () => {
	renderMarkdown()
	saveSettings()
})
processNumListCheckbox.addEventListener('change', () => {
	renderMarkdown()
	saveSettings()
})
useSemicolonsCheckbox.addEventListener('change', () => {
	renderMarkdown()
	saveSettings()
})
listEndingSelect.addEventListener('change', () => {
	renderMarkdown()
	saveSettings()
})
processCodeStyleCheckbox.addEventListener('change', () => {
	// Просто применяем стиль, не нужно перерендеривать Markdown
	applyCodeStyleSetting()
	saveSettings()
})
lowercaseAfterColonCheckbox.addEventListener('change', () => {
	renderMarkdown() // Перерендерить с новой обработкой
	saveSettings()
})
removeIndentationCheckbox.addEventListener('change', () => {
	// Не нужно перерендеривать Markdown, только применить/убрать CSS класс
	applyTabulationSetting()
	saveSettings()
})

// История: навигация "назад" и "вперёд"
function loadHistoryIndex() {
	const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
	// Загружаем индекс, убеждаемся, что он в допустимых границах
	let index = parseInt(localStorage.getItem(HISTORY_INDEX_KEY))
	if (isNaN(index) || index < 0 || index >= history.length) {
		index = history.length - 1 // По умолчанию последний элемент
	}
	return { history, index }
}
prevHistoryBtn.addEventListener('click', () => {
	let { history, index } = loadHistoryIndex()
	if (index > 0) {
		index--
		localStorage.setItem(HISTORY_INDEX_KEY, index)
		markdownInput.value = history[index]
		renderMarkdown() // Перерендериваем с текущими настройками
		localStorage.setItem(TEXT_KEY, history[index]) // Сохраняем текст
		// Не сохраняем настройки здесь, чтобы история не меняла настройки
	}
})
nextHistoryBtn.addEventListener('click', () => {
	let { history, index } = loadHistoryIndex()
	if (index < history.length - 1) {
		index++
		localStorage.setItem(HISTORY_INDEX_KEY, index)
		markdownInput.value = history[index]
		renderMarkdown() // Перерендериваем с текущими настройками
		localStorage.setItem(TEXT_KEY, history[index]) // Сохраняем текст
		// Не сохраняем настройки здесь
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
		localStorage.setItem(TEXT_KEY, markdownInput.value) // Сохраняем текст
		renderMarkdown() // Перерендериваем
		updateHistory(markdownInput.value) // Обновляем историю
		saveSettings() // Сохраняем все настройки
	}
}

// Отслеживаем выделение текста в блоке preview
preview.addEventListener('mouseup', e => {
	const selection = window.getSelection().toString()
	if (selection.trim().length > 0) {
		const range = window.getSelection().getRangeAt(0)
		const rect = range.getBoundingClientRect()
		contextAction.style.top = rect.bottom + window.scrollY + 5 + 'px'
		contextAction.style.left = rect.left + window.scrollX + 'px'
		contextAction.style.display = 'block'
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

function lowercaseAfterColonInLists(text, enabled) {
	if (!enabled) return text

	const lines = text.split('\n')
	const listMarkerRegex = /^(\s*)(?:-|\*|\+|\d+\.)(\s+)/
	// Символы Markdown, которые могут стоять между ':' и первой буквой, и которые нужно игнорировать
	const markdownCharsToIgnore = ['*', '_', '`', '~', '[', '<'] // Добавьте другие, если нужно

	return lines
		.map(line => {
			const match = line.match(listMarkerRegex)

			if (match) {
				const colonIndex = line.indexOf(':')

				if (colonIndex !== -1 && colonIndex < line.length - 1) {
					let firstLetterIndex = -1 // Индекс первой БУКВЫ
					let firstLetter = '' // Сама первая БУКВА

					// Ищем индекс первой БУКВЫ после двоеточия, пропуская пробелы и символы разметки
					for (let i = colonIndex + 1; i < line.length; i++) {
						const char = line[i]

						if (/\s/.test(char)) {
							// Пропускаем пробельные символы
							continue
						}
						if (markdownCharsToIgnore.includes(char)) {
							// Пропускаем символы разметки
							continue
						}

						// Если символ не пробел и не символ разметки - считаем его первой буквой
						firstLetterIndex = i
						firstLetter = char
						break // Нашли первую букву, выходим
					}

					// Условие: Первая буква найдена
					if (firstLetterIndex !== -1) {
						// Условие: Найденная буква является заглавной
						if (
							firstLetter !== firstLetter.toLowerCase() &&
							firstLetter === firstLetter.toUpperCase()
						) {
							const lowerChar = firstLetter.toLowerCase() // Преобразуем в строчную
							// Пересобираем строку, заменяя символ по найденному индексу ПЕРВОЙ БУКВЫ
							return (
								line.substring(0, firstLetterIndex) +
								lowerChar +
								line.substring(firstLetterIndex + 1)
							)
						}
					}
				}
			}
			return line // Возвращаем строку без изменений, если условия не выполнены
		})
		.join('\n')
}

function addListEndingPunctuation(text, punctuation) {
	if (punctuation === 'none') return text

	const lines = text.split('\n')
	const endingPunctuationRegex = /[.,;:!?]$/ // Регулярка для проверки наличия пунктуации в конце
	const listMarkerRegex = /^(\s*)(-|\*|\+|\d+\.)\s+/ // Регулярка для определения строки списка

	return lines
		.map(line => {
			const trimmedLine = line.trimEnd() // Убираем пробелы в конце
			if (
				listMarkerRegex.test(trimmedLine) &&
				trimmedLine.length > 0 &&
				!endingPunctuationRegex.test(trimmedLine)
			) {
				// Добавляем пунктуацию, если это строка списка, она не пустая и не заканчивается пунктуацией
				return trimmedLine + punctuation
			}
			return line // Возвращаем строку без изменений
		})
		.join('\n')
}

function processSemicolonsInLists(text, useSemicolons) {
	// Убрали проверку if (!useSemicolons) return text;
	// Функция теперь вызывается всегда, но логика замены точки на ; и ; на .
	// зависит от флага useSemicolons.

	const lines = text.split('\n')
	const listMarkerRegex = /^(\s*)(-|\*|\+|\d+\.)\s+/
	let processedLines = []
	let currentListBlock = [] // Хранит строки текущего блока списка

	function processBlock() {
		if (currentListBlock.length > 0) {
			// Основная логика: Замена '.' на ';' для НЕ-последних элементов
			if (useSemicolons) {
				for (let i = 0; i < currentListBlock.length - 1; i++) {
					let line = currentListBlock[i]
					let trimmedLine = line.trimEnd()
					if (trimmedLine.endsWith('.')) {
						// Заменяем последнюю точку на точку с запятой
						currentListBlock[i] = trimmedLine.slice(0, -1) + ';'
					}
					// Добавим случай: если не-последний элемент заканчивается на ';', оставляем ';'
					// Это нужно, если пользователь ВЫБРАЛ добавление ';' и ОТКЛЮЧИЛ замену '.' на ';'
					// В этом случае мы не должны менять ';' на '.' для не-последних элементов.
					// Ничего делать не надо, `;` остается.
				}
			}

			// --- НОВОЕ: Обработка ПОСЛЕДНЕГО элемента ---
			if (currentListBlock.length > 0) {
				const lastIndex = currentListBlock.length - 1
				let lastLine = currentListBlock[lastIndex]
				let trimmedLastLine = lastLine.trimEnd()

				// Если включена опция "Заменять '.' на ';'" И последний элемент заканчивается на ';'
				if (useSemicolons && trimmedLastLine.endsWith(';')) {
					// Заменяем ';' на '.' в последнем элементе
					currentListBlock[lastIndex] = trimmedLastLine.slice(0, -1) + '.'
				}
				// Если опция "Заменять '.' на ';'" ВЫКЛЮЧЕНА, то мы НЕ должны менять
				// точку с запятой на точку в последнем элементе, даже если она там есть
				// (например, была добавлена опцией "Добавить в конце строк списка").
				// Поэтому дополнительной логики не нужно.
			}
			// --- КОНЕЦ НОВОГО ---

			processedLines.push(...currentListBlock) // Добавляем обработанный блок
			currentListBlock = [] // Очищаем для следующего блока
		}
	}

	// Проход по строкам для разделения на блоки
	for (const line of lines) {
		// Проверяем, начинается ли строка как элемент списка И не является ли пустой после маркера
		if (
			listMarkerRegex.test(line) &&
			line.match(listMarkerRegex)[0].length < line.trim().length
		) {
			currentListBlock.push(line)
		} else {
			processBlock() // Обрабатываем предыдущий блок списка
			processedLines.push(line) // Добавляем не-списочную строку
		}
	}
	processBlock() // Обрабатываем последний блок списка, если он остался

	return processedLines.join('\n')
}

function escapeListMarkers(text, escapeDash, escapeNum) {
	if (!escapeDash && !escapeNum) return text

	const lines = text.split('\n')
	const dashListRegex = /^(\s*)(-|\*|\+)(\s+)/
	const numListRegex = /^(\s*)(\d+)\.(\s+)/
	let isFirstItemInBlock = true // Флаг для первого элемента в блоке

	return lines
		.map(line => {
			let modifiedLine = line
			let escaped = false

			if (escapeDash) {
				const dashMatch = line.match(dashListRegex)
				if (dashMatch) {
					// Экранируем маркер
					modifiedLine = `${dashMatch[1]}\\${dashMatch[2]}${
						dashMatch[3]
					}${line.slice(dashMatch[0].length)}`
					escaped = true
				}
			}
			if (escapeNum) {
				const numMatch = modifiedLine.match(numListRegex)
				if (numMatch) {
					// Экранируем маркер
					modifiedLine = `${numMatch[1]}${numMatch[2]}\\.${
						numMatch[3]
					}${modifiedLine.slice(numMatch[0].length)}`
					escaped = true
				}
			}

			if (escaped) {
				if (isFirstItemInBlock) {
					// Добавляем <br> ПЕРЕД первым элементом
					modifiedLine = '<br>' + modifiedLine
					isFirstItemInBlock = false // Сбрасываем флаг для остальных элементов блока
				}
				// Добавляем <br> ПОСЛЕ каждого элемента, если строка не пустая и не заканчивается <br>
				if (
					modifiedLine.trim().length > 0 &&
					!modifiedLine.trimEnd().endsWith('<br>') &&
					!modifiedLine.trimEnd().endsWith('<br/>')
				) {
					modifiedLine = modifiedLine + '<br>'
				}
			} else {
				// Если строка не была экранирована (не маркер списка),
				// значит, это может быть разделитель между блоками списков.
				isFirstItemInBlock = true // Начинаем новый блок при следующей экранированной строке
			}

			return modifiedLine
		})
		.join('\n')
}

// Применение стиля к коду (через CSS класс)
function applyCodeStyleSetting() {
	if (processCodeStyleCheckbox.checked) {
		preview.classList.remove('no-code-style')
	} else {
		preview.classList.add('no-code-style')
	}
}

// Применение настройки отступов (через CSS класс)
function applyTabulationSetting() {
	if (removeIndentationCheckbox.checked) {
		preview.classList.add('no-indentation')
	} else {
		preview.classList.remove('no-indentation')
	}
}

loadSettings() // Загружаем все настройки и текст
renderMarkdown() // Рендерим с загруженными настройками
