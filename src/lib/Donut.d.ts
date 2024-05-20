export type Donut = {
    id: string;
    imageURL: string;
    title: string;
    price: number;
    isNew: boolean;
    description: string;
    tags: string[];
};

export type CheckoutItem = {
    id: string;
    quantity: number;
}