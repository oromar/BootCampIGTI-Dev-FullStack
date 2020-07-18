import React from 'react'
import SummaryItem from './SummaryItem'

export default function Summary({ transactions }) {
  const receitas = transactions.reduce(
    (total, current) => (total += current.type === '-' ? 0 : current.value),
    0
  )
  const despesas = transactions.reduce(
    (total, current) => (total += current.type === '+' ? 0 : current.value),
    0
  )
  const saldo = receitas - despesas
  return (
    <div style={styles.container}>
      <SummaryItem name="Lançamentos" value={transactions.length} />
      <SummaryItem name="Receitas" value={receitas} />
      <SummaryItem name="Despesas" value={despesas} />
      <SummaryItem name="Saldo" value={saldo} />
    </div>
  )
}

const styles = {
  container: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}
