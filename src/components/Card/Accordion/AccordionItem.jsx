import React from "react";
import { Accordion as BootstrapAccordion } from "react-bootstrap";
import "./AccordionStyle.css";

export default function AccordionItem({
  title,
  recipient,
  sharedData,
  eventKey,
}) {
  const trimmedTitle = title.split(/를 위한|을 위한/)[0];
  const sharedDataText = Array.isArray(sharedData)
    ? sharedData.join(", ")
    : "전송 항목 없음";

  return (
    <BootstrapAccordion.Item
      eventKey={eventKey}
      className="custom-accordion-item"
    >
      <BootstrapAccordion.Header>
        <span>{trimmedTitle}</span>
      </BootstrapAccordion.Header>
      <BootstrapAccordion.Body>
        <div className="provider-table-container">
          <table className="provider-table">
            <colgroup>
              <col style={{ width: "40%" }} />
              <col style={{ width: "60%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>제공받는 자</th>
                <th>전송 항목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{recipient || "제공받는 자 없음"}</td>
                <td>{sharedDataText}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BootstrapAccordion.Body>
    </BootstrapAccordion.Item>
  );
}
