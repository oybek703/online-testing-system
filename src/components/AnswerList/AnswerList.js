import React from "react";
import AnswerListItem from "@components/AnswerListItem";

const AnswerList = ({ answers, onAnswerClick, answerState }) => {
    return(
        <ul className='list-unstyled'>
            {
                answers.map((answer, index) => {
                    const classes = [
                        !answerState
                            ? `btn-outline-secondary`
                            : (!answerState[answer.id]
                                ? 'btn-outline-secondary'
                                : (answerState[answer.id] === 'right'
                                    ? 'btn-success'
                                    : 'btn-danger'
                                )
                            )
                    ].join(' ');
                    return(
                        <li
                            className=
                                {
                                    `btn btn-block text-left my-1 ${classes}`
                                }
                            key={`${answer.text}+${index}`}
                            onClick={() =>onAnswerClick(answer.id)}>
                            <AnswerListItem
                                answer={answer}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default AnswerList;