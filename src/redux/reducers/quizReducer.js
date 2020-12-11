import {FETCH_TESTS_ERROR, FETCH_TESTS_START, FETCH_TESTS_SUCCESS} from "@src/redux/actionTypes";

const initialState = {
    quiz:{},
    loading:true,
    error: null
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TESTS_START:
            return {... state, loading: true}
        case FETCH_TESTS_SUCCESS:
            return {... state, quiz: action.quizes, loading: false,}
        case FETCH_TESTS_ERROR:
            return {... state, error: action.error, loading: false}
        default:
            return state
    }
}

export default quizReducer;