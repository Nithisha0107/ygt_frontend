import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
 
import './Home.css';
 
const Home = () => {
   
  return (
    <div className='slider-container'>
        <Carousel >
  <Carousel.Item interval={1000}>
    <img
      className=" w-100"
      src="https://yadadritemple.telangana.gov.in/images/banners/08.jpg"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item interval={1000}>
    <img
      className=" w-100"
      src='https://yadadritemple.telangana.gov.in/images/banners/01.jpg'
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item interval={1000}>
    <img
      className=" w-100"
      src='https://yadadritemple.telangana.gov.in/images/banners/04.jpg'
      alt="Second slide"
    />
  </Carousel.Item>
 
  <Carousel.Item interval={1000}>
    <img
      className=" w-100"
      src="https://yadadritemple.telangana.gov.in/images/banners/07.jpg"
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
        </div>
  )
}
 
export default Home