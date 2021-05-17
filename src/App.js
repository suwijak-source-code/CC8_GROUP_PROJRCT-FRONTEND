import { BrowserRouter, Route, Switch } from "react-router-dom";
import FooterContainer from "./containers/footer/FooterContainer";
import NavbarContainer from "./containers/navbar/NavbarContainer";
import CreateOrderContainer from "./containers/order/CreateOrderContainer";
import OrderContainer from "./containers/order/OrderContainer";
import SingleOrderContainer from "./containers/order/SingleOrderContainer";

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
            <Route exact path="/order/:id" component={SingleOrderContainer} />
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
