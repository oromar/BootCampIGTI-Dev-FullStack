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

  const renderDefaults = () => {
    list.innerHTML =
      '<div> <h2 class="info-title">Nenhum usuário filtrado</h2></div>'
    stats.innerHTML =
      '<div> <h2 class="info-title">Nada a ser exibido</h2></div>'
  }

  const renderPeople = (listToRender) => {
    const items = listToRender
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
    const data = `<div> <h2 class="info-title">${listToRender.length} usuário(s) encontrado(s)</h2>`
    list.innerHTML = data + items.join('') + '</div>'
  }

  const renderStats = (listToRender) => {
    const ages = listToRender.reduce((total, current) => total + current.age, 0)
    const agesMedia = (ages / listToRender.length).toFixed(2)
    const males = listToRender.filter((person) => person.gender === 'male')
      .length
    const females = listToRender.length - males
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
      renderDefaults()
      return
    }
    const filteredPeople = people.filter(
      (person) => person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
    if (filteredPeople.length > 0) {
      renderPeople(filteredPeople)
      renderStats(filteredPeople)
    } else {
      renderDefaults()
    }
  }
  input.addEventListener('keyup', (evt) =>
    evt.keyCode == ENTER_KEY ? performSearch(evt.target.value) : null
  )
  searchButton.addEventListener('click', () => performSearch(input.value))
  renderDefaults()
})
