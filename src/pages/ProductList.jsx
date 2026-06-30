import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <Container className="mt-5">
        <ErrorAlert message={error} />
      </Container>
    );

  return (
    <Container fluid="xl" className="mt-4">
      <h2 className="mb-4 text-center">Product Listing</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 d-flex flex-column product-card">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "220px", objectFit: "contain" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="product-title" title={product.title}>
                  {product.title}
                </Card.Title>
                <Card.Text className="fw-bold mb-3">${product.price}</Card.Text>

                <Button
                  className="mt-auto"
                  variant="primary"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
