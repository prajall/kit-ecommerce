import React from "react";

interface HeaderProp {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProp> = ({ title, description }) => {
  return (
    <div className="py-3">
      <h2 className="text-2xl font-semibold py-1">{title}</h2>
      <p className="text-muted-foreground ">{description}</p>
    </div>
  );
};

export default Header;
