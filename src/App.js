import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterContainer from "./containers/footer/FooterContainer";
import NavbarContainer from "./containers/navbar/NavbarContainer";
import ProcessManagement from "./containers/adminPageContainer/processManagement/ProcessManagement";
import EmployeesManagement from "./containers/adminPageContainer/employeesManagement/EmployeesManagement";
import AddEmployee from "./components/adminPageComponent/employeesManagement/addEmployee/AddEmployeeComponent";
import EditEmployee from "./components/adminPageComponent/employeesManagement/EditEmployee/EditEmployeeComponent";
import WorkPlanManagement from "./containers/adminPageContainer/workPlanManagement/WorkPlanManagement";
import GardenerJob from "./containers/gardenerPageContainer/gardenerJob/GardenerJob";
import CreateOrderContainer from "./containers/order/CreateOrderContainer";
import InventoryContainer from "./containers/inventory/InventoryContainer";
import OrderContainer from "./containers/order/OrderContainer";
import SingleOrderContainer from "./containers/order/SingleOrderContainer";
import EditOrderContainer from "./containers/order/EditOrderContainer";
import EditProductContainer from "./containers/inventory/EditProductContainer";
import CreateProductContainer from "./containers/inventory/CreateProductContainer";
import InventoryMovement from "./containers/inventory/InventoryMovement";
import HomeContainer from "./containers/home/home";
import AboutUsContainer from "./containers/aboutUs/aboutUs";
import Customer from "./containers/customer/Customer";
import CreateCustomer from "./containers/customer/CreateCustomer";
import EditCustomer from "./containers/customer/EditCustomer";
import Farm from "./containers/farm(Nat)/Farm";
import SinglePlantingPage from "./containers/farm(Nat)/SinglePlantingPage";

const privateAdminRoutes = [
  {
    path: "/process-management",
    component: ProcessManagement,
  },
  {
    path: "/employees-management",
    component: EmployeesManagement,
  },
  {
    path: "/add-employees",
    component: AddEmployee,
  },
  {
    path: "/edit-employees",
    component: EditEmployee,
  },
  {
    path: "/work-plan-management",
    component: WorkPlanManagement,
  },
  {
    path: "/order",
    component: OrderContainer,
  },
  {
    path: "/order/create",
    component: CreateOrderContainer,
  },
  {
    path: "/order/edit/:id",
    component: EditOrderContainer,
  },
  {
    path: "/order/:id",
    component: SingleOrderContainer,
  },
  {
    path: "/inventory",
    component: InventoryContainer,
  },
  {
    path: "/movement",
    component: InventoryMovement,
  },
  {
    path: "/movement/:id",
    component: InventoryMovement,
  },
  {
    path: "/product/edit/:id",
    component: EditProductContainer,
  },
  {
    path: "/product/create",
    component: CreateProductContainer,
  },
  {
    path: "/customer",
    component: Customer,
  },
  {
    path: "/customer/create",
    component: CreateCustomer,
  },
  {
    path: "/customer/:id",
    component: EditCustomer,
  },
  {
    path: "/farm",
    component: Farm,
  },
  {
    path: "/planting/:id",
    component: SinglePlantingPage,
  },
];

const privateGardenerRoutes = [
  {
    path: "/gardener-job",
    component: GardenerJob,
  },
];

const privateSalesRoutes = [
  {
    path: "/order",
    component: OrderContainer,
  },
  {
    path: "/order/create",
    component: CreateOrderContainer,
  },
  {
    path: "/order/edit/:id",
    component: EditOrderContainer,
  },
  {
    path: "/order/:id",
    component: SingleOrderContainer,
  },
  {
    path: "/inventory",
    component: InventoryContainer,
  },
  {
    path: "/movement",
    component: InventoryMovement,
  },
  {
    path: "/movement/:id",
    component: InventoryMovement,
  },
  {
    path: "/product/edit/:id",
    component: EditProductContainer,
  },
  {
    path: "/product/create",
    component: CreateProductContainer,
  },
  {
    path: "/customer",
    component: Customer,
  },
  {
    path: "/customer/create",
    component: CreateCustomer,
  },
  {
    path: "/customer/:id",
    component: EditCustomer,
  },
  {
    path: "/farm",
    component: Farm,
  },
];

const publicRoutes = [
  {
    path: "/",
    component: HomeContainer,
  },
  {
    path: "/about-us",
    component: AboutUsContainer,
  },
];

function App() {
  const isAuthenticated = useSelector(
    (state) => state.authenticated.isAuthenticated
  );
  const role = useSelector((state) => state.authenticated.role);

  return (
    <BrowserRouter>
      <div>
        <NavbarContainer />
        <div>
          <Switch>
            {isAuthenticated &&
              role === "admin" &&
              privateAdminRoutes.map((el, index) => (
                <Route
                  key={index}
                  exact
                  path={el.path}
                  component={el.component}
                />
              ))}
            {isAuthenticated &&
              role === "gardener" &&
              privateGardenerRoutes.map((el, index) => (
                <Route
                  key={index}
                  exact
                  path={el.path}
                  component={el.component}
                />
              ))}
            {isAuthenticated &&
              role === "sales" &&
              privateSalesRoutes.map((el, index) => (
                <Route
                  key={index}
                  exact
                  path={el.path}
                  component={el.component}
                />
              ))}
            {!isAuthenticated &&
              publicRoutes.map((el, index) => (
                <Route
                  key={index}
                  exact
                  path={el.path}
                  component={el.component}
                />
              ))}
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
