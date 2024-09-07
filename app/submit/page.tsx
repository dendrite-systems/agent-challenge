import { SubmitButton } from "@/components/essentials/button/submit";
import Input from "@/components/essentials/input";
import { submitRepo } from "@/lib/repositories/submit";
import Countdown from "./Countdown";

const SubmitPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const success = searchParams?.success && searchParams.success === "true";
  const message = searchParams?.message;
  console.log({ success, message });
  return (
    <div className="text-center px-10 py-32">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Submit your code!</h1>
        <p>
          Time left: <Countdown />
        </p>
      </div>
      <form className="flex items-center flex-col gap-2">
        <label htmlFor="githubRepo">GitHub Repo</label>
        <Input
          type="text"
          name="githubRepo"
          placeholder="https://github.com/xxxxx/xxxxxxxxxx"
          className="text-xl max-w-full w-[500px]"
        />
        <SubmitButton
          formAction={submitRepo}
          className="text-lg bg-black text-white"
        >
          Submit
        </SubmitButton>
        {success === false && <p className="text-red-500">{message}</p>}
        {success === true && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default SubmitPage;
