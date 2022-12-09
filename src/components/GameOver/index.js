import './gameOver.css'

const GameOver = ({restartGame,score}) => {
  return (
    <div>
      <h2>Fim de jogo</h2>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={restartGame}>Finalizar</button>
    </div>
  )
}

export default GameOver
