import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductCard from "./ProductCard";
import React from "react";
import Slider from "react-slick";

const MyCarousel = props => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  // };

  return (
    <Container fluid className="my-5 px-5">
      <h3 className="text-center fw-bold mb-4">{props.category}</h3>
      <Row>
        <div className="slider-container">
          <Slider {...settings}>
            {props.products.map(product => (
              <div className="px-2" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </Row>
    </Container>
  );
};

export default MyCarousel;
