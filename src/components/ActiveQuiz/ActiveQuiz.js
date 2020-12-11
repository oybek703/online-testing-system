import React from 'react';
import AnswerList from "@components/AnswerList";

const ActiveQuiz = ({answers, question, onAnswerClick, currentQuestion, allQuestions, answerState}) => {
    return(
        <div className='card'>
            <div className="card-body">
                <p className='card-header d-flex justify-content-between rounded bg-info text-white'>
                    <span>{currentQuestion}. {question}</span>
                    <small>{currentQuestion} of {allQuestions}</small>
                </p>
                <AnswerList
                    answers={answers}
                    onAnswerClick={onAnswerClick}
                    answerState={answerState}
                    />
            </div>
        </div>
    )
}

export default ActiveQuiz;