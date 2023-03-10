import {useState} from 'react';
import { dictionary } from '../assets/dictionary';
import { letters_list } from '../assets/letters';
const useWordle = (solution) => {
    const [turn,setTurn]=useState(0);
    const [currentGuess,setCurrentGuess]=useState('');
    const [guesses,setGuesses]=useState([...Array(6)]);//each guess is an array using formatGuesses
    const [history,setHistory]=useState([]);//each guess is a string
    const [isCorrect,setIsCorrect]=useState(false);
    const [usedKeys,setUsedKeys]=useState({}) // {a:'green',b:'yellow',c:'green'}
    const [isValidGuess,setIsValidGuess]=useState(true);

  //format a guess into array of letter objects
  //e.g.[{key:'a',color:'green'}]
    const formatGuess=()=>{
      // console.log('Formatting the guess - ',currentGuess);
      let solutionArray=[...solution];
      let formattedGuess=[...currentGuess].map((letter)=>{
        return {key:letter,color:'grey'};
      })
      
      //search for green letters
      formattedGuess.forEach((obj,index)=>{
        if(obj.key===solutionArray[index]){
          // obj.color='green';
          formattedGuess[index].color='green';
          solutionArray[index]=null;
        }
      })

      //for yellow letters
      formattedGuess.forEach((obj,index)=>{
        if(solutionArray.includes(obj.key)&& obj.color!='green'){
          formattedGuess[index].color='yellow';
          solutionArray[solutionArray.indexOf(obj.key)]=null;
        }
      })

      return formattedGuess;

    }
    //add a new guess to the guesses state
    //update the isCorrect state if the guess is correct
    //add one to the turn state
    const addNewGuess=(currentFormattedGuess)=>{
      if(currentGuess===solution){
        setIsCorrect(true);
      }
      setGuesses((prevGuesses)=>{
        let newGuesses=[...prevGuesses];
        newGuesses[turn]=currentFormattedGuess;
        return newGuesses;
      })
      setHistory((prevHistory)=>{
        return [...prevHistory,currentGuess];
      })
      setTurn((prevCount)=>{
        let updatedCount=prevCount;
        return updatedCount+1 ;
      })
      setUsedKeys((prevUsedKeys)=>{
        let formattedGuess=formatGuess();
        let newKeys={...prevUsedKeys};
        formattedGuess.forEach((letter)=>{
          const currentColor=newKeys[letter.key];
          if(letter.color==="green"){
            newKeys[letter.key]='green';
            return ;
          }
          if(letter.color==='yellow' && currentColor!='green'){
            newKeys[letter.key]='yellow';
            return;
          }
          if(letter.color==='grey'&& currentColor!='green'&& currentColor!='yellow'){
            newKeys[letter.key]='grey';
            return;
          }
          
        })
        return newKeys;
      })
      setCurrentGuess('');


    }

    //handle keyup event & track current guess
    const handleKeyup=({key,keyCode})=>{
      // console.log(key)
      if(key==="Enter"){
        //no duplicate words turn<=6 and length==5
       if(turn>=6){
        // console.log('You have exhausted all your guesses')
        return;
       }
       if(history.includes(currentGuess)){
        // console.log(`You already entered ${currentGuess}`)
        // setCurrentGuess('')
        return;
      }
      if(currentGuess.length<5){
        // console.log('Word must be 5 characters long')
        return;
      }
      if(!dictionary.includes(currentGuess)){
        // console.log('No such word exists')
        setIsValidGuess(false)
        // setCurrentGuess('')
        return;
       }

       const currentFormattedGuess=formatGuess();
      //  console.log(currentFormattedGuess);
      addNewGuess(currentFormattedGuess);
       
       

      }


      if(key==="Backspace"){
        setCurrentGuess((prev)=>{
          return prev.slice(0,prev.length-1)
        })
        return 
      }
      
      //regex
      if(/^[A-Za-z]$/.test(key)){
       if(currentGuess.length<5){
        setCurrentGuess((prev)=>{
          return prev+key
        });
       } 
      }

      


    }

    return {turn,currentGuess,guesses,isCorrect,usedKeys,isValidGuess,handleKeyup,setIsValidGuess};

}

export default useWordle;
