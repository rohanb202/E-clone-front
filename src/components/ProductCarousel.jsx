import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useParams } from 'react-router-dom';
import { useGetTopProductsQuery,useGetProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  // const { data: products, isLoading, error } = useGetTopProductsQuery();
  const { pageNumber, keyword } = useParams();

  const {data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  // console.log(products);
  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {data.products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid  />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
