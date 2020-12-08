import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeVista from './Vistas/HomeVista';
import ProdsVista from './Vistas/ProdsVista';
import SigninVista from './Vistas/SigninVista';
import RegisterScreen from './Vistas/RegistroVista';
import ProfileVista from './Vistas/ProfileVista';
import { signout } from './actions/userActions';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
      <div>
          <Link className="brand" to="/">
            PCForge
          </Link>
      </div>
      <div>
      {userInfo ? (
              <div className="dropdown">
                <Link to="/#">
                  {userInfo.usuario} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                <li>
                    <Link to={`/profile/${userInfo.usuario}`}>
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Salir
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Ingresar</Link>
            )}
        </div>
    </header>
    <main>
    <Route path="/profile/:usuario" component={ProfileVista}></Route>
    <Route path="/product/:id" component={ProdsVista} exact></Route>
    <Route path="/" component={HomeVista} exact></Route>
    <Route path="/signin" component={SigninVista}></Route>
    <Route path="/register" component={RegisterScreen}></Route>
    </main>
    <footer className="row center">Los panas: @Oscurt @MrColour @Platypunk</footer>
  </div>
  </BrowserRouter>
  );
}

export default App;