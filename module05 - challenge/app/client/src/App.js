import React, { useState, useEffect } from 'react'
import Filters from './components/Filters'
import transactionService from './service/transaction'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import TransactionFilter from './components/TransactionFilter'
import TransactionForm from './components/TransactionForm'

export default function App() {
  const [filters, setFilters] = useState([])
  const [currentFilter, setCurrentFilter] = useState('')
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [transactionFilter, setCurrentTransactionFilter] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState({})

  const fetchData = async () => {
    if (currentFilter) {
      const json = await transactionService.get(`/${currentFilter}`)
      setTransactions(json.data)
      setFilteredTransactions(json.data)
    }
  }

  const remove = async (_id) => {
    await transactionService.delete(`/${_id}`)
    await fetchData()
  }

  const save = async () => {
    const yearMonthDay = currentTransaction.yearMonthDay
    if (yearMonthDay) {
      const yearMonth = yearMonthDay.substring(0, 7)
      const year = +yearMonthDay.substring(0, 4)
      const month = +yearMonthDay.substring(5, 7)
      const day = +yearMonthDay.substring(8)
      currentTransaction.yearMonth = yearMonth
      currentTransaction.year = year
      currentTransaction.month = month
      currentTransaction.day = day
    }
    if (currentTransaction.value)
      currentTransaction.value = +currentTransaction.value

    try {
      if (currentTransaction._id)
        await transactionService.put(
          `${currentTransaction._id}`,
          currentTransaction
        )
      else await transactionService.post('', currentTransaction)
      setIsFormOpen(false)
      fetchData()
    } catch (error) {
      alert(error)
    }
  }

  const openEditForm = async (_id) => {
    var current = transactions.find((a) => a._id === _id)
    if (current) {
      setCurrentTransaction(current)
      setIsFormOpen(true)
    }
  }

  const openCreateForm = () => {
    setCurrentTransaction({})
    setIsFormOpen(true)
  }

  const onChange = (evt) => {
    const { name, value } = evt.target
    setCurrentTransaction({
      ...currentTransaction,
      [name]: isNaN(value) ? value : +value,
    })
  }

  useEffect(() => {
    const getPeriods = async () => {
      const json = await transactionService.get()
      setFilters(json.data)
      if (!currentFilter) {
        const today = new Date()
        setCurrentFilter(
          `${today.getFullYear()}-${(today.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`
        )
      }
    }
    getPeriods()
  }, [])

  useEffect(() => {
    fetchData()
  }, [currentFilter])

  useEffect(() => {
    const result = transactions.filter(
      (a) =>
        a.description.toLowerCase().indexOf(transactionFilter.toLowerCase()) !==
        -1
    )
    setFilteredTransactions(result)
  }, [transactionFilter])

  return (
    <>
      <h1>Bootcamp Full Stack - Desafio Final</h1>
      <h3>Controle Financeiro Pessoal</h3>
      <Filters
        currentFilter={currentFilter}
        items={filters}
        setCurrentFilter={setCurrentFilter}
      />
      <Summary transactions={transactions} />
      <button onClick={openCreateForm}>Novo</button>
      <TransactionFilter
        currentTransactionFilter={transactionFilter}
        onChange={(evt) => setCurrentTransactionFilter(evt.target.value)}
      />
      <TransactionList
        transactions={filteredTransactions}
        remove={remove}
        edit={openEditForm}
      />

      <TransactionForm
        save={save}
        isOpen={isFormOpen}
        close={() => setIsFormOpen(false)}
        transaction={currentTransaction}
        onChange={onChange}
      />
    </>
  )
}
