import { useEffect, useState } from "react";
import { ShoppingCart, Trash2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import styles from "./Wishlist.module.css";

import { getWishlist, removeWishlist } from "../../services/wishlist.service";

import { addToCart } from "../../services/cart.service";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ==========================
  // FETCH WISHLIST
  // ==========================

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();

      console.log("WISHLIST DATA:", data);

      setWishlist(data || []);
    } catch (error) {
      console.log("WISHLIST ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ==========================
  // REMOVE WISHLIST
  // ==========================

  const handleRemove = async (productId) => {
    try {
      await removeWishlist(productId);

      setWishlist((prev) =>
        prev.filter((item) => item.productId !== productId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // ADD TO CART
  // ==========================

  const handleCart = async (productId) => {
    try {
      await addToCart(productId);

      alert("Added To Cart 🛒");
    } catch (error) {
      alert(error.response?.data?.message || "Cart Error");
    }
  };

  // ==========================
  // BUY NOW
  // ==========================

  const handleBuyNow = async (productId) => {
    try {
      await addToCart(productId);

      navigate("/checkout");
    } catch (error) {
      alert("Unable to buy product");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading Wishlist...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className={styles.empty}>Your wishlist is empty</div>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((item) => (
            <div className={styles.card} key={item.id}>
              {/* IMAGE */}

              <img
                src={item.product?.image || "/images/no-product.png"}
                alt={item.product?.name}
              />

              <div className={styles.content}>
                <h3>{item.product?.name}</h3>

                <p className={styles.category}>
                  Category: {item.product?.category?.name || "Product"}
                </p>

                <h2 className={styles.price}>
                  ₹{item.product?.finalPrice || item.product?.price}
                </h2>

                <p
                  className={
                    item.product?.stock > 0 ? styles.stock : styles.outStock
                  }
                >
                  {item.product?.stock > 0
                    ? `Available (${item.product.stock})`
                    : "Out Of Stock"}
                </p>

                <div className={styles.actions}>
                  <button onClick={() => handleCart(item.productId)}>
                    <ShoppingCart size={17} />
                    Cart
                  </button>

                  <button
                    className={styles.buy}
                    disabled={item.product?.stock === 0}
                    onClick={() => handleBuyNow(item.productId)}
                  >
                    <Zap size={17} />
                    Buy Now
                  </button>

                  <button
                    className={styles.remove}
                    onClick={() => handleRemove(item.productId)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
