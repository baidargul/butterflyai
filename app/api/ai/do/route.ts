import { SERVER_ACTIONS } from "@/server actions/server/serverActions/serverActions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    const data = await req.json();

    const res = await SERVER_ACTIONS.ai.create(
      data.prompt,
      data.negative,
      data.steps,
      { width: data.width, height: data.height },
      data.seed
    );
    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    response.status = 200;
    response.message = "Success";
    response.data = { image: base64 };
    return new Response(JSON.stringify(response));
  } catch (error: any) {
    console.log("[SERVER ERROR]: doAPI :== " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response));
  }
}
