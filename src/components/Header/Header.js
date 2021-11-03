import React from "react";

const Header = ({ courseType }) => {
  const course_type = courseType.split("-");
  return (
    <header>
      <h2 className="text-center text-primary py-3 border-bottom text-capitalize">
        {`${course_type[0]} ${course_type[1]}`} Courses
      </h2>
    </header>
  );
};

export default Header;
