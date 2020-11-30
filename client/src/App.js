import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeVista from './Vistas/HomeVista';
import ProdsVista from './Vistas/ProdsVista';
import SigninVista from './Vistas/SigninVista';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
      <div>
        <a className="brand" href="/">
          PCForge
        </a>
      </div>
      <div>
        <a href="/signin">Sign In</a>
      </div>
    </header>
    <main>
    <Route path="/product/:id" component={ProdsVista} exact></Route>
    <Route path="/" component={HomeVista} exact></Route>
    <Route path="/signin" component={SigninVista}></Route>
    </main>
    <footer className="row center">Los panas: @Oscurt @MrColour @Platypunk</footer>
  </div>
  </BrowserRouter>
  );
}

export default App;