import { useEffect, useState} from "react";
import { dictionary } from "./assets/dictionary";
import Wordle from "./components/Wordle";
const App=()=> {

    const [solution,setSolution]=useState(null);
    useEffect(()=>{
        const randomSolution=dictionary[Math.floor(Math.random()*dictionary.length)];
        console.log(randomSolution)
        console.log(dictionary.indexOf(randomSolution))
        setSolution(randomSolution)
      
    },[])

  return (
   <div className="App">
    <h1>Wordle</h1>
    {solution && <Wordle solution={solution} />}
   </div>
  );
}

export default App;
