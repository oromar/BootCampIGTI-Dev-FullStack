import React from 'react'
import ReactModal from 'react-modal'

export default function TransactionForm({
  save,
  isOpen,
  close,
  transaction,
  onChange,
}) {
  return (
    <ReactModal isOpen={isOpen} ariaHideApp={false}>
      <div>
        <label>Tipo</label>
        <label>
          <input
            onChange={onChange}
            type="radio"
            name="type"
            value="-"
            checked={transaction.type === '-'}
            disabled={transaction._id}
          />
          <span>Despesa</span>
        </label>
        <label>
          <input
            onChange={onChange}
            type="radio"
            name="type"
            value="+"
            checked={transaction.type === '+'}
            disabled={transaction._id}
          />
          <span>Receita</span>
        </label>
      </div>

      <label>Descrição</label>
      <input
        onChange={onChange}
        type="text"
        name="description"
        value={transaction.description}
      />
      <label>Valor</label>
      <input
        onChange={onChange}
        type="number"
        name="value"
        value={transaction.value}
      />
      <label>Categoria</label>
      <input
        onChange={onChange}
        type="text"
        name="category"
        value={transaction.category}
      />
      <label>Data</label>
      <input
        onChange={onChange}
        type="date"
        name="yearMonthDay"
        value={transaction.yearMonthDay}
      />

      <button type="button" onClick={close}>
        Cancelar
      </button>
      <button type="button" onClick={save}>
        Salvar
      </button>
    </ReactModal>
  )
}
