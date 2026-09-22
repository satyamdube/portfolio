import { ragEngine } from "../src/rag/ragEngine.js";
import { AISynthesizer } from "../src/rag/aiSynthesizer.js";

async function runTests() {
  console.log("=== Initializing Clean RAG Engine ===");
  await ragEngine.init();

  const testQueries = [
    "Tell me about Satyam's Fullstack and Next.js architecture experience",
    "How does he achieve 30-40% performance optimization?",
    "What did he build for Axis Bank and PNB?",
    "How can I contact Satyam for a senior frontend role?"
  ];

  const synthesizer = new AISynthesizer();

  for (const q of testQueries) {
    console.log(`\n--------------------------------------------`);
    console.log(`Query: "${q}"`);
    const results = await ragEngine.retrieve(q, 3);
    console.log(`Retrieved ${results.length} chunks:`);
    results.forEach((r, idx) => {
      console.log(`  [${idx + 1}] ${r.chunk.title} (Match: ${r.percentage})`);
    });

    let streamed = "";
    await synthesizer.generateResponse(
      q,
      results,
      chunk => { streamed = chunk; },
      (fullText, sources) => {
        console.log(`\nGenerated Response (${fullText.length} chars):`);
        console.log(fullText.slice(0, 180) + "...\n");
      }
    );
  }

  console.log("=== All RAG tests completed successfully! ===");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
