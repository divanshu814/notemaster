import React from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/NoteContext'

const About = () => {
    const a = useContext(NoteContext)
  return (
    <div>About {a.name}</div>
  )
}

export default About