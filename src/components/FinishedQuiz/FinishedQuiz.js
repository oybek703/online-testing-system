import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Button from "@components/UI/Button";

const FinishedQuiz = ({results, questions, onRetry}) => {
    const rightAnswers  = questions.reduce((total, nextQuestion) =>{
        if(results[nextQuestion.questionId] === 'right') {
            total++;
        }
        return total;
    }, 0)
    return(
        <Fragment>
            <h2 className='text-white'>Results:</h2>
            <div className='card'>
                <div className="card-body">
                    <ul className='list-group'>
                        {
                            questions.map((question, index) => {
                                return(
                                    <li
                                        className='d-flex justify-content-between'
                                        key={`${question.questionId}-${index}`}>
                                        {index+1}.{question.query}
                                        {
                                            results[`${question.questionId}`] === 'right'
                                            ? (
                                                <span className='text-success'>
                                                    <i className='material-icons'>check</i>
                                                </span>
                                                )
                                            : (
                                                    <span className='text-danger'>
                                                        <i className='material-icons'>clear</i>
                                                    </span>
                                                )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p className='h6 my-3 font-italic text-muted'>Right answers: {rightAnswers} of {questions.length}</p>
                    <Button text='Retry' btnType='success' type='button' onClick={onRetry}/>
                    <Link to='/'>
                        <Button text='Go to tests' btnType='primary' type='button'/>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default FinishedQuiz;