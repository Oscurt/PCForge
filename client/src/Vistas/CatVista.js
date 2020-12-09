import React, { useEffect } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { catlistProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function CatScreen(props) {
  const id = props.match.params.id_cat;
  const productbyCat = useSelector((state) => state.productbyCat);
  const { loading, error, products } = productbyCat;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(catlistProducts(id));
  }, [dispatch, id]);
  var test = "Sin productos";
  if (products && products[0]){
    test = products[0].catname;
  }
  return (
    <div>
        <h2>{test}</h2>
        {loading? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                <div className="row center">
                {products.map((product) => (
                    <Product key={product.id_prod} product={product}></Product>
                ))}
                </div>
            )}
    </div>
  );
}