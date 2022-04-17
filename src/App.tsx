import { useEffect, useState } from 'react';
import './App.css';
import { DropZone } from './components/DropZone';
import { Letters } from './components/Letters';
import { string } from './constants/words';

function App() {

  const [level1, setLevel1] = useState(false)
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(false)
  const [level4, setLevel4] = useState(false)
  const [level5, setLevel5] = useState(false)
  const [level6, setLevel6] = useState(false)
  const [level7, setLevel7] = useState(false)
  const [level8, setLevel8] = useState(false)
  const [level9, setLevel9] = useState(false)
  const [level10, setLevel10] = useState(false)

  const randomWord = returnWords()[Math.floor(Math.random() * returnWords().length)]
  const [word, setWord] = useState(randomWord)

  const [dropArray, setDropArray] = useState<string[]>([])
  const [arrayOfLetters, setArrayOfLetters] = useState<string[] | []>([])

  const [currentLetter, setCurrentLetter] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const [win, setWin] = useState<boolean>(false)
  const [loose, setLoose] = useState<boolean>(false)

  const [result, setResult] = useState<boolean>(false)
  const [resultText, setResultText] = useState<string>('')

  const [fadeOut, setFadeOut] = useState<boolean>(false)
  const [startGame, setStartGame] = useState(true)
  const [newGame, setNewGame] = useState<boolean>(false)

  const [timer, setTimer] = useState<boolean>(false)

  const [count, setCount] = useState(0)
  const [levelCount, setLevelCount] = useState(0)

 
  function returnWords(n: number = 3) {
    if (level1) n = 3
    if (level2) n = 4
    if (level3) n = 5
    if (level4) n = 6
    if (level5) n = 7
    if (level6) n = 8
    if (level7) n = 9
    const words = string.split('\n').map(item => item.toLocaleUpperCase()).filter(word => word.length === n)
    return words
  }

  function setLevels() {
    switch(count) {
      case 3:
        setLevel1(true)
        break
      case 5:
        setLevel1(false)
        setLevel2(true)
        break
      case 7:
        setLevel2(false)
        setLevel3(true)
        break
      case 9:
        setLevel3(false)
        setLevel4(true)
        break
      case 11:
        setLevel4(false)
        setLevel5(true)
        break
      case 13:
        setLevel5(false)
        setLevel6(true)
        break
      default:
        return
    }
  }

  useEffect(() => {
    setLevels()
  }, [count])

  function lettersDragStartHandler(event: any, letter: string, index: number ) {
    setCurrentIndex(index)
    setCurrentLetter(letter)
    setTimeout(() => {
      event.target.style.opacity = 0
    })
  }

  function lettersDragEndHandler(event: any) {
    event.preventDefault()
    event.target.style.opacity = 1
  }

  function dropZoneDragLeaveHandler(event: any) {
    event.preventDefault()
    event.target.style.opacity = 1
  }

  function dropZoneDragOverHandler(event: any) {
    event.preventDefault()
    if (event.target.classList.contains('drop-here')) {
      event.target.style.opacity = 0
    }
  }

  function dropZoneDropHandler(event: any) {    
    event.target.style.opacity = 1
    setDropArray([...dropArray, currentLetter])
    setArrayOfLetters(arrayOfLetters.filter((item: string, index: number) => index !== currentIndex))
  }

  function winResult() {
    setCount(state => state + 1)
    setResultText('WIN')
    setResult(true)
    setFadeOut(true)
    setNewGame(false)
    setTimeout(() => {
      setFadeOut(false)
      setTimeout(() => {
        setWord(randomWord)
        setResultText(randomWord)
        setFadeOut(true)
        setTimeout(() => {
          setFadeOut(false)
          setTimeout(() => {
            setNewGame(true)
            setResult(false)
            setArrayOfLetters(randomWord.split('').sort(() => Math.random() - 0.5))
            setDropArray([])
          }, 1000)
        }, 2000)
      }, 1000)
    }, 2000)
  }

  function looseResult() {
    setResultText('LOOSE')
    setResult(true)
    setFadeOut(true)
    setArrayOfLetters([])
    setTimeout(() => {
      setFadeOut(false)
      setTimeout(() => {
        setWord(word)
        setResultText(word)
        setFadeOut(true)
        setTimeout(() => {
          setFadeOut(false)
          setTimeout(() => {
            setResult(false)
            setArrayOfLetters(word.split('').sort(() => Math.random() - 0.5))
            setDropArray([])
          }, 1000)
        }, 2000)
      }, 1000)
    }, 1000)
  }

  function timeOutHandler() {
    setTimer(false)
    setLoose(true)
  }

  useEffect(() => {
    if (dropArray.length) {
      setTimer(true)
    }
  }, [dropArray])

  useEffect(() => {    
    
    if (dropArray.length === word.length) {

      if (dropArray.join('') === word) {
        setWin(true)
        setLoose(false)
        setTimer(false)

        setTimeout(() => {
          setWin(false)
        }, 0)
      } 

      else {
        setLoose(true)
        setWin(false)
        setTimer(false)

        setTimeout(() => {
          setLoose(false)
        }, 0)
      }
    }

  }, [dropArray])

  useEffect(() => {
    if (win) {
      setStartGame(false)
      winResult()
      setWin(false)
    }
  }, [win])

  useEffect(() => {
    if (loose) {
      looseResult()
      setLoose(false)
    }
  }, [loose])

  useEffect(() => {
    if (!count) {
      setNewGame(false)
      setResult(true)
      setFadeOut(true)
      setResultText('ПРИВЕТ')
      setWord('ПРИВЕТ')
  
      setTimeout(() => {
        setFadeOut(false)
        setNewGame(true)
  
        setTimeout(() => {
          setResult(false)
          setArrayOfLetters('ПРИВЕТ'.split(''))
        }, 1000)
      }, 2000)
    }
    else {
      setNewGame(false)
      setResult(true)
      setFadeOut(true)
      setResultText(word)
      setWord(word)
  
      setTimeout(() => {
        setFadeOut(false)
        setNewGame(true)
  
        setTimeout(() => {
          setResult(false)
          setArrayOfLetters(word.split('').sort(() => Math.random() - 0.5))
        }, 1000)
      }, 2000)
    }
   
  }, [])

  return (
    <div className="App">
      <div className='container'>

        {result ? <div className='overlay'></div> : ''}
        
        <Letters 
          newGame={newGame} 
          timer={timer}
          onTimeOut={timeOutHandler}
          result={result}
          resultText={resultText}
          fadeOut={fadeOut}
          arrayOfLetters={arrayOfLetters}
          lettersDragStartHandler={lettersDragStartHandler}
          lettersDragEndHandler={lettersDragEndHandler}
          level1={level1}
          level2={level2}
          level3={level3}
          level4={level4}
          level5={level5}
          level6={level6}
        />

        <DropZone
          startGame={startGame}
          newGame={newGame}
          dropArray={dropArray}
          dropZoneDragLeaveHandler={dropZoneDragLeaveHandler}
          dropZoneDragOverHandler={dropZoneDragOverHandler}
          dropZoneDropHandler={dropZoneDropHandler}
        />
      </div>
    </div>
  )
}

export default App;
