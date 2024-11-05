import React, { useState } from "react";
import { Accordion as BootstrapAccordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AccordionStyle.css";
import AccordionItem from "./AccordionItem";

export default function Accordion({ data_providers }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // activeIndex에 따라 배열을 재정렬
  const sortedDataProviders = [...data_providers];
  if (activeIndex !== null) {
    const [activeItem] = sortedDataProviders.splice(activeIndex, 1);
    sortedDataProviders.unshift(activeItem);
    console.log("sortedDataProviders", sortedDataProviders);
  }

  return (
    <BootstrapAccordion
      className="custom-accordion-container"
      activeKey={activeIndex !== null ? "0" : null}
      onSelect={(eventKey) =>
        setActiveIndex(eventKey !== activeIndex ? eventKey : null)
      }
    >
      {sortedDataProviders.map((item, index) => (
        <AccordionItem
          key={index}
          eventKey={index.toString()}
          title={item.prov_consent_nm}
          recipient={item.recipient}
          sharedData={item.sharedData}
          isOpen={activeIndex === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </BootstrapAccordion>
  );
}
