import React, { useState } from "react";

const GalleryImage = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{ ...props.imageProps.style, textAlign: "center" }}
      className="rounded-xl"
    >
      <img {...props.imageProps} className="rounded-xl" />
    </div>
  );
};

export default GalleryImage;
