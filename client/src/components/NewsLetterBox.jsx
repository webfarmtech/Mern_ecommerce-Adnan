import React from "react";
import { SubTitle, Title } from "./Title";
import { newsLetterContent } from "../constant";

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center mt-8">
      {/* Title */}
      <Title
        className="font-bold text-black text-2xl"
        text1={newsLetterContent.title}
      />

      {/* Newsletter Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-[500px] border rounded-xl flex items-center mx-auto my-3 p-1"
      >
        <input
          type="email"
          placeholder={newsLetterContent.form.placeholder}
          className="w-full text-black rounded-xl p-2 mr-2"
          required
        />
        <button className="bg-black border rounded-xl text-white text-xs px-7 py-2 font-bold hover:bg-white hover:text-black hover:scale-x-105 hover:px-9 transition-all duration-300">
          {newsLetterContent.form.buttonText}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-2">
        {newsLetterContent.footerText}
      </p>
    </div>
  );
};

export default NewsLetterBox;
