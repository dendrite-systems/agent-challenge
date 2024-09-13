"use client";
import Button from "@/components/essentials/button";
import { createClient } from "@/lib/supabase/client";
import { isProduction } from "@/lib/utils";

import { IconBrandGithubFilled, IconBrandX } from "@tabler/icons-react";

const Login = () => {
  const buttonClass = "bg-black text-white flex justify-center py-4";
  const supabase = createClient();
  const baseUrl = isProduction()
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
  const redirectUrl = `${baseUrl}/api/auth/callback`;
  const githubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: redirectUrl,
      },
    });
    console.log({ data, error });
  };
  const twitterLogin = async () => {
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: "twitter",
    // });
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-[800px] mx-auto pb-32">
        <div className="text-center mb-6">
          <h1>Sign in with</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button className={buttonClass} onClick={githubLogin}>
            <span className="flex gap-2">
              <IconBrandGithubFilled color="white" /> GitHub
            </span>
          </Button>
          <Button
            className={buttonClass}
            onClick={twitterLogin}
            disabled={true}
          >
            <span className="flex gap-2">
              <IconBrandX color="white" /> X
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
