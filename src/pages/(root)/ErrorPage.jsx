import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Error 404: Page Not Found</h1>
      <p>Sorry, the page you requested could not be found.</p>
      <Link to='/' className='cursor-pointer'>
        Go back to the home page
      </Link>
    </div>
  );
};

export default ErrorPage;
