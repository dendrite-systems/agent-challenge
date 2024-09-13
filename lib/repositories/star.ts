"use server";

import { createAdminClient, createClient } from "../supabase/server";

export const starRepo = async (id: string) => {
  try {
    const supabase = createClient();
    const supabaseAdmin = createAdminClient();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw "No authenticated user";
    const stars = (
      await supabaseAdmin.from("entries").select("stars").eq("id", id)
    ).data?.[0].stars as number | undefined;
    console.log({ stars });
    const a = await supabaseAdmin
      .from("entries")
      .update({
        stars: supabaseAdmin.rpc("increment_stars", {
          entry_id: BigInt(id).toString(),
        }),
      })
      .eq("id", id);
    console.log(a);
  } catch (err) {
    console.log(err);
  }
};
