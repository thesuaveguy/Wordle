import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle"
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({solution}) {
    const {turn,currentGuess,guesses,isCorrect,usedKeys,isValidGuess,handleKeyup,setIsValidGuess}=useWordle(solution);
    const [showModal,setShowModal]=useState(false);
    useEffect(()=>{
        window.addEventListener('keyup',handleKeyup);
        if(!isValidGuess){

          setShowModal(true)
          setTimeout(()=>{
            setShowModal(false)
            setIsValidGuess(true)
          },1000)
        }
        if(isCorrect){
          // console.log('you won!!')
          setTimeout(()=>setShowModal(true),2000)
          window.removeEventListener('keyup',handleKeyup);
        }
        if(turn>5 && !isCorrect){
          console.log('out of guesses')
          setTimeout(()=>setShowModal(true),2000)
          window.removeEventListener('keyup',handleKeyup);
        }
        return ()=>window.removeEventListener('keyup',handleKeyup);
    },[handleKeyup,isCorrect,turn,isValidGuess])
  return (
    <div>
      
      <Grid currentGuess={currentGuess} isCorrect={isCorrect} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys}/>
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} isValidGuess={isValidGuess}/>}
    </div>
  )
}
