import { gql } from '@apollo/client';

// 1. Lấy danh sách sản phẩm (Home Page)
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      image
      description
      stock
    }
  }
`;

// 2. Lấy dữ liệu Giỏ hàng
export const GET_CART = gql`
  query GetCart {
    getCart {
      id
      productId
      name
      price
      image
      quantity
      selected
    }
  }
`;

// 3. Thêm vào giỏ hàng
export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $name: String, $price: Float, $image: String) {
    addToCart(productId: $productId, name: $name, price: $price, image: $image) {
      id
      quantity
    }
  }
`;

// 4. Các thao tác khác trong giỏ
export const REMOVE_ITEM = gql`
  mutation RemoveItem($id: ID!) { removeItem(id: $id) }
`;

export const UPDATE_QTY = gql`
  mutation UpdateQuantity($id: ID!, $quantity: Int!) {
    updateQuantity(id: $id, quantity: $quantity) { id quantity }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout($ids: [ID]!) { checkout(ids: $ids) }
`;