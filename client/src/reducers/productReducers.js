const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    POPULAR_PRODUCT_DETAILS_REQUEST,
    POPULAR_PRODUCT_DETAILS_SUCCESS,
    POPULAR_PRODUCT_DETAILS_FAIL,
    COMENTARIO_PRODUCT_DETAILS_REQUEST,
    COMENTARIO_PRODUCT_DETAILS_SUCCESS,
    COMENTARIO_PRODUCT_DETAILS_FAIL,
  } = require('../constants/productConstants');

  export const productPopReducer = (
    state = { loading: true, products: {} },
    action
  ) => {
    switch (action.type) {
      case POPULAR_PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case POPULAR_PRODUCT_DETAILS_SUCCESS:
        return { loading: false, products: action.payload };
      case POPULAR_PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productListReducer = (
    state = { loading: true, products: [] },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true };
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const productDetailsReducer = (
    state = { product: {}, loading: true },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const commentProductReducer = (
    state = { comment: {}, loading: true },
    action
  ) => {
    switch (action.type) {
      case COMENTARIO_PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case COMENTARIO_PRODUCT_DETAILS_SUCCESS:
        return { loading: false, comment: action.payload };
      case COMENTARIO_PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };