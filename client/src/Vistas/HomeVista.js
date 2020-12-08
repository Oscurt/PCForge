import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, popularProduct } from '../actions/productActions';

export default function HomeVista(){
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productPop = useSelector((state) => state.productPop);
    const { loading: loadingPop, error: errorPop, products: prodPop,} = productPop;
    useEffect(() => {
        dispatch(listProducts());
        dispatch(popularProduct());
    }, [dispatch]);
    return (
        <div>
             <h2>Destacados</h2>
             {loadingPop? (
                <LoadingBox></LoadingBox>
            ) : errorPop ? (
                <MessageBox>{errorPop}</MessageBox>
            ) : (
                <div className="row center">
                {prodPop.map((product) => (
                    <Product key={product.id_prod} product={product}></Product>
                ))}
                </div>
            )}
             <h2>Productos</h2>
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