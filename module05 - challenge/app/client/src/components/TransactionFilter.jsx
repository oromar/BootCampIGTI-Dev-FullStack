import React from 'react'

export default function TransactionFilter({
  onChange,
  currentTransactionFilter,
}) {
  return (
    <div>
      <input type="text" value={currentTransactionFilter} onChange={onChange} />
    </div>
  )
}
