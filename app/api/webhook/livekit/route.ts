import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import prismadb  from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { createTranslator } from "next-intl";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
    const user = await currentUser();
    const languageToUse = user?.language || "vi";
    let messages;
    messages = (await import(`@/messages/${languageToUse}.json`)).default;
    const t = createTranslator({ locale: languageToUse, messages });
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
        return new Response(t("webhook.noAuthorizationHeader"), { status: 400 });
    }

    const event = receiver.receive(body, authorization);

    if (event.event === "ingress_started") {
        await prismadb.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isLive: true,
            },
        });
    }

    if (event.event === "ingress_ended") {
        await prismadb.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isLive: false,
            },
        });
    }

    return new Response(t("webhook.eventSucces"), { status: 200 });
}
