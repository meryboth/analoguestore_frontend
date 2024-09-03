function Footer() {
  return (
    <footer className='bg-zinc-950 text-white py-2 fixed w-full bottom-0'>
      <div className='container mx-auto text-center'>
        <p className='text-[12px]'>
          &copy; {new Date().getFullYear()} Analogue Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
