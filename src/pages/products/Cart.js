import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
 
  const totalprice = cart.reduce((acc, product)=> {
    acc += product.price * product.quantity;
    return acc;
},0);

  useEffect(() => {
    console.log("Cart:", cart); // Add this line for debugging
  }, [cart]);
  
  return (
    <Container>
      <h1 className="py-5"></h1>
      <h5>Total Price: {totalprice.toFixed(2)}</h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>
                <Image
                  src={`data:image/png;base64,${product.poster}`}
                  alt="Product poster"
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>{product.price * product.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => dispatch(deleteFromCart(product))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Cart;
