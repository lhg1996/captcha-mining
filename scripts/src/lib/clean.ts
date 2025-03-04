import { webcrack } from "webcrack";

export async function cleanJavascript(js: string): Promise<string> {
  const res = await webcrack(js, {
    unpack: true,
    unminify: true,
    deobfuscate: true,
    mangle: false, // https://github.com/j4k0xb/webcrack/issues/154
  })
  return res.code
}

