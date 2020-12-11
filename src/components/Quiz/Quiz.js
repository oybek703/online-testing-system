import React, {Component, Fragment} from 'react';
import ActiveQuiz from "@components/ActiveQuiz";
import FinishedQuiz from "@components/FinishedQuiz";
import Loader from "@components/UI/Loader";
import {connect} from "react-redux";
import {fetchQuestions, handleAnswerClick, handleRetryClick} from "@src/redux/actions";

class Quiz extends Component {

    componentDidMount() {
        const {id} = this.props.match.params
        const {fetchQuestions} = this.props;
        fetchQuestions(id);
    }

    componentWillUnmount() {
        const {handleRetry} = this.props;
        handleRetry();
    }

    handleAnswerClick = (answerId) => {
        const {handleAnswer} = this.props;
        handleAnswer(answerId);
    }

    handleRetryClick = () => {
        const {handleRetry} = this.props;
        handleRetry();
    }

    render() {
        const {questions, activeQuestion, answerState, isFinished, results, loading, error} = this.props;

        if(loading) {
            return <Loader/>
        }

        if(!questions) {
            return <h5 className='text-muted text-white-50 font-italic'>Not found...</h5>
        }

        return (
            <div className='mt-5 col-sm col-md-8 mx-md-auto'>
                {
                    error && <h5 className='text-muted text-white-50 font-italic'>{error}</h5>
                }
                {
                    isFinished
                        ? <FinishedQuiz
                            results={results}
                            questions={questions}
                            onRetry={this.handleRetryClick}/>
                        : (
                            <Fragment>
                                <h2 className='text-white text-left'>Answer the question:</h2>
                                <ActiveQuiz
                                    currentQuestion={activeQuestion+1}
                                    answers={questions[activeQuestion].answers}
                                    question={questions[activeQuestion].query}
                                    allQuestions={questions.length}
                                    onAnswerClick={this.handleAnswerClick}
                                    answerState={answerState}/>
                            </Fragment>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = ({activeTest}) => {
    return {
        results:activeTest.results,
        isFinished:activeTest.isFinished,
        activeQuestion: activeTest.activeQuestion,
        answerState:activeTest.answerState,
        questions: activeTest.questions,
        loading: activeTest.loading,
        error: activeTest.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuestions: (id) => dispatch(fetchQuestions(id)),
        handleAnswer: (answerId) => dispatch(handleAnswerClick(answerId)),
        handleRetry: () => dispatch(handleRetryClick())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);