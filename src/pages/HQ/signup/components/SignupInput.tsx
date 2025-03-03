interface InputProps {
  placeholder: string;
}
const SignupInput = ({ placeholder }: InputProps) => {
  return (
    <div className="w-full">
      <input
        placeholder={placeholder}
        className="placeholder:font-md-medium flex w-full h-14 p-4 justify-center items-center gap-[10px] rounded-xl border border-solid border-gray-300"
      />
    </div>
  );
};

export default SignupInput;
