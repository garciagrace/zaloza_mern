const products = [
  {
    name: 'Firebird primeblue track top',
    brand: 'Adidas',
    description: 'Monochrome striped sleeves tricot track jacket.',
    category: 'Women',
    productType: 'Clothing',
    price: 3150.0,
    stocks: [
      {
        size: 'S',
        qty: 30,
      },
      {
        size: 'M',
        qty: 30,
      },
      {
        size: 'L',
        qty: 30,
      },
      {
        size: 'XL',
        qty: 20,
      },
    ],
    image: '/images/products/1.jpg',
  },
  {
    name: 'Jacket without hood',
    brand: 'Fubu Queens',
    description: 'Fashion and comfortable to wear.',
    category: 'Women',
    productType: 'Clothing',
    price: 840.0,
    stocks: [
      {
        size: 'S',
        qty: 30,
      },
      {
        size: 'M',
        qty: 30,
      },
      {
        size: 'L',
        qty: 30,
      },
      {
        size: 'XL',
        qty: 20,
      },
    ],
    image: '/images/products/2.jpg',
  },
  {
    name: 'Denim cropped joggers',
    brand: 'Basics',
    description: 'Denim joggers with pleat detail.',
    category: 'Women',
    productType: 'Clothing',
    price: 399.0,
    stocks: [
      {
        size: 'S',
        qty: 30,
      },
      {
        size: 'M',
        qty: 30,
      },
      {
        size: 'L',
        qty: 30,
      },
      {
        size: 'XL',
        qty: 20,
      },
    ],
    image: '/images/products/3.jpg',
  },
  {
    name: 'Polo shirt',
    brand: 'H&M',
    description:
      'Short-sleeved polo shirt in cotton with a ribbed collar and button placket.',
    category: 'Men',
    productType: 'Clothing',
    price: 799.0,
    stocks: [
      {
        size: 'S',
        qty: 30,
      },
      {
        size: 'M',
        qty: 30,
      },
      {
        size: 'L',
        qty: 30,
      },
      {
        size: 'XL',
        qty: 20,
      },
    ],
    image: '/images/products/4.jpg',
  },
  {
    name: 'Originals tech tee',
    brand: 'Adidas',
    description: 'Adidas three stripes tee.',
    category: 'Men',
    productType: 'Clothing',
    price: 1200.0,
    stocks: [
      {
        size: 'S',
        qty: 30,
      },
      {
        size: 'M',
        qty: 30,
      },
      {
        size: 'L',
        qty: 30,
      },
      {
        size: 'XL',
        qty: 20,
      },
    ],
    image: '/images/products/5.jpg',
  },
  {
    name: 'Sportstyle prime interstellar sweatpants',
    brand: 'Puma',
    description:
      'Elasticated waistband with external reflective drawcord for an adjustable fit.',
    category: 'Men',
    productType: 'Clothing',
    price: 2800.0,
    stocks: [
      {
        size: 'S',
        qty: 30,
      },
      {
        size: 'M',
        qty: 30,
      },
      {
        size: 'L',
        qty: 30,
      },
      {
        size: 'XL',
        qty: 20,
      },
    ],
    image: '/images/products/6.jpg',
  },
  {
    name: 'Unisex lego ninjago jay set',
    brand: 'Adidas',
    description: 'Logo printed short sleeves tee.',
    category: 'Kids',
    productType: 'Smallclothes',
    price: 3299.0,
    stocks: [
      {
        size: '3y - 4y',
        qty: 15,
      },
      {
        size: '5y - 6y',
        qty: 15,
      },
    ],
    image: '/images/products/7.jpg',
  },
  {
    name: '2-piece set',
    brand: 'H&M',
    description: 'Set with a shirt and pants',
    category: 'Kids',
    productType: 'Smallclothes',
    price: 1690.0,
    stocks: [
      {
        size: '3y - 4y',
        qty: 15,
      },
      {
        size: '5y - 6y',
        qty: 15,
      },
    ],
    image: '/images/products/8.jpg',
  },
  {
    name: 'Airfryer toaster oven',
    brand: 'Cuisinart',
    description: 'Air fryer toaster oven.',
    category: 'Home',
    productType: 'One Size',
    price: 25000.0,
    stocks: [
      {
        size: 'One Size',
        qty: 20,
      },
    ],
    image: '/images/products/9.jpg',
  },
  {
    name: 'Premium ice crusher',
    brand: 'Slique',
    description:
      'Made of healthy, environmental, food-grade and thickening materials.',
    category: 'Home',
    productType: 'One Size',
    price: 800.0,
    stocks: [
      {
        size: 'One Size',
        qty: 10,
      },
    ],
    image: '/images/products/10.jpg',
  },
  {
    name: 'Shelf organizer with compartments',
    brand: 'Tech Trance',
    description: 'Multifunction storage organizer.',
    category: 'Home',
    productType: 'One Size',
    price: 999.0,
    stocks: [
      {
        size: 'One Size',
        qty: 20,
      },
    ],
    image: '/images/products/11.jpg',
  },
  {
    name: 'Premium metal table lamp',
    brand: 'Moderno',
    description:
      'Contemporary and Industrial finishes mix with minimalistic design.',
    category: 'Home',
    productType: 'One Size',
    price: 999.0,
    stocks: [
      {
        size: 'One Size',
        qty: 15,
      },
    ],
    image: '/images/products/12.jpg',
  },
  {
    name: 'Multipurpose rack',
    brand: 'San-Yang Furniture',
    description: '3 layer multipurpose rack with storage.',
    category: 'Home',
    productType: 'One Size',
    price: 1435.0,
    stocks: [
      {
        size: 'One Size',
        qty: 20,
      },
    ],
    image: '/images/products/13.jpg',
  },
  {
    name: 'X-T4 18-55mm Kit (Black)',
    brand: 'Fujifilm',
    description:
      'A professional camera needs to be able to shoot every moment and record it instantaneously.',
    category: 'Gadgets',
    productType: 'One Size',
    price: 119900.0,
    stocks: [
      {
        size: 'One Size',
        qty: 15,
      },
    ],
    image: '/images/products/14.jpg',
  },
  {
    name: 'JBL Go2 plus portable - black',
    brand: 'JBL',
    description: 'The JBL Go2+ is an ultra-compact portable bluetooth speaker',
    category: 'Gadgets',
    productType: 'One Size',
    price: 2799.0,
    stocks: [
      {
        size: 'One Size',
        qty: 20,
      },
    ],
    image: '/images/products/15.jpg',
  },
  {
    name: 'Nintendo switch with neon joycon-version 2',
    brand: 'Nintendo',
    description:
      'Get the gaming system that lets you play the games you want, wherever you are, however you like.',
    category: 'Gadgets',
    productType: 'One Size',
    price: 15795.0,
    stocks: [
      {
        size: 'One Size',
        qty: 30,
      },
    ],
    image: '/images/products/16.jpg',
  },
  {
    name: 'Apple macbook air 13.3" M1 | 8GB | 256GB SSD-space gray',
    brand: 'Apple',
    description:
      'Our thinnest, lightest notebook, completely transformed by the Apple M1 chip.',
    category: 'Gadgets',
    productType: 'One Size',
    price: 54990.0,
    stocks: [
      {
        size: 'One Size',
        qty: 20,
      },
    ],
    image: '/images/products/17.jpg',
  },
  {
    name: 'Mon de bonheur toilet water',
    brand: 'Yves Rocher',
    description:
      'Created a new interpretation of the favorite with all the flavor.',
    category: 'Beauty',
    productType: 'One Size',
    price: 2295.0,
    stocks: [
      {
        size: 'One Size',
        qty: 20,
      },
    ],
    image: '/images/products/18.jpg',
  },
  {
    name: 'Bourbon vanilla pamper me total care bundle',
    brand: 'Yves Rocher',
    description:
      'Explore our bath & shower products which promote balance and well-being.',
    category: 'Beauty',
    productType: 'One Size',
    price: 1680.0,
    stocks: [
      {
        size: 'One Size',
        qty: 20,
      },
    ],
    image: '/images/products/19.jpg',
  },
];

export default products;
