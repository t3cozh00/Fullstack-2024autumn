import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export default function Course({ course }) {
  return (
    <div>
      {course.map((course) => (
        <div key={course.id}>
          <Header header={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
}
