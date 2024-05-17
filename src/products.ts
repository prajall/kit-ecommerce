import greyOnepiece from "../public/products/women1.jpeg";

interface product {
  id: string;
  name: string;
  underText: string;
  price: number;
  image: string;
  category: string[];
}
interface productNoId {
  id: string;
  name: string;
  underText: string;
  price: number;
  image: string;
  category: string[];
}
interface products {
  products: product[];
}

const dummyProducts: product[] = [
  {
    id: "1",
    name: "Maroon Texture Premium Cotton Shirt",
    underText: "Random Under text for testing",
    // image: "women1.jpeg",
    image:
      "https://thefoomer.in/cdn/shop/files/jpeg-optimizer_PATP0730_41784023-e4a4-42d7-b65c-c727b2e974df.jpg?v=1707385067&width=932",
    price: 1999,
    category: ["Onepieces", "women"],
  },
  {
    id: "2",
    name: "Gorgeous Red Onepiece",
    underText: "Random Under text for testing",
    image:
      "https://plus.unsplash.com/premium_photo-1665664652418-91f260a84842?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    price: 2100,
    category: ["shoes", "women", "men"],
  },
  {
    id: "3",
    name: "Black Designer Giza Satin Cotton Shirt",
    underText: "Random Under text for testing",
    image:
      "https://thefoomer.in/cdn/shop/files/PATP0498.jpg?v=1707386595&width=932",
    price: 1599,
    category: ["shoes", "sports", "men"],
  },
  {
    id: "4",
    name: "Elegant Sleevless Loose Jumpsuit For Spring & Summer",
    underText: "Formal or Casual pant",
    image:
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8d048e816a118e2fea74e931de6be50f.jpg?imageView2/2/w/800/q/70/format/webp",
    price: 2999,
    category: ["women"],
  },

  {
    id: "5",
    name: "Black Cotton Half Sleeve Premium Tshirt",
    underText: "Black Cotton Half Sleeve Premium Tshirt",
    image:
      "https://thefoomer.in/cdn/shop/files/jpeg-optimizer_PATP2952.jpg?v=1699769222&width=932",
    price: 1399,
    category: ["men", " tshirt"],
  },
  {
    id: "6",
    name: "Choker Neck A-line Dress, Elegant Sleeveless Dress",
    underText: "Random Under text for testing",
    image:
      "https://img.kwcdn.com/product/fancy/d60e15cc-93b7-47d0-b2f8-1f20a463d878.jpg?imageView2/2/w/800/q/70/format/webp",
    price: 999,
    category: ["women", "dress"],
  },

  {
    id: "7",
    name: "Air Jordan 4s | Trendy Shoes For Men and Women",
    underText: "Random Under text for testing",
    image:
      "https://i.pinimg.com/736x/86/85/f0/8685f0cfe847c2ef65baf325f2f47bea.jpg",
    price: 5000,
    category: ["shoes", "women", "men"],
  },
  {
    id: "8",
    name: "Stylish Round Neck Sleeve Chiffon Organza",
    underText: "Nylon pant fitting size",
    image:
      "https://i.pinimg.com/564x/6f/aa/4c/6faa4c067f8a15a085e269c61d33d7ac.jpg",
    price: 1050,
    category: ["pants", "trousers", "men"],
  },
];

export default dummyProducts;
