import Link from "next/link";
import Button from "../essentials/button";
import Logo from "../essentials/logo";
import { createClient } from "@/lib/supabase/server";

const Navbar = async () => {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;
  return (
    <div className="py-4 bg-gradient-to-br from-gray-800 to-gray-900 text-white sticky top-0">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <div>{user?.email}</div>
            <Button className="bg-white text-black" href="/submit">
              Submit code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
