window.addEventListener('load', async () => {
  const ENTER_KEY = 13
  const response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  )
  const json = await response.json()
  const data = json.results
  const people = data.map((item) => ({
    name: `${item.name.first} ${item.name.last}`,
    picture: item.picture.thumbnail,
    age: item.dob.age,
    gender: item.gender,
  }))

  const input = document.querySelector('#q')
  const searchButton = document.querySelector('#searchButton')
  const list = document.querySelector('#list')
  const stats = document.querySelector('#stats')

  const renderDefaultData = () => {
    list.innerHTML =
      '<div> <h2 class="info-title">Nenhum usuário filtrado</h2></div>'
    stats.innerHTML =
      '<div> <h2 class="info-title">Nada a ser exibido</h2></div>'
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
    const data = `<div> <h2 class="info-title">${filtered.length} usuário(s) encontrado(s)</h2>`
    list.innerHTML = data + items.join('') + '</div>'
  }

  const renderStats = (filtered) => {
    const ages = filtered.reduce((total, current) => total + current.age, 0)
    const agesMedia = (ages / filtered.length).toFixed(2)
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
    stats.innerHTML = ''
    if (value === '') {
      renderDefaultData()
      return
    }
    const filtered = people.filter(
      (person) => person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
    if (filtered.length > 0) {
      renderUsers(filtered)
      renderStats(filtered)
    } else {
      renderDefaultData()
    }
  }
  input.addEventListener('keyup', (evt) =>
    evt.keyCode == ENTER_KEY ? performSearch(evt.target.value) : null
  )
  searchButton.addEventListener('click', () => performSearch(input.value))
  renderDefaultData()
})
