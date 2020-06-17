import React from 'react'
import _ from 'lodash'
import css from './Grades.module.css'

export default function Grade({ grades, onDelete, onUpdate }) {
  const grouped = _.groupBy(grades, 'subject')
  const subjects = Object.keys(grouped)
  const classes = `${css.gradeTable} striped`

  const handleDelete = (id) => {
    onDelete(id)
  }

  const handleUpdate = (grade) => {
    onUpdate(grade)
  }

  return (
    <div className={css.container}>
      {subjects
        .sort((a, b) => a.localeCompare(b))
        .map((subject) => (
          <table key={subject} className={classes}>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Disciplina</th>
                <th>Avaliação</th>
                <th>Nota</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {grouped[subject].map((grade) => {
                const { student, subject, value, type } = grade
                return (
                  <tr key={`${student}_${subject}_${type}`}>
                    <td>{student}</td>
                    <td>{subject}</td>
                    <td>{type}</td>
                    <td>{value}</td>
                    <td>
                      <a className={css.link} href="#">
                        <i className="material-icons">edit</i>
                      </a>
                    </td>
                    <td>
                      <a
                        className={css.link}
                        href="#"
                        onClick={() => handleDelete(grade.id)}
                      >
                        <i className="material-icons">delete</i>
                      </a>
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td></td>
                <td></td>
                <td className={css.total}>Total</td>
                <td className={css.total}>
                  {grouped[subject].reduce(
                    (total, current) => total + current.value,
                    0
                  )}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  )
}
