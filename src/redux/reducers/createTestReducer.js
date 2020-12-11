import {CREATE_QUESTION, CREATE_QUESTION_ERROR, RESET_QUIZ_CREATION} from "@src/redux/actionTypes";
import {createControlsObject} from "@components/CreateTest";

const initialState = {
    quiz: [],
    error: null,
    quizInfo: {
        title: '',
        createdAt:null
    }
}

const createTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                ...state,
                quiz: action.newQuiz,
                quizInfo: {
                    ...state.quizInfo,
                    title: action.title
                },
                rightAnswerId: 1,
                ...createControlsObject()
            }
        case RESET_QUIZ_CREATION:
            return {
                ... state,
                quiz: [],
                rightAnswerId: 1,
                error:null,
                ...createControlsObject()
            }
        case CREATE_QUESTION_ERROR:
            return {
                ... state,
                error: action.message
            }
        default:
            return state
    }
}

export default createTestReducer;