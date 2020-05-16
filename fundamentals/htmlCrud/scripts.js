window.addEventListener('load', () => {
  const list = []
  const ENTER_KEY_CODE = 13
  let isEditing = false
  let editIndex = -1

  document
    .querySelector('form')
    .addEventListener('submit', (evt) => evt.preventDefault())
  const input = document.querySelector('input[type=text]')
  input.focus()
  const names = document.querySelector('#list')

  const deleteItem = function (evt) {
    list.splice(list.indexOf(evt.target.value), 1)
    render()
  }

  const render = () => {
    const clickName = (evt) => {
      evt.target.value = input.value = evt.target.textContent
      isEditing = true
      editIndex = list.indexOf(input.value)
      input.focus()
    }
    names.innerHTML = ''
    const listItems = list.map((item, index) => {
      const p = document.createElement('p')
      p.textContent = item
      p.addEventListener('click', clickName)

      const button = document.createElement('button')
      button.setAttribute('type', 'button')
      button.value = item
      button.textContent = 'delete'
      button.addEventListener('click', deleteItem)

      const div = document.createElement('div')
      div.appendChild(p)
      p.style.display = 'inline'
      p.style.marginRight = '10px'
      div.appendChild(button)

      const li = document.createElement('li')
      li.setAttribute('id', `row_${list.indexOf(item)}`)
      li.appendChild(div)
      return li
    })
    listItems.forEach((item) => names.appendChild(item))
  }

  input.addEventListener('keyup', (evt) => {
    let value = evt.target.value
    if (
      evt.keyCode == ENTER_KEY_CODE &&
      evt.target.value &&
      evt.target.value.trim()
    ) {
      if (isEditing) {
        list[editIndex] = value
        isEditing = false
        editIndex = -1
      } else {
        list.push(value)
      }
      render()
      evt.target.value = ''
    }
  })
})
