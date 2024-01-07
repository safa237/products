import React from 'react';
import { useSelector  , useDispatch} from 'react-redux';
import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import { selectProducts } from '../rtk/slices/Product-slice';
import { removeFromWishlist } from '../rtk/slices/Wishlist-slice';
import { Button, Container , Table , Image } from "react-bootstrap";



function Wishlist() {
  const wishlist = useSelector(selectWishlist);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

 

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <Container style={{marginTop: '50px'}}>
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {wishlistProducts.map((product) => (
            <tr key={product.id}>
            <td>
                <Image
                        src={`data:image/png;base64,${product.poster}`}
                        alt="Product poster"
                        style={{width: "100px" , height: "100px"}}
                />
            </td>
            <td>{product.title}</td>
           
            <td>{product.price}</td>
            
          </tr>
      ))}
      </tbody>
    </Table>
        </Container>
  );
}

export default Wishlist;
