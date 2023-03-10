import React from 'react'

const Row = ({prevGuess,currentGuess,isCorrect}) => {
    if(prevGuess){
        return(
            <div className="row past">
                {prevGuess.map((letter,index)=>(
                    <div key={index} className={letter.color}>{letter.key}</div>
                ))}
            </div>
        );
    }
    if(currentGuess&&!isCorrect){
        let letters=currentGuess.split('');
        // console.log(isCorrect)
        return(
            <div className="row current">
               { letters.map((letter,index)=>(
                    <div key={index} className="filled">{letter}</div>
                ))}
                {[...Array(5-letters.length)].map((_,  index)=>(
                    <div key={index}></div>
                ))}
            </div>
        )
    }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Row
