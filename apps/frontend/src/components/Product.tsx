import Cookie from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Product = (product: Product) => {
    const user = useContext(UserContext);

    const { id, attributes } = product;
    const { productName, price, description, available, stock, productImage } =
        attributes;

    const imageUrl =
        `${import.meta.env.VITE_APP_STRAPI_API_ENDPOINT}` +
        productImage?.data.attributes?.url;

    const cartCookie =
        Cookie.get("cart") !== undefined ? Cookie.get("cart") : null;

    const [cart, setCart] = useState(
        cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 }
    );

    useEffect(() => {
        Cookie.set("cart", JSON.stringify(cart));
    }, [cart]);

    const showCart = () => {
        console.log("show cart");
        const cartModal = document.getElementById("cart");
        if (cartModal) {
            cartModal.classList.toggle("invisible");
        }
    };

    const addToCart = () => {
        const newCart = {
            items: [
                ...cart.items,
                {
                    id,
                    productName,
                    price,
                    imageUrl,
                    quantity: 1,
                },
            ],
            total: cart.total + price,
        };
        setCart(newCart);
    };

    const removeFromCart = () => {
        const newCart = {
            items: cart.items.slice(0, -1),
            total: cart.total - cart.items[cart.items.length - 1].price,
        };
        setCart(newCart);
    };

    const clearCart = () => {
        setCart({ items: [], total: 0 });
    };

    return (
        <>
            <div className="rounded-xl shadow-xl">
                <div>
                    <img
                        src={imageUrl}
                        className="rounded-t-md object-cover w-full max-h-72"
                    />
                </div>
                <div>
                    <div className="flex justify-between p-2 text-slate-400 text-sm">
                        <div>
                            <strong className="font-bold">ID:</strong> {id}
                        </div>
                        <div>
                            <strong className="font-bold">Availability:</strong>{" "}
                            {available ? `${stock}` : "no"}
                        </div>
                    </div>
                </div>
                <div className="p-8 space-y-6">
                    <div>
                        <h2 className="text-3xl">{productName}</h2>
                        <div className="text-slate-500 py-2">
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <strong className="font-bold text-xl">
                            {price} EUR
                        </strong>
                    </div>
                    <div>
                        <button
                            onClick={addToCart}
                            className="w-full px-4 py-2 text-white bg-slate-500 rounded-md"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>

            <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full shadow-xl bottom-4 left-1/2 ">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                    <div className="flex items-center justify-center col-span-1">
                        {user?.name && (
                            <span>
                                <strong>{user.name}</strong>
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-center col-span-3">
                        <p className="text-sm">{cart.items.length} items</p>
                    </div>
                    <div className="flex items-center justify-center col-span-1">
                        <button onClick={showCart} aria-label="show cart">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* start cart */}
            <div id="cart" className="invisible">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-xl border border-gray-200">
                        <div className="flex items-center justify-between p-4 border-b">
                            <p className="text-2xl font-bold">Cart</p>
                            <button
                                onClick={showCart}
                                aria-label="Close cart"
                                className="text-3xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="flex flex-col p-4 space-y-4">
                            {cart.items
                                .filter(
                                    (
                                        item: CartItem,
                                        index: number,
                                        self: CartItem[]
                                    ) =>
                                        self.findIndex(
                                            (i) =>
                                                i.productName ===
                                                item.productName
                                        ) === index
                                )
                                .map((item: CartItem, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.imageUrl}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div>
                                                <p className="text-lg font-bold">
                                                    {item.productName}
                                                </p>
                                                <p>
                                                    {item.price} EUR x{" "}
                                                    {cart.items.length}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <button
                                                    onClick={addToCart}
                                                    aria-label="Increase quantity"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={removeFromCart}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M20 12H4"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="flex items-center justify-between p-4 border-t dark:border-gray-600">
                            <p className="text-xl font-bold">Total</p>
                            <p className="text-xl font-bold">
                                {cart.total} EUR
                            </p>
                        </div>
                        <div className="flex justify-center p-4">
                            <button
                                onClick={clearCart}
                                className="w-full px-4 py-2 text-white bg-red-500 rounded-md"
                            >
                                Clear cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
