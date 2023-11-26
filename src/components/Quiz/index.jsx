import { useEffect, useState } from 'react';
import { drop } from '../../data/drop';
import { Result } from '../Result';
import './styles.css';

export const Quiz = () => {
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [score, setScore] = useState(0);
	const [correctAnswer, setCorrectAnswer] = useState(0);
	const [clickedIndex, setClickedIndex] = useState(null);
	const [timer, setTimer] = useState(20);
	const [currentOptions, setCurrentOptions] = useState([]);

	useEffect(() => {
		const currentOptionsEnriched = drop[
			currentQuestionNumber
		].answerOptions.map((option) => {
			return { ...option, className: 'btn' };
		});

		setCurrentOptions(currentOptionsEnriched);
	}, [currentQuestionNumber]);

	const onOptionSelect = (isCorrect, index) => {
		setCurrentOptions((prev) => {
			const updatedOptions = prev.map((option) => {
				if (option.id === index) {
					return {
						...option,
						className: isCorrect ? 'btn btn--success' : 'btn btn--failed',
					};
				} else return option;
			});

			return updatedOptions;
		});

		if (isCorrect) {
			setScore((prev) => prev + 10);
			setCorrectAnswer((prev) => prev + 1);
		}

		setClickedIndex(index);

		const next = currentQuestionNumber + 1;
		setTimeout(() => {
			if (next < drop.length) {
				setCurrentQuestionNumber(next);
				setClickedIndex(null);
				setTimer(20);
			} else {
				setQuizCompleted(true);
				setClickedIndex(null);
			}
		}, 1000);
	};

	const handleReturn = () => {
		setQuizCompleted(false);
		setCurrentQuestionNumber(0);
		setScore(0);
		setClickedIndex(null);
		setCorrectAnswer(0);
		setTimer(20);
	};

	useEffect(() => {
		const next = currentQuestionNumber + 1;
		const numberCount = timer - 1;
		const interval = setInterval(() => {
			if (numberCount > 0) {
				setTimer(numberCount);
			}
			if (numberCount === 0 && next < drop.length) {
				setCurrentQuestionNumber(next);
				setTimer(20);
			} else if (currentQuestionNumber >= drop.length) {
				setQuizCompleted(true);
				setClickedIndex(null);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [timer]);

	return (
		<div className='quiz-container'>
			{quizCompleted ? (
				<Result
					score={score}
					handleReturn={handleReturn}
					correctAnswer={correctAnswer}
				/>
			) : (
				<>
					<div className='quiz-header'>
						<p>
							Question {currentQuestionNumber + 1}/{drop.length}
						</p>
						<span>{timer}</span>
					</div>
					<div>
						<h2>{drop[currentQuestionNumber].questionText}</h2>
						<div className='option-container'>
							{currentOptions.map((option) => (
								<OptionButton
									key={option.id}
									option={option}
									disabled={clickedIndex}
									onOptionSelect={onOptionSelect}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

const OptionButton = ({ option, disabled, onOptionSelect }) => {
	return (
		<button
			disabled={disabled}
			onClick={() => onOptionSelect(option.isCorrect, option.id)}
			className={option.className}
		>
			{option.answerText}
		</button>
	);
};
