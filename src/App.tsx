import { useEffect, useState } from 'react';
import './App.css';
import { DropZone } from './components/DropZone';
import { Letters } from './components/Letters';
import { string } from './constants/words';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {

  const [level1, setLevel1] = useState(false)
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(false)
  const [level4, setLevel4] = useState(false)
  const [level5, setLevel5] = useState(false)
  const [level6, setLevel6] = useState(false)
  const [level7, setLevel7] = useState(false)
  

  const randomWord = returnWords()[Math.floor(Math.random() * returnWords().length)]
  const [word, setWord] = useState(randomWord)

  const [dropArray, setDropArray] = useState<string[]>([])
  const [arrayOfLetters, setArrayOfLetters] = useState<string[] | []>([])

  const [currentLetter, setCurrentLetter] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const [win, setWin] = useState<boolean>(false)
  const [loose, setLoose] = useState<boolean>(false)

  const [startGame, setStartGame] = useState(true)
  const [newGame, setNewGame] = useState<boolean>(false)

  const [count, setCount] = useState(0)

  const {showResult, setResultText, setFadeOutText} = useActions()
  const {setStartTimer} = useActions()

  const resultState = useTypedSelector(state => state.result)
  const timeOut = useTypedSelector(state => state.timer.timeOut)

 
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
    showResult(true)
    setFadeOutText(true)
    setNewGame(false)
    setTimeout(() => {
      setFadeOutText(false)
      setTimeout(() => {
        setWord(randomWord)
        setResultText(randomWord)
        setFadeOutText(true)
        setTimeout(() => {
          setFadeOutText(false)
          setTimeout(() => {
            setNewGame(true)
            showResult(false)
            setArrayOfLetters(randomWord.split('').sort(() => Math.random() - 0.5))
            setDropArray([])
          }, 1000)
        }, 2000)
      }, 1000)
    }, 2000)
  }

  function looseResult() {
    setResultText('LOOSE')
    showResult(true)
    setFadeOutText(true)
    setArrayOfLetters([])
    setTimeout(() => {
      setFadeOutText(false)
      setTimeout(() => {
        setWord(word)
        setResultText(word)
        setFadeOutText(true)
        setTimeout(() => {
          setFadeOutText(false)
          setTimeout(() => {
            showResult(false)
            setArrayOfLetters(word.split('').sort(() => Math.random() - 0.5))
            setDropArray([])
          }, 1000)
        }, 2000)
      }, 1000)
    }, 1000)
  }

  useEffect(() => {
    if (dropArray.length) {
      setStartTimer(true)
    }
  }, [dropArray])

  useEffect(() => {    
    
    if (dropArray.length === word.length) {

      if (dropArray.join('') === word) {
        setWin(true)
        setLoose(false)
        setStartTimer(false)

        setTimeout(() => {
          setWin(false)
        }, 0)
      } 

      else {
        setLoose(true)
        setWin(false)
        setStartTimer(false)

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
    if (timeOut) {
      looseResult()
      setLoose(false)
    }
  }, [timeOut])

  useEffect(() => {
    if (!count) {
      setNewGame(false)
      showResult(true)
      setFadeOutText(true)
      setResultText('ПРИВЕТ')
      setWord('ПРИВЕТ')
  
      setTimeout(() => {
        setFadeOutText(false)
        setNewGame(true)
  
        setTimeout(() => {
          showResult(false)
          setArrayOfLetters('ПРИВЕТ'.split(''))
        }, 1000)
      }, 2000)
    }
    else {
      setNewGame(false)
      showResult(true)
      setFadeOutText(true)
      setResultText(word)
      setWord(word)
  
      setTimeout(() => {
        setFadeOutText(false)
        setNewGame(true)
  
        setTimeout(() => {
          showResult(false)
          setArrayOfLetters(word.split('').sort(() => Math.random() - 0.5))
        }, 1000)
      }, 2000)
    }
   
  }, [])

  return (
    <div className="App">
      <div className='container'>

        {resultState.showResult ? <div className='overlay'></div> : ''}
        
        <Letters 
          newGame={newGame} 
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
