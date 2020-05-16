window.addEventListener('load', () => {
  const sliders = Array.from(document.querySelectorAll('input[type=range]'))
  const inputs = Array.from(document.querySelectorAll('input[type=text]'))
  sliders.forEach((slider) => {
    const input = document.querySelector(`#${slider.id}Value`)
    slider.addEventListener('input', (evt) => {
      input.value = evt.target.value
      const preview = document.querySelector('#preview')
      preview.style.backgroundColor = `rgb(${sliders[0].value}, ${sliders[1].value}, ${sliders[2].value})`
    })
    input.addEventListener('change', () => {
      const preview = document.querySelector('#preview')
      preview.style.backgroundColor = `rgb(${inputs[0].value}, ${inputs[1].value}, ${inputs[2].value})`
      sliders[0].value = inputs[0].value
      sliders[1].value = inputs[1].value
      sliders[2].value = inputs[2].value
    })
  })
})
