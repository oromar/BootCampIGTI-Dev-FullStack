const button = document.querySelector('button')
const ul = document.querySelector('ul')
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}
button.addEventListener('click', () => {
  const li = document.createElement('li')
  li.textContent = new Date().toLocaleString('pt-BR', dateOptions)
  ul.appendChild(li)
})
