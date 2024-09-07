"use server";

import { createClient } from "../supabase/server";

export const starRepo = async (id: string) => {
  try {
    const supabase = createClient();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw "No authenticated user";
    supabase.from("entries").update({ stars: 1 }).eq("stars", id);
  } catch (err) {}
};
