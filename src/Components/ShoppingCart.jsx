import { useEffect } from "react";
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function ShoppingCartApp() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(PRODUCTS);
  const [freeGiftAdded, setFreeGiftAdded] = useState(false);

  useEffect[
    (() => {
      const cartSubtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      if (cartSubtotal >= THRESHOLD && !freeGiftAdded) {
        setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
        setFreeGiftAdded(true);
      } else if (cartSubtotal < THRESHOLD && !freeGiftAdded) {
        setCart((prevCart) =>
          prevCart.filter((item) => item.id != FREE_GIFT.id)
        );
        setFreeGiftAdded(false);
      }
    },
    [cart, freeGiftAdded])
  ];

  const addToCart = (product) => {
    console.log("adding to cart:", product);

    const productIsExist = cart.find((item) => item.id === product.id);
    if (productIsExist) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
    console.log("Updated Cart:", cart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  console.log(cart);

  const calculateSubTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateProPer = () => {
    const subTotal = calculateSubTotal();
    return Math.min((subTotal / THRESHOLD) * 100, 100);
  };
  const remainForFreeGiftCard = THRESHOLD - calculateSubTotal();

  calculateProPer;
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4 text-center text-black-700">
        Shopping Cart
      </h1>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-black-700 ">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 shadow-sm">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-black-600">{product.name}</h3>
              <p> ${product.price} </p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Added To Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black-700">
          Cart Summary
        </h2>
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold test-black-600">Subtotal:</span>
          <span className="font-bold test-black-600">
            {calculateSubTotal()}
          </span>
        </div>
        <hr className="h-px bg-black-200 w-full mb-4"></hr>

        {calculateSubTotal() < THRESHOLD && calculateSubTotal() > 0 && (
          <div className="mb-4">
            <div className="text-sm text-black-600 mb-2">
              Add ${remainForFreeGiftCard} more to get a FREE wireless Mouse!
            </div>
            <div className="w-full bg-grey-200 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${calculateProPer()}%` }}
              ></div>
            </div>
          </div>
        )}
        {freeGiftAdded && (
          <div className="text-green-600 font-medium mb-4">
            You got a free wireless Mouse!
          </div>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="test-xl font-semibold mb-4 test-black-700">
            Cart items
          </h2>
          {cart.map((item) => {
            <div
              key={item.id}
              className="flex justify-between items-center py-4 border-b border-grey-100 last:border-0"
            >
              <div>
                <div className="font-medium text-black-800">{item.name}</div>
                <div className="text-sm text-grey-500">
                  ${item.price} x {item.quantity} = $
                  {item.price * item.quantity}
                </div>
              </div>

              <div className="flex item-center">
                {item.id != FREE_GIFT.id ? (
                  <>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-md"
                    >
                      {" "}
                      -
                    </button>
                    <span className="mx-3 w-6 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center bg-green-500 text-white rounded-md"
                    >
                      {" "}
                      +
                    </button>
                  </>
                ) : (
                  <span className="text-ts font-medium text-green-600 bg-green-100 px-2 py-1 rounded">FREE GIFT </span>
                )}
              </div>
            </div>;
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="test-black-500 py-4">Your cart is empty</p>
          <p className="test-black-400 test-sm">
            Add some more product to see them here
          </p>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartApp;
