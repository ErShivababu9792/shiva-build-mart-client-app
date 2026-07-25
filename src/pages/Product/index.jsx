import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Truck, ShieldCheck } from "lucide-react";

import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../services/cart.service";

import styles from "./Product.module.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");

  const [wishlisted, setWishlisted] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/product/${id}`);

      setProduct(res.data.data);
    } catch (error) {
      console.log("PRODUCT ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCart = async () => {
    try {
      setCartLoading(true);

      for (let i = 0; i < quantity; i++) {
        await addToCart(product.id);
      }

      alert("Added To Cart Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add cart");
    } finally {
      setCartLoading(false);
    }
  };

  const handleBuyNow = async () => {
    await handleCart();

    window.location.href = "/checkout";
  };

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ADD TO CART FUNCTION

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (loading) {
    return <div className={styles.loading}>Loading Product...</div>;
  }

  if (!product) {
    return <div className={styles.loading}>Product Not Found</div>;
  }

  return (
    <div className={styles.container}>
      {/* Product Main */}

      <div className={styles.productBox}>
        {/* Image */}

        <div className={styles.imageSection}>
          {/* Discount Badge */}

          {product.discountPercentage > 0 && (
            <div className={styles.discountBadge}>
              {product.discountPercentage}% OFF
            </div>
          )}

          {/* Wishlist */}

          <button className={styles.wishlistBtn} onClick={handleWishlist}>
            <Heart
              size={22}
              fill={wishlisted ? "#ef4444" : "none"}
              color={wishlisted ? "#ef4444" : "#444"}
            />
          </button>

          {/* Main Image */}

          <img
            src={selectedImage || product.image}
            alt={product.name}
            className={styles.mainImage}
          />

          {/* Thumbnail */}

          <div className={styles.thumbnailRow}>
            <img
              src={product.image}
              alt="thumb"
              className={
                selectedImage === product.image
                  ? styles.activeThumb
                  : styles.thumb
              }
              onClick={() => setSelectedImage(product.image)}
            />
          </div>
        </div>

        {/* Details */}

        <div className={styles.details}>
          <h1>{product.name}</h1>

          <div className={styles.rating}>⭐⭐⭐⭐⭐</div>

          <div className={styles.priceSection}>
            <h2 className={styles.finalPrice}>₹{product.finalPrice}</h2>

            {product.discountPercentage > 0 && (
              <>
                <span className={styles.oldPrice}>₹{product.price}</span>

                <span className={styles.discountText}>
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <p>
            Category: <strong>{product.category?.name}</strong>
          </p>
          <p>
            <strong>HSN :</strong> {product.hsnCode || "Not Available"}
          </p>

          <div className={styles.stockBox}>
            {product.stock > 10 ? (
              <span className={styles.inStock}>✅ In Stock</span>
            ) : product.stock > 0 ? (
              <span className={styles.lowStock}>
                🔥 Only {product.stock} Left
              </span>
            ) : (
              <span className={styles.outStock}>❌ Out Of Stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className={styles.quantitySection}>
            <h4>Quantity</h4>

            <div className={styles.quantityBox}>
              <button
                className={styles.qtyBtn}
                disabled={quantity === 1}
                onClick={() => setQuantity((prev) => prev - 1)}
              >
                −
              </button>

              <span className={styles.qtyValue}>{quantity}</span>

              <button
                className={styles.qtyBtn}
                disabled={quantity >= product.stock}
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <small className={styles.stockText}>
              Maximum Available: {product.stock}
            </small>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.cartBtn}
              onClick={handleCart}
              disabled={cartLoading || product.stock === 0}
            >
              {cartLoading ? "Adding..." : "Add To Cart"}
            </button>

            <button
              className={styles.buyBtn}
              onClick={async () => {
                await handleCart();

                navigate("/cart");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}

      <div className={styles.section}>
        <h2>Product Description</h2>

        <p>
          {product.description ||
            "Premium quality product for your home and furniture needs."}
        </p>
      </div>

      {/* Specifications */}

      <div className={styles.section}>
        <h2>Specifications</h2>

        <div className={styles.specs}>
          <div>
            Material
            <span>Premium</span>
          </div>

          <div>
            Brand
            <span>Shiva Build Mart</span>
          </div>

          <div>
            Warranty
            <span>5 Years</span>
          </div>
        </div>
      </div>

      {/* Delivery */}

      <div className={styles.delivery}>
        🚚 Free Delivery &nbsp;&nbsp; 📦 Secure Packaging &nbsp;&nbsp; 💳 Secure
        Payment
      </div>
    </div>
  );
};

export default Product;
