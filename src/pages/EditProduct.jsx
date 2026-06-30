import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";

const EditProduct = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing product
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        const product = response.data;
        setTitle(product.title);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price,
      description,
      category,
    };

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    axios
      .put(`https://fakestoreapi.com/products/${id}`, updatedProduct)
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
        setError(null);
      })
      .catch(() => {
        setSubmitting(false);
        setError("Failed to update product.");
        setSuccess(false);
      });
  };

  if (loading) return <Loading />;

  return (
    <Container fluid="lg" className="mt-4 d-flex justify-content-center">
      <Card
        className="p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "820px" }}
      >
        <h2 className="text-center mb-3">Edit Product</h2>

        {success && (
          <div className="mt-3 alert alert-success">
            Product updated successfully! (FakeStoreAPI won’t save changes
            permanently)
          </div>
        )}

        {error && <ErrorAlert message={error} />}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProduct;
