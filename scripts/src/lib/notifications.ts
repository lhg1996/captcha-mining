
export async function alert(message: string) {
  console.error(message);
  return sendDiscordNotification({
    content: message.slice(0, 2000),
  });
}

export async function notify(message: string) {
  console.log(message);
  return sendDiscordNotification({
    content: message.slice(0, 2000),
  });
}

async function sendDiscordNotification(content: any) {
  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) return;

  const url = new URL(webhook);
  url.searchParams.append("wait", "true");

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });

  const json = await response.json();
  console.debug(`Discord notification sent`, json);

  if (!response.ok) {
    console.error(`Failed to send Discord notification: ${response.status}`);
  }
}
