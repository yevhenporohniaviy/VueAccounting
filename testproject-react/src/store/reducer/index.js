import { combineReducers } from "redux";

import todoReducer from "./usersReducer";

const rootReducer = combineReducers({todoReducer})

export default rootReducer
