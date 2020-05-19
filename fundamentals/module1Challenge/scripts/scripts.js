window.addEventListener('load', async () => {
  const response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  )
  const json = await response.json()
  const data = json.results
  const people = data.map((e) => ({
    name: `${e.name.first} ${e.name.last}`,
    picture: e.picture.thumbnail,
    age: e.dob.age,
    gender: e.gender,
  }))

  const defaultMessageUserList =
    '<div> <h2 class="info-title">Nenhum usuário filtrado</h2></div>'
  const defaultMessageStats =
    '<div> <h2 class="info-title">Nada a ser exibido</h2></div>'

  const input = document.querySelector('#q')
  const searchButton = document.querySelector('#searchButton')
  const list = document.querySelector('#list')
  const stats = document.querySelector('#stats')

  const defaultData = () => {
    list.innerHTML = defaultMessageUserList
    stats.innerHTML = defaultMessageStats
  }

  const renderUsers = (filtered) => {
    const items = filtered
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(
        (item) =>
          `<div class="info">
            <div>
              <img class="image" src="${item.picture}"/>
            </div>
            <p>${item.name}, ${item.age} anos</p>
        </div>`
      )
    let data = `<div> <h2 class="info-title">${filtered.length} usuário(s) encontrado(s)</h2>`
    data += items.join(' ')
    data += '</div>'
    list.innerHTML = data
  }

  const renderStats = (filtered) => {
    const ages = filtered.reduce((total, current) => total + current.age, 0)
    const agesMedia = ages / filtered.length
    const males = filtered.filter((person) => person.gender === 'male').length
    const females = filtered.length - males
    stats.innerHTML = `
      <div>
        <h2 class="info-title">Estatísticas</h2>
      </div>
      <div>
        <p>Sexo masculino: ${males}</p>
        <p>Sexo feminino: ${females}</p>
        <p>Soma das idades: ${ages}</p>
        <p>Média das idades: ${agesMedia}</p>
      </div>`
  }

  const performSearch = (value) => {
    list.innerHTML = ''
    if (value === '') {
      defaultData()
      return
    }
    let filtered = people.filter(
      (person) => person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
    if (filtered.length > 0) {
      renderUsers(filtered)
      renderStats(filtered)
    } else {
      defaultData()
    }
  }
  searchButton.addEventListener('click', () => performSearch(input.value))
  input.addEventListener('keyup', (evt) => {
    if (evt.keyCode == 13) {
      performSearch(evt.target.value)
    }
  })
  defaultData()
})
