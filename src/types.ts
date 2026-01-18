export interface PinterestImage {
    id: string;
    url: string;
    description?: string;
    alt?: string;
}

export interface PinterestBoard {
    id: string;
    name: string;
    description?: string;
    images: PinterestImage[];
    url?: string;
}

export interface AustralianProduct {
    id: string;
    name: string;
    brand: string;
    price: string;
    image: string;
    category: string;
    australianOwned: boolean;
    location: string;
    website?: string;
    description?: string;
}

export interface MatchedProduct {
    id: string;
    originalImage: string;
    originalDescription: string;
    matchedProducts: AustralianProduct[];
}

export interface AustralianBrand {
    id: string;
    name: string;
    location: string;
    website: string;
    categories: string[];
    description: string;
    logo?: string;
} 