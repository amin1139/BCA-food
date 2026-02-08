import React from "react";
import { ShimmerPostList, ShimmerThumbnail, ShimmerContentBlock } from "react-shimmer-effects";

const Shimmer = () => {
  return(
    <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={3} gap={30} />
  )
}

export const MenuShimmer = () => {

  return (
    <>
      <ShimmerThumbnail height={250} rounded />
      <ShimmerContentBlock
          title
          text
          cta
          thumbnailWidth={370}
          thumbnailHeight={370}
        />
    </>
  )
}
export default Shimmer