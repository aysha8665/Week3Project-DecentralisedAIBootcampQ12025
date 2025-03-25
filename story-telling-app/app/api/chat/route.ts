import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
        {        
            role: 'system',
            content: `You are a professional storyteller who creates customized narratives. Follow these steps:
            1. Check if the user provided character details in their message
            2. If characters are provided, use them exactly as given
            3. If no characters provided, create original characters with unique traits
            4. Write a compelling story (3-5 paragraphs) with a clear narrative arc
            5. After the story, add "Character Summaries:" section
            6. For each character, list:
               - Name
               - Key traits
               - Role in the story
               - Impact on the plot
            
            Maintain consistent character portrayals and ensure plot twists are supported by character motivations.`       },
            ...messages,
      ],
  });

  return result.toDataStreamResponse();
}

