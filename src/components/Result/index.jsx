import { drop } from '../../data/drop';


export const Result = ({ score, handleReturn, correctAnswer }) => {

    return (
        <div className='result-container'>
            <h2>You have completed the quiz!</h2>
            <h3>Totol Score {score}/100</h3>
            <h3>You answered {correctAnswer} questions out of {drop.length} correctly.</h3>
            <button className='btn' onClick={handleReturn}>Play Again</button>
        </div>
    )
}