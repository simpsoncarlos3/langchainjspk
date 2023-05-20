import { BufferMemory } from "langchain/memory";
import { RedisUpstashChatMessageHistory } from "langchain/stores/message/redis_upstash";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";

const memory = new BufferMemory({
  chatHistory: new RedisUpstashChatMessageHistory({
    sessionId: new Date().toISOString(), // Or some other unique identifier for the conversation
    sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
    config: {
      url: "https://ADD_YOURS_HERE.upstash.io", // Default value, override with your own instance's URL
      token: "********", // Default value, override with your own instance's token
    },
  }),
});

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

const chain = new ConversationChain({ llm: model, memory });

const res1 = await chain.call({ input: "Hi! I'm Jim." });
console.log({ res1 });
/*
{
  res1: {
    text: "Hello Jim! It's nice to meet you. My name is AI. How may I assist you today?"
  }
}
*/

const res2 = await chain.call({ input: "What did I just say my name was?" });
console.log({ res2 });

/*
{
  res1: {
    text: "You said your name was Jim."
  }
}
*/
