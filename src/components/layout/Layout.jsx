/* eslint-disable react/prop-types */
import Navbar from "../Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
