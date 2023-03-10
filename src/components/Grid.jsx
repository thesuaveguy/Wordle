import React from 'react'
import Row from './Row'
const Grid = ({currentGuess,isCorrect,guesses,turn}) => {
  return (
    <div>
      {guesses.map((guess,index)=>{
        if(turn===index){
            return <Row key={index} currentGuess={currentGuess}/>
        }
        return <Row key={index} prevGuess={guess} isCorrect={isCorrect} />
      })}
    </div>
  )
}

export default Grid
