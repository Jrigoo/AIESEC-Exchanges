import React from "react";

interface Props {
  error: string;
}

export const Error: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="w-full my-2 bg-red-200 rounded">
          <p className="text-red-700 font-medium p-3 md:p-4">{error}</p>
        </div>
      )}
    </>
  );
};
