interface Result {
  result: boolean,
  resultText: string,
  fadeOut: boolean
}

export function Result(props: Result) {
  return (
    <div className={props.result ? 'result result_active' : 'result'}>
      <h1 className={props.fadeOut ? 'result__text result__text_active' : 'result__text'}>{props.resultText}</h1>
    </div>
  )
}