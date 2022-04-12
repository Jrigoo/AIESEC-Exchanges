import React from "react";

interface Props {
  error: string;
}

export const Error: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="w-full my-2 bg-red-200 rounded text-xs md:text-sm">
          <p className="p-3 text-red-700 font-medium md:p-4">{error}</p>
        </div>
      )}
    </>
  );
};
