"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { generateInt8Id } from "../utils";
import { EntryDTO } from "./types";

export const submitRepo = async (formdata: FormData) => {
  let redirectPath: string = "";
  try {
    const repoLink = formdata.get("githubRepo");
    const supabase = createClient();
    const uid = (await supabase.auth.getUser()).data.user?.id;
    if (!uid) throw "No authenticated user";
    if (!repoLink) throw "Repo link is required";

    const link = String(repoLink);
    if (!link.trim().startsWith("https://github.com/"))
      throw "Invalid repo link";

    const id = generateInt8Id().toString();
    const data: EntryDTO = {
      id,
      uid,
      link,
      stars: 0,
    };
    const operation = await supabase.from("entries").insert(data);
    if (operation.error) throw operation.error.message;
    redirectPath = `/submit?success=true&message=Repository submitted!`;
  } catch (err) {
    console.error("Something went wrong", err);
    redirectPath = `/submit?success=false&message=${String(err)}`;
  } finally {
    redirect(redirectPath);
  }
};
