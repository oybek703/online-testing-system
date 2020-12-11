import {
    CHANGE_QUESTION, FETCH_QUESTIONS_ERROR,
    FETCH_QUESTIONS_START,
    FETCH_QUESTIONS_SUCCESS, RESET_QUIZ_STATE,
    SET_ANSWER_STATE,
    SET_QUIZ_FINISHED
} from "@src/redux/actionTypes";

const initialState = {
    results: {},
    isFinished:false,
    activeQuestion: 0,
    answerState:null,
    questions: [],
    loading: true,
    error: null
}

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS_START:
            return {
                ... state,
                loading: true
            }
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ... state,
                loading: false,
                questions: action.questions
            }
        case FETCH_QUESTIONS_ERROR:
            return {
                ... state,
                loading: false,
                error: action.message
            }
        case SET_ANSWER_STATE:
            return {
                ... state,
                answerState:{[action.answerId]: action.answerType},
                results: action.newResults
            }
        case SET_QUIZ_FINISHED:
            return {
                ... state,
                isFinished: true
            }
        case CHANGE_QUESTION:
            return {
                ... state,
                activeQuestion: action.activeQuestion+1,
                answerState: null
            }
        case RESET_QUIZ_STATE:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                results: {},
                isFinished: false
            }
        default:
            return state
    }
}

export default testReducer;