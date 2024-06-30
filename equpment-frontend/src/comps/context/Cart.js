import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

class Item {
    constructor(id, name, unit_measure, quantity) {
        this.id = id;
        this.name = name;
        this.unit_measure = unit_measure;
        this.quantity = quantity;
    }
}

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addProduct = (newProduct, quantity) => {
        setCart(prevProducts => {
            const productExists = prevProducts.find(product => product.id === newProduct.id);
            if (productExists) {
                return prevProducts.map(product =>
                    product.id === newProduct.id
                        ? new Item(product.id, product.name, product.unit_measure, product.quantity + quantity)
                        : product
                );
            } else {
                return [...prevProducts, new Item(newProduct.id, newProduct.name, newProduct.unit_measure, quantity)];
            }
        });
    };

    const removeProduct = (id) => {
        setCart(prevProducts => prevProducts.filter(product => product.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? new Item(product.id, product.name, product.unit_measure, quantity) : product
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addProduct,
                removeProduct,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
