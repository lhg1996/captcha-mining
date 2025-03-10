import { webcrack } from "./webcrack";

export async function cleanJavascript(js: string): Promise<string> {
  const res = await webcrack(js, {
    unpack: true,
    unminify: true,
    deobfuscate: true,
    mangle: "stable",
  })
  return res.code
}

