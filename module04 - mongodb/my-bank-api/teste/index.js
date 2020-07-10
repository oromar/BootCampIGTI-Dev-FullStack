const input1 = ['Fernanda 7', 'Fernando 9', 'Gustavo 11']
const input2 = ['Maria 7', 'Pedro 9', 'Joao_Vitor 5', 'Isabel 12', 'Laura 8']
const input3 = ['Maria 4', 'Pedro 3', 'Joao 2']
const input4 = ['Maria 5', 'Pedro 2', 'Joao 5', 'Isabel 12', 'Luana 8']
const input5 = ['Maria 7', 'Pedro 9', 'Joao_Vitor 5', 'Isabel 12', 'Laura 8']
const input6 = [
  'Maria 5',
  'Kaio 4',
  'Pedro 8',
  'Joao 1',
  'Isabel 2',
  'Luana 10',
]
const input7 = ['Maria 5', 'Pedro 2', 'Joao 5', 'Isabel 2', 'Luana 8']

const allItems = [
  input1,
  input2,
  input3,
  input4,
  input5,
  input6,
  //    input7
]

allItems.forEach((x) => {
  const input = []
  // for (let i = 0; i < qty; i++) {
  //   const student = gets().split(' ')
  x.forEach((s) => {
    const student = s.split(' ')
    input.push({ name: student[0], value: +student[1] })
  })
  // }

  let number = input[0].value
  let pos = 1
  while (true) {
    const h = number % 2 === 0
    const n = input.length
    for (let i = 0; i < number; i++) {
      current = input[(((pos + i) % n) + n) % n]
    }
    number = current.value
    pos = input.indexOf(current)
    input.splice(pos, 1)
    if (input.length === 1) break
  }
  console.log(`Vencedor(a): ${input[0].name}`)
})
