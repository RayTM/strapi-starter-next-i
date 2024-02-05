import Cookie from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Product = (product: Product) => {
    const user = useContext(UserContext);

    const { id, attributes } = product;
    const { productName, price, description, available, stock, productImage } =
        attributes;

    const imageUrl =
        "http://127.0.0.1:1337" + productImage?.data.attributes?.url;

    const cartCookie =
        Cookie.get("cart") !== undefined ? Cookie.get("cart") : null;

    const [showCart, setShowCart] = useState<boolean>(false);
    const [cart, setCart] = useState(
        cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 }
    );

    useEffect(() => {
        Cookie.set("cart", JSON.stringify(cart));
    }, [cart]);

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
        console.log(newCart);
        setCart(newCart);
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
                        <p className="text-sm"> items</p>
                    </div>
                    <div className="flex items-center justify-center col-span-1">
                        <button aria-label="Expand cart">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
