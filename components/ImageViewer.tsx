import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  resizable?: boolean;
};

const ImageViewer = (props: Props) => {
  return (
    <div>
      <Image
        src={
          props.image
            ? props.image.length > 0
              ? props.image
              : "/images/placeholder.jpg"
            : "/images/placeholder.jpg"
        }
        width={250}
        height={250}
        alt="prompt image"
        className={
          props.resizable
            ? "rounded-md w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px] xl:w-[200px] xl:h-[200px] object-contain"
            : "rounded-md object-contain w-[400px]"
        }
      />
    </div>
  );
};

export default ImageViewer;
