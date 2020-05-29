window.addEventListener('load', async () => {
  const favorites = []
  const data = await fetch('https://restcountries.eu/rest/v2/all')
  const countriesJSON = await data.json()
  const countries = countriesJSON.map((country) => {
    const { translations, flag, population, numericCode } = country
    return { name: translations.pt, flag, population, id: numericCode }
  })

  const calculateTotal = (list, selector) => {
    const totalPopulation = list.reduce(
      (total, current) => total + +current.population,
      0
    )
    document.querySelector(
      selector
    ).textContent = `População Total: ${totalPopulation}`
  }

  const swapCountry = (listFrom, listTo, obj, element, parentSelector) => {
    listFrom.splice(listFrom.indexOf(listFrom.find((e) => e.id == obj.id)), 1)
    listTo.push(obj)
    document.querySelector(parentSelector).appendChild(element)
  }

  const renderList = (list, selector) => {
    const handleClick = (evt) => {
      const data = evt.target.textContent.split(' | ')
      const obj = {
        id: data[0],
        name: data[1],
        population: data[2],
        flag: data[3],
      }
      if (countries.find((e) => e.id === obj.id)) {
        swapCountry(
          countries,
          favorites,
          obj,
          evt.target.parentElement,
          '#favorites'
        )
      } else {
        swapCountry(
          favorites,
          countries,
          obj,
          evt.target.parentElement,
          '#countries'
        )
      }
      renderList(favorites, '#favorites')
      renderList(countries, '#countries')
      calculateTotal(favorites, '#favoritesPopulationTotal')
      calculateTotal(countries, '#populationTotal')
      document.querySelector('#qtyFavorites').textContent = favorites.length
      document.querySelector('#qtyCountries').textContent = countries.length
    }
    document.querySelector(selector).innerHTML = ''
    const ulItems = list
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((country) => {
        const { name, population, flag, id } = country
        const element = document.createElement('li')
        const link = document.createElement('a')
        link.href = '#'
        link.textContent = `${id} | ${name} | ${population} | ${flag}`
        element.appendChild(link)
        link.addEventListener('click', handleClick)
        return element
      })
    const ulElement = document.querySelector(selector)
    ulItems.forEach((li) => ulElement.appendChild(li))
  }

  renderList(countries, '#countries')
  calculateTotal(countries, '#populationTotal')
  document.querySelector('#qtyCountries').textContent = countries.length
})
