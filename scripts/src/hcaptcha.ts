import path from "node:path";

import { alert, notify } from "./lib/notifications";
import fs from "fs-extra";
import { tryAndPush } from "./lib/git";
import { cleanJavascript } from "./lib/clean";

const dir = path.resolve("../hcaptcha");
await fs.ensureDir(dir);

const assets = [
  ["https://newassets.hcaptcha.com/captcha/v1/%s/hcaptcha.js", "hcaptcha.js"],
  ["https://newassets.hcaptcha.com/captcha/v1/%s/challenge/image_label_binary/challenge.js", "image_label_binary_challenge.js"],
  ["https://newassets.hcaptcha.com/captcha/v1/%s/challenge/image_label_area_select/challenge.js", "image_label_area_select_challenge.js"],
  ["https://newassets.hcaptcha.com/captcha/v1/%s/static/hcaptcha.html", "hcaptcha.html"],
]

export async function updateHCaptcha() {
  const res = await fetch("https://hcaptcha.com/1/api.js");
  const text = await res.text();

  if (!res.ok) {
    await alert(`Failed to fetch hCaptcha: ${res.status} ${text}`);
    return;
  }

  const version = /\/captcha\/v1\/([a-f\d]+)\//.exec(text)?.[1];
  console.log(`hCaptcha version: ${version}`);
  if (!version) {
    await alert(`Failed to parse hCaptcha version from ${res.url}`);
    return;
  }

  const versionDir = path.join(dir, "archive", version);
  const current = path.join(dir, "current");
  if (await fs.pathExists(versionDir) && await fs.pathExists(current)) {
    console.log("Already got this version");
    return;
  }

  const cleaned = await cleanJavascript(text);

  await fs.ensureDir(versionDir);
  await fs.writeFile(path.join(versionDir, "api.js"), text);
  await fs.writeFile(path.join(versionDir, "api.clean.js"), cleaned);

  await fs.ensureDir(current);
  await fs.writeFile(path.join(current, "api.js"), text);
  await fs.writeFile(path.join(current, "api.clean.js"), cleaned);

  for (const [url, file] of assets) {
    const actualUrl = url.replace("%s", version);
    console.log(`Fetching ${actualUrl}`);
    const res = await fetch(actualUrl);
    const text = await res.text();
    if (!res.ok) {
      await alert(`Failed to fetch ${file}: ${res.status} ${text}`);
      continue;
    }

    await fs.writeFile(path.join(versionDir, file), text);
    await fs.writeFile(path.join(current, file), text);
    if (file.slice(-3) === ".js") {
      const cleaned = await cleanJavascript(text);
      await fs.writeFile(path.join(versionDir, file.replace(".js", ".clean.js")), cleaned);
      await fs.writeFile(path.join(current, file.replace(".js", ".clean.js")), cleaned);
    }
  }

  const url = await tryAndPush([
    path.join("hcaptcha", "archive", version, "*.js"),
    path.join("hcaptcha", "archive", version, "*.html"),
    path.join("hcaptcha", "current", "*.js"),
    path.join("hcaptcha", "current", "*.html"),
  ], `hCaptcha version ${version}`)

  await notify(`Updated hCaptcha version ${version}: ${url}`);
}

