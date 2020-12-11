import axios from 'axios';
import {
    AUTH_ERROR,
    AUTH_SUCCESS, AUTO_LOGOUT,
    CHANGE_QUESTION, CREATE_QUESTION, CREATE_QUESTION_ERROR,
    FETCH_QUESTIONS_START,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_TESTS_ERROR,
    FETCH_TESTS_START,
    FETCH_TESTS_SUCCESS, RESET_QUIZ_CREATION, RESET_QUIZ_STATE, SET_ANSWER_STATE, SET_QUIZ_FINISHED
} from "@src/redux/actionTypes";

// actions for fetching tests
const fetchTestsStart = () => {
    return {
        type: FETCH_TESTS_START
    }
}

const fetchTestsSuccess = (quizes) => {
    return {
        type: FETCH_TESTS_SUCCESS,
        quizes
    }
}

const fetchTestsError = (error) => {
    return {
        type: FETCH_TESTS_ERROR,
        error
    }
}

export const fetchTests = () => {
    return async (dispatch) => {
        dispatch(fetchTestsStart())
        try {
            const response = await axios.get('https://teststudentsonline-default-rtdb.firebaseio.com/quizes.json');
            const quizes = response.data;
            dispatch(fetchTestsSuccess(quizes))
        } catch (error) {
            const {response} = error;
            if(!response){
                dispatch(fetchTestsError('Error, no network connection!'));
            } else {
                console.log(error);
                dispatch(fetchTestsError('Not found...'));
            }
        }
    }
}

// actions for  questions
const fetchQuestionStart = () => {
    return {
        type: FETCH_QUESTIONS_START
    }
}

const fetchQuestionSuccess = (questions) => {
    return {
        type: FETCH_QUESTIONS_SUCCESS,
        questions
    }
}

const fetchQuestionError = (message) => {
    return {
        type: FETCH_TESTS_ERROR,
        message
    }
}

export const fetchQuestions = (id) => {
    return async (dispatch) => {
        try{
            dispatch(fetchQuestionStart());
            const response = await axios.get(`https://teststudentsonline-default-rtdb.firebaseio.com/quizes/${id}.json`);
            const newQuiz = response.data;
            const {quiz:newQuestions} = newQuiz;
            dispatch(fetchQuestionSuccess(newQuestions))
        } catch (error) {
            const {response} = error;
            if(!response) {
                dispatch(fetchQuestionError('Error, no network connection!'))
            } else {
                dispatch(fetchQuestionError('Not found...'));
            }
        }

    }
}

const setAnswerState = (answerType, newResults, answerId) => {
    return {
        type: SET_ANSWER_STATE,
        answerType,
        newResults,
        answerId
    }
}

const setQuizFinished = () => {
    return {
        type: SET_QUIZ_FINISHED
    }
}

const changeQuestion = (activeQuestion) => {
    return {
        type: CHANGE_QUESTION,
        activeQuestion
    }
}

const isQuizFinished = (activeQuestion, questions) => activeQuestion+1 === questions.length;

export const handleAnswerClick = (answerId) => {
    return (dispatch, getState) => {
        const { answerState, questions, activeQuestion, results } = getState().activeTest;
        if(answerState) {
            const [key] = Object.keys(answerState);
            if(answerState[key] === 'right') {
                return
            }
        }
        const currentQuestion = questions[activeQuestion];
        let newResults = {... results};
        if (currentQuestion.rightAnswer === answerId) {
            if(!results[currentQuestion.questionId]) {
                newResults[currentQuestion.questionId] = 'right';
            }
            dispatch(setAnswerState('right', newResults, answerId));
            const timeout = setTimeout(() => {
                if(isQuizFinished(activeQuestion, questions)) {
                    dispatch(setQuizFinished())
                }
                else {
                    dispatch(changeQuestion(activeQuestion))
                }
                clearTimeout(timeout);
            },100)
        }
        else {
            newResults[currentQuestion.questionId] = 'wrong';
            dispatch(setAnswerState('wrong', newResults, answerId))
        }
    }
}

export const handleRetryClick = () => {
    return {
        type: RESET_QUIZ_STATE
    }
}

//action for creating question
const createNewQuestion = (newQuiz, title) => {
    return {
        type: CREATE_QUESTION,
        newQuiz,
        title
    }
}

export const createQuestion = (state) => {
    return (dispatch, getState) => {
        const { quiz } = getState().createTest;
        const {questionValidation, rightAnswerId, optionsValidation, quizTitle} = state;
        const newQuiz = [...quiz];
        const newQuestion = {
            query: questionValidation.query,
            rightAnswer: rightAnswerId,
            questionId: Date.now(),
            answers: Object.keys(optionsValidation)
                .reduce((acc, option, index) => {
                    acc.push({
                        text:optionsValidation[option][`option${index+1}`],
                        id:index+1
                    })
                    return acc
                }, []),
        }
        newQuiz.push(newQuestion);
        dispatch(createNewQuestion(newQuiz, quizTitle));
    }
}

const resetQuizCreation = () => {
    return {
        type: RESET_QUIZ_CREATION
    }
}

const quizCreationError = (message) => {
    return {
        type: CREATE_QUESTION_ERROR,
        message
    }
}

export const createQuiz = (title) => {
    return async (dispatch, getState) => {
        const {quiz, quizInfo} = getState().createTest;
        const newQuizInfo = {
            ... quizInfo,
            createdAt: new Date().getTime(),
            title
        }
        try {
            await axios.post('https://teststudentsonline-default-rtdb.firebaseio.com/quizes.json',
                {quiz, quizInfo:newQuizInfo}
                );
            dispatch(resetQuizCreation())
        } catch (error) {
            const {response} = error
            if(!response) {
                dispatch(quizCreationError('Error, no network connection!'));
            } else {
                dispatch(quizCreationError('Error, try again later...'));
            }
        }
    }
}

// actions for authorization
export const autoLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTO_LOGOUT
    }
}

const autoLogout = (time) => {
    return  dispatch =>(
        setTimeout(() => {
            dispatch(logout());
        },time*1000)
    )
}

export const authError = (message) => {
    return {
        type: AUTH_ERROR,
        message
    }
}

export const auth = (email, password, isLogin) => {
    return async  (dispatch) => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2y37MZI7zZKhqAdXjJTg7TZbvnFLi1ZE';
        if(!isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2y37MZI7zZKhqAdXjJTg7TZbvnFLi1ZE'
        }

        try {
            const response =  await axios.post(url, authData);
            const {expiresIn, idToken: token, localId: userId} = response.data;
            const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(autoLogout(expiresIn));
        } catch (error) {
            if(error) {
                dispatch(authError('Network error, no connection!'))
            }
            const {status, } = error.response;
            if(status === 400) {
                dispatch(authError('Invalid email or password!'));
            }
        }

    }
}

