import { useEffect, useState } from 'react';
import { drop } from '../../data/drop';
import { Result } from '../Result';
import './styles.css';

export const Quiz = () => {
    const [count, setCount] = useState(0);
    const [result, setResult] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const [clickedIndex, setClickedIndex] = useState(null);
    const [timer, setTimer] = useState(20);

    const handleClick = (isCorrect, index) => {

        if (isCorrect) {
            setScore((prev) => prev + 10);
            setCorrectAnswer((prev) => prev + 1);
        }

        setClickedIndex(index);

        const next = count + 1;
        if (next < drop.length) {
            setTimeout(() => {
                setCount(next);
                setClickedIndex(null);
                setTimer(20)
            }, 1000);
        } else {
            setResult(true);
            setClickedIndex(null);
        }

    };

    const handleReturn = () => {
        setResult(false);
        setCount(0);
        setScore(0);
        setClickedIndex(null);
        setCorrectAnswer(0);
        setTimer(20)
    };

    useEffect(() => {
        const next = count + 1;
        const numberCount = timer - 1
        const interval = setInterval(() => {
            if (numberCount > 0) {
                setTimer(numberCount);
            }
            if (numberCount === 0 && next < drop.length) {
                setCount(next);
                setTimer(20);
            } else if (count >= drop.length) {

                setResult(true);
                setClickedIndex(null);


            }
        }, 1000)
        return () => clearInterval(interval);
    }, [timer])

    return (
        <div className='quiz-container'>
            {result ? (
                <Result score={score} handleReturn={handleReturn} correctAnswer={correctAnswer} />
            ) : (
                <>
                    <div className='quiz-header'>
                        <p>Question {count + 1}/{drop.length}</p>
                        <span>{timer}</span>
                    </div>
                    <div >
                        <h2>{drop[count].questionText}</h2>
                        <div className='option-container'>
                            {drop[count].answerOptions.map((option, index) => (
                                <button
                                    disabled={clickedIndex}
                                    key={index}
                                    onClick={() => handleClick(option.isCorrect, index)}
                                    className={clickedIndex === index ? (option.isCorrect ? 'btn btn--success' : 'btn btn--failed') : 'btn'}
                                >
                                    {option.answerText}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};









