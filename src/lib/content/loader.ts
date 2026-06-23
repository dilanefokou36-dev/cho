import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "public", "content-fr");

function addCacheBusting<T>(data: T, mtimeMs: number): T {
  if (Array.isArray(data)) {
    return data.map((item) => addCacheBusting(item, mtimeMs)) as T;
  }
  if (data && typeof data === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      if (key === "src" && typeof value === "string" && value.startsWith("http")) {
        const separator = value.includes("?") ? "&" : "?";
        result[key] = `${value}${separator}_cb=${mtimeMs}`;
      } else {
        result[key] = addCacheBusting(value, mtimeMs);
      }
    }
    return result as T;
  }
  return data;
}

export function loadJson<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as T;
  const stats = fs.statSync(filePath);
  return addCacheBusting(data, stats.mtimeMs);
}
