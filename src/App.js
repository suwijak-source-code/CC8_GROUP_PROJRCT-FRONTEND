import { BrowserRouter, Route, Switch } from "react-router-dom";
import FooterContainer from "./containers/footer/FooterContainer";
import NavbarContainer from "./containers/navbar/NavbarContainer";
import CreateOrderContainer from "./containers/order/CreateOrderContainer";
import InventoryContainer from "./containers/inventory/InventoryContainer";
import OrderContainer from "./containers/order/OrderContainer";
import SingleOrderContainer from "./containers/order/SingleOrderContainer";
import EditOrderContainer from "./containers/order/EditOrderContainer";
import EditProductContainer from "./containers/inventory/EditProductContainer";
import CreateProductContainer from "./containers/inventory/CreateProductContainer";
import InventoryMovement from "./containers/inventory/InventoryMovement";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarContainer />
        <div>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/order" component={OrderContainer} />
            <Route
              exact
              path="/order/create"
              component={CreateOrderContainer}
            />
            <Route
              exact
              path="/order/edit/:id"
              component={EditOrderContainer}
            />
            <Route exact path="/order/:id" component={SingleOrderContainer} />
            <Route exact path="/inventory" component={InventoryContainer} />
            <Route exact path="/movement" component={InventoryMovement} />
            <Route exact path="/movement/:id" component={InventoryMovement} />
            <Route
              exact
              path="/product/edit/:id"
              component={EditProductContainer}
            />
            <Route
              exact
              path="/product/create"
              component={CreateProductContainer}
            />
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
