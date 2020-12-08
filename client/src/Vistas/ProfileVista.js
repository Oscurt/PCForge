import React, { useEffect } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen(props) {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(props.match.params.usuario));
  }, [dispatch, props.match.params.usuario]);
  return (
    <div>
        <h2>Favoritos</h2>
        {loading? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                <div className="row center">
                    {user.map((product) => (
                    <Product key={product.id_prod} product={product}></Product>
                ))}
                </div>
            )}
    </div>
  );
}