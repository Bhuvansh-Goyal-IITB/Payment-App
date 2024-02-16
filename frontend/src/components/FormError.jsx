import { useEffect, useRef } from "react";

function FormError({ elementList, errorComponent: ErrorComponent }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (elementList.every(({ condition }) => !condition)) {
      containerRef.current.style.height = "0px";
    } else {
      elementList.forEach(({ condition }, index) => {
        const element = containerRef.current?.children[index];
        if (condition && element && containerRef.current) {
          containerRef.current.style.height = `${element.clientHeight}px`;
          return;
        }
      });
    }
  }, [elementList]);

  return (
    <div ref={containerRef} className="relative overflow-clip">
      {elementList.map(({ condition, message }, index) => (
        <ErrorComponent
          key={index}
          showCondition={condition}
          errorMessage={message}
        />
      ))}
    </div>
  );
}

export default FormError;
