function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-6'>
      <div className='container mx-auto text-center'>
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className='flex justify-center space-x-4 mt-4'>
          <a href='#' className='hover:text-gray-300'>
            Privacy Policy
          </a>
          <a href='#' className='hover:text-gray-300'>
            Terms of Service
          </a>
          <a href='#' className='hover:text-gray-300'>
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
