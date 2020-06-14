const list = []

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

const render = () => {
  ul.innerHTML = list
    .map(
      (item) =>
        `<li key='${list.indexOf(item)}'> ${item.toLocaleString(
          'pt-BR',
          dateOptions
        )} </li>`
    )
    .join('')
}

button.addEventListener('click', () => {
  list.push(new Date())
  render()
})
