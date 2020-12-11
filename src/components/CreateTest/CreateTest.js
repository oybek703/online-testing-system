import React, {Component} from 'react';
import Input from "@components/UI/Input";
import Button from "@components/UI/Button";
import {connect} from "react-redux";
import {createQuestion, createQuiz} from "@src/redux/actions";

function createOptionValidationObject() {
    return  new Array(4).fill('').reduce((acc, _, index) => {
        acc[`option${index+1}Validation`] = {
           [`option${index+1}`]:'',
           isValid: false,
           [`isOption${index+1}Valid`]: false
       }
       return acc
    }, {})
}

function createQuestionValidationObject() {
    return {
        query:'',
        isQuestionValid: false,
        questionInValidityMessage: 'Question should have 5 characters at least!'
    }
}

function isFormValid(object, isQuestionValid) {
    return  ((Object.keys(object)
        .map((item) =>object[item]['isValid'])
        .filter(result => result).length === 4) && isQuestionValid)
}

export function createControlsObject() {
    return {
        isFormValidating: false,
        isQuestionValidation: false,
        optionsValidation: createOptionValidationObject(),
        questionValidation: createQuestionValidationObject()
    }
}

class CreateTest extends Component {

    state = {
        quizTitle:'My Quiz',
        rightAnswerId: 1,
        ...createControlsObject()
    }

    handleQuestionChange = (event) => {
        const {value} = event.target;
        const {questionValidation} = this.state;
        this.setState({
            isFormValidating: true,
            isQuestionValidation: true,
            questionValidation: {
                ... questionValidation,
                isQuestionValid: value.length >= 5,
                query:value
            }
        })
    }

    renderOptions = () => {
        const {optionsValidation, isFormValidating} = this.state;
        return Object.keys(optionsValidation).map((option, index) => {
            return (
                <Input
                    type='text'
                    labelText={`Option ${index+1}`}
                    isRequired={true}
                    isValidating={isFormValidating}
                    isValid={optionsValidation[`option${index+1}Validation`][`isValid`]}
                    isExactValidation={optionsValidation[`option${index+1}Validation`][`isOption${index+1}Valid`]}
                    onChange={(event) => this.handleOptionChange(event, index+1)}
                    invalidityMessage='Option should not be empty!'
                    value={optionsValidation[`option${index+1}Validation`][`option${index+1}`]}
                    key={option}/>
                )
        })
    }

    handleOptionChange = (event, index) => {
        const {optionsValidation} = this.state;
        const {value} = event.target;
        this.setState({
            isFormValidating:true,
            optionsValidation: {
                ...optionsValidation,
                [`option${index}Validation`]: {
                    [`option${index}`]: value,
                    isValid:value.trim() !== '',
                    [`isOption${index}Valid`]: true,
                }
            },
        })
    }

    handleSelect = (event) => {
        const {value} = event.target;
        this.setState({rightAnswerId: +value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {createNewQuestion} = this.props;
        createNewQuestion(this.state);
        this.setState({
            rightAnswerId: 1,
            ...createControlsObject()
        });
    }

    createQuiz = () => {
        const {createNewQuiz} = this.props;
        const {quizTitle} = this.state;
        createNewQuiz(quizTitle);
    }

    setQuizTitle = (event) => {
        const {value} = event.target;
        this.setState({quizTitle: value});
    }

    render() {
        const {
            rightAnswerId,
            isFormValidating,
            questionValidation: qv,
            isQuestionValidation,
            optionsValidation,
            quizTitle
        } = this.state;
        const {quiz, error} = this.props;
        const btnDisabledState = !isFormValid(optionsValidation, qv.isQuestionValid);
        return (
            <div className='mt-5'>
                <form
                    className='bg-white border border-light p-3 mt-3 rounded'
                    noValidate
                    onSubmit={this.handleSubmit}>
                    <Input
                        placeholder='Quiz title...'
                        type='text'
                        labelText='Enter quiz title(optional)'
                        value={quizTitle}
                        onChange={this.setQuizTitle}/>
                    <Input
                        type='text'
                        placeholder='Enter the question...'
                        labelText='Question'
                        isRequired={true}
                        isValidating={isFormValidating}
                        invalidityMessage={qv.questionInValidityMessage}
                        isValid={qv.isQuestionValid}
                        onChange={this.handleQuestionChange}
                        isExactValidation={isQuestionValidation}
                        value={qv.query}/>
                    <hr/>
                    { this.renderOptions() }
                    <label
                        className='text-muted h6 font-italic'
                        htmlFor='rightAnswer'>
                        Choose right answer:
                    </label>
                    <select
                        className='custom-select mb-3'
                        value={rightAnswerId}
                        onChange={this.handleSelect}
                        id='rightAnswer'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    {
                        error && <p className='text-danger mb-3 mt-n3 fon-italic'>{error}</p>
                    }
                    <Button
                        text='Add question'
                        btnType='primary'
                        type='submit'
                        onClick={this.handleSubmit}
                        disabled={btnDisabledState}/>
                    <Button
                        text='Create test'
                        btnType='danger'
                        type='button'
                        disabled={!quiz.length}
                        onClick={this.createQuiz}/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({createTest}) => {
    return {
        quiz: createTest.quiz,
        error: createTest.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewQuestion: (state) => dispatch(createQuestion(state)),
        createNewQuiz: (title) => dispatch(createQuiz(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);