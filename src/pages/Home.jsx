import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <Container
      fluid="lg"
      className="mt-5 text-center"
      style={{ maxWidth: "900px" }}
    >
      <h1>Joe’s Bargain Bunker</h1>
      <p className="mt-3 fs-5">
        “Welcome to Joe’s Bargain Bunker. We got products, we got prices, and we
        got no idea where half of it came from. Shop responsibly.”
      </p>

      <Button
        variant="primary"
        size="lg"
        className="mt-4"
        onClick={goToProducts}
      >
        View Products
      </Button>
    </Container>
  );
};

export default Home;
