import { getLLMContext } from 'app/lib/get-llm-context';

export async function GET() {
  const context = await getLLMContext();
  return new Response(context, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
