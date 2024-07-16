import React from 'react'

function Section({children, className}: 
  {children: React.ReactNode,
  className?: string
  }) {
  return (
    <div className={`${className ? className : 'py-[16rem] -mt-[5.25rem] px-10'}`}>{children}</div>
  )
}

export default Section