const footer = () => {
  // get the current year
  const year = new Date().getFullYear();
  return (
    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto text-center">
        <p>&copy; {year} Staff Swap. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default footer;
