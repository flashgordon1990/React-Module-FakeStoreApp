import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import ErrorAlert from "../components/ErrorAlert";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price,
      description,
      category,
    };

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    axios
      .post("https://fakestoreapi.com/products", newProduct)
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
        setError(null);

        // Clear form
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
      })
      .catch(() => {
        setSubmitting(false);
        setError("Failed to add product.");
        setSuccess(false);
      });
  };

  return (
    <Container fluid="lg" className="mt-4 d-flex justify-content-center">
      <Card
        className="p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "820px" }}
      >
        <h2 className="text-center mb-3">Add New Product</h2>

        {success && (
          <div className="mt-3 alert alert-success">
            Product added successfully! (FakeStoreAPI won’t save it permanently)
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
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
