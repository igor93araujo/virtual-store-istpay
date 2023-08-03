import React from 'react'

function Button({title}: {title: string}) {
  return (
    <button
     type='button'
    >{title}</button>
  )
}

export default Button