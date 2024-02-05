type Products = {
    data: Product[]
}

type Product = {
    id: string
    attributes: ProductAttributes
}

interface ProductAttributes {
    productName: string
    price: string
    description: string
    stock: number
    productImage: {data: StrapiImage}
    available: boolean
}

type StrapiImageFormat = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: any;
    width: number;
    height: number;
    size: number;
    url: string;
}

type StrapiImageFormats = {
    thumbnail: StrapiImageFormat;
    small: StrapiImageFormat;
    medium: StrapiImageFormat;
    large: StrapiImageFormat;
}

type StrapiImage = {
    id: number;
    attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats?: StrapiImageFormats;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string;
        provider: string;
        provider_metadata: string;
        createdAt: string;
        updatedAt: string;
    }
}