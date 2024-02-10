function Backdrop({ children }) {
  return (
    <div className="flex justify-center items-center bg-gradient-light h-full">
      {children}
    </div>
  );
}

export default Backdrop;
