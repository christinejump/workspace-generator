import { FormData, GenerateResponse, Tone } from './types';

const MOCK_DELAY = 800;

function generateMockText(formData: FormData): string {
  const { topic, tone, outputLength, input } = formData;

  const shortContent: Record<Tone, (topic: string, input: string) => string> = {
    Friendly: (t, i) => `Hey there! Thanks for sharing your thoughts on ${t}. I've reviewed what you mentioned: "${i.substring(0, 80)}..." and I think this is a great starting point. Looking forward to collaborating more on this!`,
    Professional: (t, i) => `Thank you for your inquiry regarding ${t}. After careful consideration of the information provided: "${i.substring(0, 80)}..." I am pleased to present this response. Please let me know if you require any additional information.`,
    Direct: (t, i) => `Re: ${t}\n\nI've reviewed your input: "${i.substring(0, 80)}..."\n\nHere's the summary: This addresses the key points you raised. Let me know if you need clarification on any aspect.`,
  };

  const mediumContent: Record<Tone, (topic: string, input: string) => string> = {
    Friendly: (t, i) => `Hey there! Thanks so much for reaching out about ${t}. I really appreciate you taking the time to share all these details with me.\n\nAfter reading through everything you mentioned: "${i.substring(0, 100)}..." I have to say, you've really thought this through! I think we're on the same page here, and I'm excited to help you move forward with this.\n\nThe approach you're suggesting makes a lot of sense, and I can see how it would work really well. If you want to chat more about the specifics or brainstorm some ideas, I'm totally here for it. Just let me know what works best for you!`,
    Professional: (t, i) => `Dear Colleague,\n\nThank you for your detailed communication regarding ${t}. I have thoroughly reviewed the information you provided: "${i.substring(0, 100)}..."\n\nYour perspective on this matter is well-articulated and demonstrates a comprehensive understanding of the subject. I believe we can move forward with confidence based on the foundation you've established.\n\nI recommend we proceed with the next steps at your earliest convenience. Should you require any clarification or additional support, please do not hesitate to contact me.`,
    Direct: (t, i) => `Subject: ${t}\n\nI've analyzed your input: "${i.substring(0, 100)}..."\n\nKey takeaways:\n- Your main points are clear and actionable\n- The approach is sound and well-reasoned\n- Implementation can begin immediately\n\nNext steps: Review the details and confirm your preferred timeline. I'm available to discuss specifics whenever you're ready.`,
  };

  const longContent: Record<Tone, (topic: string, input: string) => string> = {
    Friendly: (t, i) => `Hey! I'm so glad you reached out about ${t}. This is exactly the kind of thing I love working on, and I can tell you've put a lot of thought into this already.\n\nLet me address what you shared: "${i.substring(0, 120)}..." First off, I think your instincts here are spot on. You've identified the core issues and you're asking all the right questions. That's honestly half the battle right there!\n\nWhat I'm thinking is that we could take this in a few different directions, depending on what you're trying to accomplish. If your main goal is to streamline things, we might want to focus on simplifying the process. But if you're looking to expand or add new capabilities, we could explore some more creative options.\n\nEither way, I'm confident we can figure this out together. I've seen similar situations before, and with the right approach, things tend to fall into place pretty naturally. The key is just staying flexible and being willing to adjust as we go.\n\nWhy don't we touch base soon to talk through the details? I'd love to hear more about your vision for this and make sure we're aligned on the direction. Sound good?`,
    Professional: (t, i) => `Dear Valued Partner,\n\nI hope this message finds you well. I am writing in response to your comprehensive inquiry concerning ${t}. Your detailed exposition has been carefully reviewed and considered.\n\nRegarding the context you provided: "${i.substring(0, 120)}..." I must commend you on the thoroughness and clarity of your presentation. The points you have raised demonstrate both insight and strategic thinking, which will serve as an excellent foundation for our continued collaboration.\n\nBased on my analysis, I believe we are well-positioned to advance this initiative. The framework you have outlined aligns with industry best practices and demonstrates a clear understanding of the relevant considerations. I am confident that with proper execution and attention to detail, we can achieve the desired outcomes.\n\nMoving forward, I recommend we establish a structured approach to implementation. This will ensure that all stakeholders are informed and that progress can be tracked effectively. I am prepared to provide whatever support or resources may be necessary to facilitate success.\n\nPlease feel free to schedule a meeting at your convenience to discuss the next phases in greater detail. I remain at your disposal for any questions or concerns you may have.`,
    Direct: (t, i) => `RE: ${t}\n\nYour input received: "${i.substring(0, 120)}..."\n\nAnalysis:\nYou've covered the main points. The logic is sound. The proposed approach will work.\n\nRecommendations:\n1. Proceed with your current plan\n2. Monitor results and adjust as needed\n3. Keep communication channels open\n\nBottom line: This is viable and ready for execution. The groundwork is solid, and the path forward is clear. No major obstacles anticipated.\n\nTimeline: We can start immediately. Estimated completion depends on scope, but with focused effort, you'll see progress quickly.\n\nQuestions? I'm available. Need resources? Let me know what you need and when.\n\nLet's move forward.`,
  };

  const contentMap = {
    Short: shortContent,
    Medium: mediumContent,
    Long: longContent,
  };

  const generator = contentMap[outputLength][tone];
  return generator(topic, input);
}

export async function generateText(formData: FormData): Promise<GenerateResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!formData.topic || !formData.input) {
          reject(new Error('Topic and Input are required fields'));
          return;
        }

        const generatedText = generateMockText(formData);

        resolve({
          output: generatedText,
        });
      } catch (error) {
        reject(new Error('An unexpected error occurred while generating text'));
      }
    }, MOCK_DELAY);
  });
}
