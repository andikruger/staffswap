const Footer = () => {
  // get the current year
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {year} Staff Swap. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
