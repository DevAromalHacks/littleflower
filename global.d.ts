import { Database } from "./app/lib/supabase/database.types";

declare global{
    type Database = DB;
}