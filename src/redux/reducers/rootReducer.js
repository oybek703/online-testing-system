import {combineReducers} from "redux";
import quizReducer from "@src/redux/reducers/quizReducer";
import testReducer from "@src/redux/reducers/testReducer";
import createTestReducer from "@src/redux/reducers/createTestReducer";
import {authReducer} from "@src/redux/reducers/authReducer";


const rootReducer = combineReducers({
    testList: quizReducer,
    activeTest: testReducer,
    createTest:createTestReducer,
    auth: authReducer
})

export default rootReducer;