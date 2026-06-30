import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    setDeleting(true);
    setDeleteError(null);

    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setDeleting(false);
        setShowModal(false);
        navigate("/products");
      })
      .catch(() => {
        setDeleting(false);
        setDeleteError("Failed to delete product. Please try again.");
      });
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <Container className="mt-5">
        <ErrorAlert message={error} />
      </Container>
    );

  return (
    <Container fluid="xl" className="mt-4" style={{ maxWidth: "1100px" }}>
      <Row className="g-4 align-items-start">
        <Col xs={12} lg={5}>
          <Card className="h-100 shadow-sm product-card">
            <Card.Img
              src={product.image}
              style={{ height: "420px", objectFit: "contain" }}
            />
          </Card>
        </Col>

        <Col xs={12} lg={7}>
          <div className="p-3 p-lg-0">
            <h2>{product.title}</h2>
            <p className="text-muted">{product.category}</p>
            <h4 className="fw-bold">${product.price}</h4>

            <p className="mt-3">{product.description}</p>

            <div className="mt-4 d-flex gap-3 flex-column flex-sm-row">
              <Button variant="success">Add to Cart</Button>

              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete Product
              </Button>
            </div>

            {deleteError && <ErrorAlert message={deleteError} />}
          </div>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetails;
