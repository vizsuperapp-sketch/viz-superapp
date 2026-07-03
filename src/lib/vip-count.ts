import { supabase } from "@/integrations/supabase/client";

const FALLBACK_COUNT = 247;

export async function getVipCount(): Promise<number> {
  try {
    const { data, error } = await supabase.functions.invoke("get-vip-count", {
      method: "GET",
    });

    if (error) {
      console.error("getVipCount invoke error:", error);
      return FALLBACK_COUNT;
    }

    const count = data?.count;
    return typeof count === "number" && !Number.isNaN(count) ? count : FALLBACK_COUNT;
  } catch (err) {
    console.error("getVipCount unexpected error:", err);
    return FALLBACK_COUNT;
  }
}
