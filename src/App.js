//REACT
import {useState, useEffect, useCallback} from 'react' 

// COMPONENTES
import StartScreen from './components/StartScreen';
import Game from './components/Game'
import GameOver from './components/GameOver'

// CSS
import './App.css'

//DADOS
import {wordList} from './data/words'

const stages = [
  {id:1, name:'start'},
  {id:2, name:'game'},
  {id:3, name:'end'},
]

function App() {
  const [gameStage,setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  const [pickedWord,setPickedWord] = useState('')
  const [pickedCategory,setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(3)
  const [score,setScore] = useState(0)

 const pickWordAndCategory = useCallback(()=>{
  // escolhendo uma categoria aleatoria
  const categories = Object.keys(words)
  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

  // escolhendo palavra de acordo com a categoria escolhida
  const word = words[category][Math.floor(Math.random() * words[category].length)]

  return{ word , category}

 }, [words])

  // inicio do jogo
  
    const startGame =  useCallback(()=> {
      const {word, category} = pickWordAndCategory()
  
      let wordLetters = word.split("")
  
      wordLetters = wordLetters.map(Letter => Letter.toLowerCase())
  
      setPickedWord(word)
      setPickedCategory(category)
      setLetters(wordLetters)
  
      clearLettersStates()
      
      setGameStage(stages[1].name)
    }, [pickWordAndCategory])

  // processo de procurar letras

  const verifyLetter = (letter)=>{
    
    // transformando letras para minusculas
    const normalizedLetter = letter.toLowerCase()

    // checando se o usuário ja digitou a letra
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    //
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=> [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{
      setWrongLetters((actualWrongLetters)=> [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses(guesses - 1)


    }
  }

  const clearLettersStates = ()=>{
    setGuessedLetters([])
    setWrongLetters([])
  } 
  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      setScore(actualScore => actualScore += 100)
      
      startGame()
    }

    

  }, [guessedLetters,letters,startGame,gameStage]) 
  
  useEffect(()=>{

    if(guesses <= 0){
      clearLettersStates()

      setGameStage(stages[2].name)
    }

  },[guesses])

  

  // voltar para tela inicial do jogo
  const restartGame = ()=>{
    setScore(0)
    setGuesses(3)


    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen 
        handleStartGame={startGame}
      />}
      {gameStage === 'game' && <Game 
        verifyLetter={verifyLetter}
        tip={pickedCategory}
        pickedWord={pickedWord}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        score={score}
        guesses={guesses}
      />}
      {gameStage === 'end' && <GameOver score={score} restartGame={restartGame}/>}
    </div>
  );
}

export default App;
