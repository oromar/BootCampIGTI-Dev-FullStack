const getPeople = async () => {
  const usersResponse = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&noinfo'
  )
  const json = await usersResponse.json()
  return json.results.map(({ name, picture, nat }) => ({
    username: name.first,
    picture: picture.large,
    country: nat,
  }))
}
const getCountries = async () => {
  const countriesResponse = await fetch('https://restcountries.eu/rest/v2/all')
  const json = await countriesResponse.json()
  return json.map(({ name, alpha2Code, flag }) => ({
    countryname: name,
    code: alpha2Code,
    flag,
  }))
}
const associatePeopleAndCountries = (people, countries) => {
  const result = []
  people.forEach((user) => {
    const userCountry = countries.find(
      (country) => country.code === user.country
    )
    result.push({ ...user, ...userCountry })
  })
  return result
}
const render = (dataToRender) => {
  const div = document.querySelector('#app')
  div.innerHTML = `
            ${dataToRender.map((item) => {
              return `
                    <div class='card'>
                        <div>
                            <img src='${item.picture}' class='picture'/>
                            <span class='name'>${item.username}</span>
                        </div>
                            <img src='${item.flag}' class='flag'/>
                        </div>
                    </div>`
            })}`
}
(async () => {
  const countries = await getCountries()
  const people = await getPeople()
  const dataToRender = associatePeopleAndCountries(people, countries)
  render(dataToRender)
})()
