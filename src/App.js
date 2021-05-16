import { BrowserRouter, Route, Switch } from "react-router-dom";
import FooterContainer from "./containers/footer/FooterContainer";
import NavbarContainer from "./containers/navbar/NavbarContainer";
import AboutUsContainer from "./containers/aboutUs/aboutUs";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarContainer />
        <div>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/aboutus" />
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
