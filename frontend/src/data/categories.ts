export interface Category {
    name: string;
    image: string;
    href: string;
}

const categories: Category[] = [
    {
        name: "Women",
        image: "/categories/women.png",
        href: "/women",
    },
    {
        name: "Men",
        image: "/categories/men.png",
        href: "/men",
    },
    {
        name: "Beauty",
        image: "/categories/beauty.png",
        href: "/beauty",
    },
    {
        name: "Accessories",
        image: "/categories/accessories.png",
        href: "/accessories",
    },
];

export default categories;