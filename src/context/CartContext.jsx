import { createContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'northstar-cart'

function isSameCartLine(item, product) {
  return (
    item.id === product.id &&
    item.selectedSize === product.selectedSize &&
    item.selectedColor === product.selectedColor
  )
}

function normalizeCartProduct(product) {
  return {
    ...product,
    quantity: product.quantity ?? 1,
    selectedSize: product.selectedSize ?? product.sizes?.[0] ?? 'Default',
    selectedColor: product.selectedColor ?? product.colors?.[0] ?? 'Default',
  }
}

function readStoredCart() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
      return []
    }

    const parsedCart = JSON.parse(storedCart)
    return Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    return []
  }
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product) {
    const nextProduct = normalizeCartProduct(product)

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => isSameCartLine(item, nextProduct))

      if (existingItem) {
        return currentItems.map((item) =>
          isSameCartLine(item, nextProduct)
            ? { ...item, quantity: item.quantity + nextProduct.quantity }
            : item,
        )
      }

      return [...currentItems, nextProduct]
    })
  }

  function updateQuantity(productId, selectedSize, selectedColor, nextQuantity) {
    setCartItems((currentItems) => {
      if (nextQuantity <= 0) {
        return currentItems.filter(
          (item) =>
            !(
              item.id === productId &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
            ),
        )
      }

      return currentItems.map((item) =>
        item.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: nextQuantity }
          : item,
      )
    })
  }

  function removeFromCart(productId, selectedSize, selectedColor) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          ),
      ),
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.priceValue * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        clearCart,
        itemCount,
        removeFromCart,
        subtotal,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }

