import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [usuario, setName] = useState('');
  const [clave, setPassword] = useState('');
  const [confirmClave, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (clave !== confirmClave) {
      alert('Las claves no coinciden');
    } else {
      dispatch(register(usuario, clave));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Crear cuenta</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            placeholder="Ingresa un usuario"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="clave">Clave</label>
          <input
            type="password"
            id="clave"
            placeholder="Ingresa una contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmClave">Confirmacion de contraseña</label>
          <input
            type="password"
            id="confirmClave"
            placeholder="Confirma tu contraseña"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Registrar
          </button>
        </div>
        <div>
          <label />
          <div>
            ¿Ya tienes una cuenta?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Ingresar</Link>
          </div>
        </div>
      </form>
    </div>
  );
}