const Groq = require("groq-sdk");

const solveDoubt = async (req, res) => {

  try {

    const { messages, title, description, testCases, startCode } = req.body;


    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `
You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

## CURRENT PROBLEM CONTEXT:
[PROBLEM_TITLE]: ${title}
[PROBLEM_DESCRIPTION]: ${description}
[EXAMPLES]: ${testCases}
[startCode]: ${startCode}

## YOUR CAPABILITIES:
1. Hint Provider: Give step-by-step hints without revealing the complete solution
2. Code Reviewer: Debug and fix code submissions with explanations
3. Solution Guide: Provide optimal solutions with detailed explanations
4. Complexity Analyzer: Explain time and space complexity trade-offs
5. Approach Suggester: Recommend different algorithmic approaches

## RESPONSE FORMAT:
- Use clear explanations
- Provide code with syntax formatting
- Explain step-by-step
- Always relate back to the current problem

## STRICT LIMITATIONS:
- ONLY discuss topics related to the current DSA problem
- DO NOT help with non-DSA topics
- If asked unrelated topics respond:
"I can only help with the current DSA problem."

## TEACHING PHILOSOPHY:
Encourage understanding over memorization.
`
        },

        ...messages
      ],
      temperature: 0.3
    });

    const responseText = completion.choices[0]?.message?.content;

    console.log(responseText);

    if (!responseText) {
      return res.status(500).json({
        message: "AI failed to generate a response."
      });
    }

    return res.status(201).json({
      message: responseText
    });

  }
  catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal server error"
    });
  }

};

module.exports = solveDoubt;