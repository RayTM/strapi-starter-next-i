import React from "react";

const Product = ({
    id,
    attributes: {
        productName,
        price,
        description,
        stock,
        productImage,
        available,
    },
}: Product) => {
    const imageUrl =
        "http://127.0.0.1:1337" +
        productImage?.data?.attributes?.formats.thumbnail.url;

    console.log(productImage);
    return (
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
                    <strong className="font-bold text-xl">{price} EUR</strong>
                </div>
            </div>
        </div>
    );
};

export default Product;
