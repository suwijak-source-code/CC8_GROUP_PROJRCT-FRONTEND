import { BrowserRouter, Route, Switch } from "react-router-dom";
import FooterContainer from "./containers/footer/FooterContainer";
import NavbarContainer from "./containers/navbar/NavbarContainer";
import HomeContainer from "./containers/home/home";
import AboutUsContainer from "./containers/aboutUs/aboutUs";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavbarContainer />
        <div>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/aboutus" component={AboutUsContainer} />
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
