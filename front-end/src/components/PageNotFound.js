import { Link } from "react-router-dom";
export default function ErrorPage() {
  return (
    <>
      <h1>Page Not Found!</h1>
      <Link to="/">Back To Home Page</Link>
    </>
  );
}
