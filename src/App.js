import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div >

        <div>
          <Switch>


            <Route exact path='/' />
          </Switch>
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
