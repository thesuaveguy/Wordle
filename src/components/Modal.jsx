import React from 'react'

const Modal = ({isCorrect,turn,solution,isValidGuess}) => {

  return (
    <div className="modal">
    {!isValidGuess &&  (
      <div>
        <h5 className='solution'>Not in word list</h5>
      </div>
    )}
    {/* { !isValidGuess && removeModal()} */}

      
    
     
    {isValidGuess&&isCorrect && (
        <div>
            <h1>You win</h1>
            <p className="solution">{solution}</p>
            <p>You found the solution in {turn} guesses :)</p>
        </div>
    )}
    {isValidGuess&&!isCorrect && (
        <div>
            <h1>Nevermind ! </h1>
            <p className="solution">{solution}</p>
            <p>Better luck next time :)</p>
        </div>
    )}
      
    </div>
  )
}

export default Modal;
