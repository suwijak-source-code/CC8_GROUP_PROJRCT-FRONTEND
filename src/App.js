import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterContainer from "./containers/footer/FooterContainer";
import NavbarContainer from "./containers/navbar/NavbarContainer";
import ProcessManagement from "./containers/adminPageContainer/processManagement/ProcessManagement";
import EmployeesManagement from "./containers/adminPageContainer/employeesManagement/EmployeesManagement";
import AddEmployee from "./components/adminPageComponent/employeesManagement/addEmployee/AddEmployeeComponent";
import EditEmployee from "./components/adminPageComponent/employeesManagement/EditEmployee/EditEmployeeComponent";
import WorkPlanManagement from "./containers/adminPageContainer/workPlanManagement/WorkPlanManagement";
import GardenerJob from "./containers/gardenerPageContainer/gardenerJob/GardenerJob";

const privateAdminRoutes = [
  {
    path: '/process-management',
    component: ProcessManagement
  },
  {
    path: '/employees-management',
    component: EmployeesManagement
  },
  {
    path: '/add-employees',
    component: AddEmployee
  },
  {
    path: '/edit-employees',
    component: EditEmployee
  },
  {
    path: '/work-plan-management',
    component: WorkPlanManagement
  }
];

const privateGardenerRoutes = [
  {
    path: '/gardener-job',
    component: GardenerJob
  }
];

const privateSalesRoutes = [

];

const publicRoutes = [

];

function App() {
  const isAuthenticated = useSelector((state) => state.authenticated.isAuthenticated);
  const role = useSelector((state) => state.authenticated.role);

  return (
    <BrowserRouter>
      <div >
        <NavbarContainer />
        <div>
          <Switch>
            {isAuthenticated && role === 'admin' && privateAdminRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
            {isAuthenticated && role === 'gardener' && privateGardenerRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
            {isAuthenticated && role === 'sales' && privateSalesRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
            {!isAuthenticated && publicRoutes.map((el, index) => <Route key={index} exact path={el.path} component={el.component} />)}
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>

  );
}

export default App;
