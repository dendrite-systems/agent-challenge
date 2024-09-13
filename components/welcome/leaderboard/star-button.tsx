"use client";

import { starRepo } from "@/lib/repositories/star";
import { IconStar } from "@tabler/icons-react";

const StarButton = ({ entryId }: { entryId: string }) => {
  const starAction = () => {
    console.log("GO");
    starRepo(entryId);
  };
  return (
    <button onClick={starAction}>
      <IconStar />
    </button>
  );
};

export default StarButton;
