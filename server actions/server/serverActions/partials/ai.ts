// Helper function to handle fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId); // Clear timeout on success
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId); // Clear timeout on error
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
}

type createProps = {
  inputs: string;
  negative_prompt: string[];
  num_inference_steps: number;
  target_size: { width: number; height: number };
  seed: number;
};

async function create(
  inputs: string,
  negative_prompt: string[],
  num_inference_steps: number,
  target_size: { width: number; height: number },
  seed: number
) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: inputs,
          negative_prompt: negative_prompt,
          num_inference_steps: num_inference_steps,
          target_size: target_size,
          seed: seed,
        }),
      }
    );
    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Hugging Face API error:", error);
    throw error;
  }
}

export const ai = {
  create,
};
