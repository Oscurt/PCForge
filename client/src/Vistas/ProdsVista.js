import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct, commentProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Comentario from '../components/Comentario';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productComment = useSelector((state) => state.productComment);
  const { loading: loadingCom, error: errorCom, comment: prodCom} = productComment;
  useEffect(() => {
    dispatch(detailsProduct(productId));
    dispatch(commentProduct(productId));
  }, [dispatch, productId]);
  return (
    <div>
       {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Volver</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={"../"+ product[0].image}
                alt={product[0].nombre}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product[0].marca + " " + product[0].nombre}</h1>
                </li>
                <li>Precio : ${product[0].precio}</li>
                <li>
                  Caracteristicas:
                  <p>{product[0].caracteristicas}</p>
                </li>
                <li>Puntaje : {product[0].puntaje} <span className="fa fa-star-o"></span></li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Precio</div>
                      <div className="price">${product[0].precio}</div>
                    </div>
                    <div className="row">
                      <div>Likes</div>
                      <div className="price">{product[0].nfavoritos}</div>
                    </div>
                    <div className="row">
                      <div>Ventas</div>
                      <div className="price">{product[0].nventas}</div>
                    </div>
                    <div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Comentarios</h2>
            <div>
              <ul>
            {loadingCom? (
                <LoadingBox></LoadingBox>
            ) : errorCom ? (
                <MessageBox>{errorCom}</MessageBox>
            ) : (
                <li>
                  {prodCom.map((comment) =>
                      <Comentario key={comment.id_prod} comment={comment}></Comentario>
                  )}
                </li>
            )}
            </ul>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}