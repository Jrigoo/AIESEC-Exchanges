import React from "react";
import { InformationCircleIcon } from "@heroicons/react/outline";

interface Props {
  info: string;
}

export const Info: React.FC<Props> = ({ info }) => {
  return (
    <>
      <InformationCircleIcon className="w-4 h-4 md:h-5 md:w-5 absolute right-3 -top-1 cursor-pointer text-zinc-800 hover:text-zinc-600 peer transition-all duration-300" />
      <div className="absolute text-xs -top-9 right-0 hidden peer-hover:block transition-all duration-300 bg-notWhite rounded border p-1 shadow text-zinc-800">
        <p>{info}</p>
      </div>
    </>
  );
};
