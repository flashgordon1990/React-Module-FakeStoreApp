import { Spinner } from "react-bootstrap";

const Loading = ({ variant = "primary", size = "lg" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" variant={variant} size={size} />
    </div>
  );
};

export default Loading;
