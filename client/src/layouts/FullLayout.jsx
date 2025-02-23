import PropTypes from "prop-types";
import Navbar from "../components/Navbar/Navbar";

export default function FullLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

FullLayout.propTypes = {
  children: PropTypes.node,
};
