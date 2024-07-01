import { Session } from "@supabase/supabase-js";

export type SessionUser = Session & {
  selectedClass?: string;
};