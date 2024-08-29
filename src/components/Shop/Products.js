import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Padre Maronno",
    price: 5,
    description: "Un libro molto tristo"
  },
  {
    id: "p2",
    title: "Libro",
    price: 6,
    description: "Un libro con una sola b"
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem key={item.id} id={item.id} title={item.title} price={item.price} description={item.description} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
