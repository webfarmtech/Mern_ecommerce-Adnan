const Title = ({ text1, text2, className, withBorder = true, onClick }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p onClick={onClick} className={`${className} text-black text-2xl `}>
        <span className="text-white font-medium">{text1}</span> {text2}
      </p>
      {withBorder && <ThickTitleBorder />}
    </div>
  );
};

const SubTitle = ({ subtitle, className }) => {
  return (
    <p
      className={`w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ${className}`}
    >
      {subtitle}
    </p>
  );
};

const ThickTitleBorder = () => {
  return <p className="w-5 h-[2px] bg-white md:w-11"></p>;
};

const ThinTitleBorder = () => {
  return <p className="w-5 h-[2px] bg-white md:w-11"></p>;
};
export { Title, ThickTitleBorder, ThinTitleBorder, SubTitle };
