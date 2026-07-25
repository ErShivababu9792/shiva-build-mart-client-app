import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCart, updateCartQuantity } from "../../services/cart.service";

import styles from "./Cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const data = await getCart();

      console.log("CART DATA:", data);

      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const changeQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      return;
    }

    try {
      await updateCartQuantity(productId, quantity);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,

    0,
  );

  if (loading) {
    return <h2>Loading Cart...</h2>;
  }

  return (
    <div className={styles.container}>
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className={styles.item} key={item.id}>
              <img
                src={
                  item.product?.image ||
                  item.product?.images?.[0] ||
                  "/images/no-product.png"
                }
                alt={item.product?.name}
                width="150"
              />

              <h3>{item.product?.name}</h3>

              <p>₹{item.product?.price}</p>

              <div>
                <button
                  onClick={() =>
                    changeQuantity(
                      item.product.id,

                      item.quantity - 1,
                    )
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    changeQuantity(
                      item.product.id,

                      item.quantity + 1,
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className={styles.cartSummary}>
            <h2>Total: ₹{total}</h2>

            <button
              className={styles.checkoutBtn}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
