import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard';
import {Listar} from './pages/Listar';
import {Visualizar} from './pages/Visualizar';
import {Cadastrar} from './pages/Cadastrar';
import { Editar } from './pages/Editar';
import history from './services/history';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
      <Router history={history}>
        <Switch>
        <Route exact path="/"  component={Login} />
          <Route exact path="/"  component={Dashboard} />
          <Route exact path="/listar" component={Listar} />
          <Route exact path="/visualizar/:id" component={Visualizar} />
          <Route exact path="/cadastrar" component={Cadastrar} />
          <Route exact path="/editar/:id" component={Editar} />
        </Switch>
      </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
