function CenteredText({ children, className }) {
  return (
    <div className={`flex text-center justify-center p-2 ${className}`}>
      {children}
    </div>
  );
}

export default CenteredText;
