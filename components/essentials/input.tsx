import clsx from "clsx";

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={clsx("border rounded px-4 py-2", props.className)}
    />
  );
};
export default Input;
