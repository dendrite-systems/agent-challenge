import clsx from "clsx";
import Link from "next/link";

const ButtonWrapper = ({
  href,
  children,
}: {
  href: string | undefined;
  children: React.ReactNode;
}) => {
  if (href) return <Link href={href}>{children}</Link>;
  return children;
};

const Button = ({
  className = "",
  children,
  href,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string;
    href?: string;
    children: React.ReactNode;
  }) => (
  <ButtonWrapper href={href}>
    <button
      {...props}
      className={clsx(
        "rounded py-2 px-4 text-base font-semibold hover:opacity-75",
        { "!opacity-50": props.disabled },
        className
      )}
    >
      {children}
    </button>
  </ButtonWrapper>
);

export default Button;
