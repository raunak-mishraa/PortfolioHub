interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

function Button({children, className}: ButtonProps) {
  return (
    <div className={`${className} border inline-block border-n-3 bg-n-7 transition-colors button`}>
        {children}
    </div>
  )
}

export default Button