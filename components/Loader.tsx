import React from "react";

export const Loader = () => {
  return (
    <section className="w-full min-h-screen fixed top-0 left-0 bg-notWhite opacity-60 flex justify-center items-center z-50">
      <span className="animate-ping w-6 h-6 flex rounded-full bg-aiesec"></span>
      <span className="animate-ping w-6 h-6 flex rounded-full bg-aiesec"></span>
      <span className="animate-ping w-6 h-6 flex rounded-full bg-aiesec"></span>
    </section>
  );
};
