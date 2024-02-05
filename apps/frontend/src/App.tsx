import { createContext, useEffect, useRef, useState } from "react";
import { fetchData } from "./lib/fetch";
import Product from "./components/Product";
import "./App.css";

export const UserContext = createContext<User | null>(null);

function App() {
    const [products, setProducts] = useState<Products>({ data: [] });
    const [fetchError, setFetchError] = useState<boolean>(false);

    const myInputField = useRef<HTMLInputElement>(null);

    const clickHandler = () => {
        console.log(myInputField?.current?.value);
    };

    const fetchProducts = async () => {
        try {
            const products: Products = await fetchData<Products>(
                "http://127.0.0.1:1337/api/products?populate=*",
                {
                    headers: {
                        Authorization: `Bearer 22efe79c58227585db1056d4d622b76ee14db14a956e2693950f6b3894233c6a44695065f06c69beece2400d2208080adfba22844498c9676475d327c01c864135b5fa7e3702871759aae72ed5b1dd0716d3c1d91b959e28952a8d2f94c629572f1ef5aad5f98420073664415f441813dc7afed83dbc433094f058fd58fcf320`,
                    },
                }
            );
            console.log(products);
            setProducts(products);
        } catch (error) {
            setFetchError(true);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (fetchError) {
        return <>Error</>;
    }

    return (
        <UserContext.Provider value={{ id: 1, name: "Henri" }}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10">
                    {products &&
                        products?.data?.map(
                            (product: Product, index: number) => (
                                <Product {...product} key={index} />
                            )
                        )}
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default App;
