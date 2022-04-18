import { useTypedSelector } from '../hooks/useTypedSelector';

export function Result() {

  const state = useTypedSelector(state => state.result)
  
  return (
    <div className={state.showResult ? 'result result_active' : 'result'}>
      <h1 className={state.fadeOutText ? 'result__text result__text_active' : 'result__text'}>{state.resultText}</h1>
    </div>
  )
}