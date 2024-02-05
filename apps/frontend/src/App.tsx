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
                `${import.meta.env.VITE_APP_STRAPI_API_ENDPOINT}/api/products?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_STRAPI_API_PUBLIC_KEY}`,
                    },
                }
            );
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
