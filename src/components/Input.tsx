

function Input({
    className,
    type = 'text',
    placeholder='Enter text'
}:{
    className: string,
    type: string,
    placeholder: string
}) {
  return (
    <div>
        <input type={type} placeholder={placeholder} className={`${className}`} />
    </div>
  )
}

export default Input