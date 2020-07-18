import React from 'react'

export default function TransactionItem({ transaction, remove, edit }) {
  return (
    <>
      <td style={transaction.type === '-' ? styles.debit : styles.credit}>
        {transaction.day}
      </td>
      <td style={transaction.type === '-' ? styles.debit : styles.credit}>
        {transaction.type === '-' ? 'Despesa' : 'Receita'}
      </td>
      <td style={transaction.type === '-' ? styles.debit : styles.credit}>
        {transaction.category}
      </td>
      <td style={transaction.type === '-' ? styles.debit : styles.credit}>
        {transaction.description}
      </td>
      <td style={transaction.type === '-' ? styles.debit : styles.credit}>
        {transaction.value}
      </td>
      <td style={transaction.type === '-' ? styles.debit : styles.credit}>
        <a style={{ cursor: 'pointer' }} onClick={() => edit(transaction._id)}>
          <i className="material-icons">edit</i>
        </a>
      </td>
      <td>
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => remove(transaction._id)}
        >
          <i className="material-icons">delete</i>
        </a>
      </td>
    </>
  )
}

const styles = {
  credit: {
    color: 'green',
    fontWeight: 600,
  },
  debit: {
    color: 'red',
    fontWeight: 600,
  },
}
