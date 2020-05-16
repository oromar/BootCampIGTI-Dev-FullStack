// console.log('Hi')
// window.addEventListener('load', start)
const charCounter = document.querySelector('#charCount')
const input = document.querySelector('input[type=text]')
input.addEventListener('keyup', (evt) => {
  charCounter.textContent = evt?.target?.value?.length
})
const form = document.querySelector('form')
form.addEventListener('submit', (evt) => evt.preventDefault())
