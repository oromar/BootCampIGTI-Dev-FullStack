import React from 'react'
import TransactionItem from './TransactionItem'

export default function TransactionList({ transactions, remove, edit }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th colSpan="2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .sort((a, b) => a.day - b.day)
            .map((item) => (
              <tr key={item._id}>
                <TransactionItem
                  transaction={item}
                  remove={remove}
                  edit={edit}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
