// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { BrowserWindow } = require('electron').remote

const openPageUrlElem = document.getElementById('open-page-url')
const openPageUrlErrorElem = document.getElementById('open-page-url-error')
const openPageFormElem = document.getElementById('open-page-form')

openPageUrlElem.value = 'https://9gag.com/tag/programming'

const isValidUrl = (url) => typeof url === 'string' && url.startsWith('http')

const showError = (message) => {
  if (message) {
    openPageUrlErrorElem.innerText = message
    openPageUrlErrorElem.classList.remove('hidden')
  } else {
    openPageUrlErrorElem.classList.add('hidden')
  }
}

const openPageInKioskMode = (url) => {
  let win = new BrowserWindow({ kiosk: true })
  win.on('closed', () => {
    win = null
  })
  win.webContents.on('dom-ready', (e) => {
    const css = `::-webkit-scrollbar { 
      display: none;
    }`;
    win.webContents.insertCSS(css)
  })
  win.loadURL(url)
}

openPageFormElem.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = openPageUrlElem.value
  if (!isValidUrl(url)) {
    showError('URL seems to be not valid :(')
    return
  }
  showError(null)
  openPageInKioskMode(url)
})
