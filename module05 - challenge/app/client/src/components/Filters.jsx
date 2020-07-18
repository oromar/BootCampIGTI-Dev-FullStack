import React from 'react'

export default function Filters({ items, currentFilter, setCurrentFilter }) {
  const handlePlusButtonClick = () => {
    let index = items.indexOf(currentFilter)
    if (index === items.length - 1) index = -1
    setCurrentFilter(items[index + 1])
  }
  const handleMinusButtonClick = () => {
    let index = items.indexOf(currentFilter)
    if (index === 0) index = items.length
    setCurrentFilter(items[index - 1])
  }
  const handleSelectOnChange = (evt) => {
    const { value } = evt.target
    setCurrentFilter(value)
  }
  return (
    <div style={styles.container}>
      <button onClick={handleMinusButtonClick} style={styles.button}>
        -
      </button>
      <select
        onChange={handleSelectOnChange}
        id="filters"
        style={styles.combo}
        value={currentFilter}
      >
        <option value="">Selecione</option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={handlePlusButtonClick} style={styles.button}>
        +
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    margin: '20px',
  },
  combo: {
    marginLeft: 15,
    marginRight: 15,
    display: 'block',
    width: 100,
    height: 30,
  },
  button: {
    width: 30,
    height: 30,
  },
}
