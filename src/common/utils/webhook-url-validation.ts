import { BadRequestException } from "@nestjs/common";
import axios from "axios";

export const validateWebhookUrl = async (url: string): Promise<void> => {
  try {
    const parsed = new URL(url);
    // Optional: Check hostname blocklist
    const blockedHosts = ["localhost", "ngrok.io", "host.docker.internal", "ngrok-free.app"];
    const isBlocked = blockedHosts.some((blocked) => parsed.hostname === blocked || parsed.hostname.endsWith(`.${blocked}`));

    if (isBlocked) {
      throw new BadRequestException("Blocked hostname in webhook URL");
    }
    // Require HTTPS
    if (parsed.protocol !== "https:") {
      throw new BadRequestException("Webhook URL must use HTTPS");
    }

    // Block suspicious ports (optional - allow 443 or none)
    const port = parsed.port || (parsed.protocol === "https:" ? "443" : "");
    if (port && port !== "443") {
      throw new BadRequestException("Webhook URL must use standard HTTPS port 443");
    }

    // // Final check: try HEAD request for reachability
    await axios.head(url, {
      timeout: 3000,
      maxRedirects: 0, // Prevent redirect chains
      validateStatus: (status) => status < 500, // Consider non-4xx valid
    });
  } catch (err) {
    throw new BadRequestException(err?.message || "Invalid or unreachable webhook URL");
  }
};
