import { configureStore } from "@reduxjs/toolkit";
import authenticatedReducer from "../features/Authenticated/AuthenticatedSlice";
import profileReducer from "../features/Profile/ProfileSlice";
import paginateReducer from "../features/Paginate/PaginateSlice";
import processManagementReducer from "../features/ProcessManagement/ProcessManagementSlice";
import workPlanManagementReducer from "../features/WorkPlanManagement/WorkPlanManagementSlice";


export default configureStore({
    reducer: {
        authenticated: authenticatedReducer,
        profile: profileReducer,
        paginate: paginateReducer,
        processManagement: processManagementReducer,
        workPlanManagement: workPlanManagementReducer,
    }
});