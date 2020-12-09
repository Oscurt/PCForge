import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeVista from './Vistas/HomeVista';
import ProdsVista from './Vistas/ProdsVista';
import SigninVista from './Vistas/SigninVista';
import RegisterScreen from './Vistas/RegistroVista';
import ProfileVista from './Vistas/ProfileVista';
import CatVista from './Vistas/CatVista';
import { signout } from './actions/userActions';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
      <div>
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
          </button>
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
    <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c.id_cat}>
                  <Link
                    to={`/categoria/${c.id_cat}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c.nombre}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
    <main>
    <Route path="/categoria/:id_cat" component={CatVista}></Route>
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