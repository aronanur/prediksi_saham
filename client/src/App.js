import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index';
import { Provider } from 'react-redux';
import { LoginPage, Authentication, HomePage, Guest } from './views/index';
import { 
  BrowserRouter as Router,
  Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Guest exact path="/">
              <LoginPage />
            </Guest>
            <Authentication path="/prediksi">
              <HomePage />
            </Authentication>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
