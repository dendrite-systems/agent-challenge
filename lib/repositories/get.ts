"use server";
import { createClient } from "../supabase/server";
import { EntryDTO } from "./types";

export const getRepos = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("entries")
      .select("id::text, uid, link, stars");
    if (error) throw error.message;
    return data as EntryDTO[];
  } catch (err) {}
};
