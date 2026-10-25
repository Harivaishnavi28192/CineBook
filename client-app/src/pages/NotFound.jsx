import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center py-5 my-5 reveal">
      <div className="display-1 fw-bold text-orange mb-2">404</div>
      <h2 className="display-2 mb-3">
        Page <em>Not Found.</em>
      </h2>
      <p className="lead text-secondary mb-4">The screen you are looking for does not exist or has ended its run.</p>
      <Link to="/" className="btn btn-primary btn-pill btn-lg px-4 d-inline-flex align-items-center gap-2">
        <i className="ti ti-home"></i>
        <span>Return to Home</span>
      </Link>
    </div>
  );
}

export default NotFound;
