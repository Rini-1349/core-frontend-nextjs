import React, { useRef, useEffect } from "react";

/**
 * ClickOutside component
 *
 * @param {{ children: JSX.Element; exceptionRef: exceptionRef; onClick: function; className: string; }} param0
 * @param {JSX.Element} param0.children
 * @param {exceptionRef} param0.exceptionRef
 * @param {function} param0.onClick
 * @param {string} param0.className
 * @returns {JSX.Element}
 */
const ClickOutside = ({ children, exceptionRef, onClick, className }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside = (wrapperRef.current && wrapperRef.current.contains(event.target)) || (exceptionRef.current && exceptionRef.current === event.target) || (exceptionRef.current && exceptionRef.current.contains(event.target));
      } else {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target);
      }

      if (!clickedInside) onClick();
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className || ""}>
      {children}
    </div>
  );
};

export default ClickOutside;
