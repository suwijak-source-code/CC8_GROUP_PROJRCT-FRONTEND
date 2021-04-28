import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FooterContainer from './containers/footer/footerContainer';
import NavbarContainer from './containers/navbar/NavbarContainer';

function App() {
  return (
    <BrowserRouter>
      <div >
        <NavbarContainer />
        <div>
          <Switch>


            <Route exact path='/' />
          </Switch>
        </div>
        <FooterContainer />
      </div>
    </BrowserRouter>

  );
}

export default App;
