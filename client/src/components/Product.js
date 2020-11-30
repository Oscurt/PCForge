import React from 'react';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product.id_prod} className="card">
      <a href={`/product/${product.id_prod}`}>
        <img className="medium" src={product.image} alt={product.nombre} />
      </a>
      <div className="card-body">
        <a href={`/product/${product.id_prod}`}>
          <h2>{product.nombre}</h2>
        </a>
        <Rating
          rating={product.nfavoritos}
          numReviews={product.nventas}
        ></Rating>
        <div className="price">${product.precio}</div>
      </div>
    </div>
  );
}