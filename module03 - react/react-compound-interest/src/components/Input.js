import React from 'react'

export default function Input({ name, label, value, step, onChange }) {
  return (
    <div>
      <label>
        {label}
        <input
          name={name}
          type="number"
          value={value}
          step={step}
          onChange={onChange}
        />
      </label>
    </div>
  )
}
