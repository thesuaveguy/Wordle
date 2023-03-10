import React, { useState,useEffect } from 'react'
import { letters_list } from '../assets/letters';
const Keypad = ({usedKeys}) => {
    const [letters,setLetters]=useState(null);
    useEffect(()=>{
        setLetters(letters_list)
    },[])
  return (
    <div className="keypad">
      {letters && letters.map((letter)=>{
        const color=usedKeys[letter]
        return (
            <div className={color} key={letters_list.indexOf(letter)}>{letter}</div>
        )
      })}
    </div>
  )
}

export default Keypad
