import axios from 'axios'

const appService = axios.create({
  baseURL: 'http://localhost:3001/grade',
})

const isNegative = (num) => num < 0

const GENERAL_VALIDATORS = [
  {
    functions: [
      {
        fn: isNaN,
        message: 'Nota inválida',
      },
      {
        fn: isNegative,
        message: 'Nota mínima inválida',
      },
    ],
  },
]

const GRADE_VALIDATORS = [
  {
    id: 1,
    type: 'Exercícios',
    functions: [
      {
        fn: (num) => num > 10,
        message: 'Nota máxima Inválida',
      },
    ],
  },
  {
    id: 2,
    type: 'Trabalho Prático',
    functions: [
      {
        fn: (num) => num > 40,
        message: 'Nota máxima Inválida',
      },
    ],
  },
  {
    id: 3,
    type: 'Desafio',
    functions: [
      {
        fn: (num) => num > 50,
        message: 'Nota máxima Inválida',
      },
    ],
  },
]

export const validate = (grade) => {
  GENERAL_VALIDATORS.forEach((validator) => {
    for (const validation of validator.functions)
      if (validation.fn(grade.value)) throw new Error(validation.message)
  })

  GRADE_VALIDATORS.filter((item) => item.type === grade.type).forEach(
    (validator) => {
      for (const validation of validator.functions)
        if (validation.fn(grade.value)) throw new Error(validation.message)
    }
  )
}

export default appService
