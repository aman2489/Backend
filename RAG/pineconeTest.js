import 'dotenv/config';
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: "pcsk_49ieXz_DaDpfbTPEAiU1c6pFxuDcJHrrHSgvFpsYxqb6g97uaQTd2kE31rPUeDZTeDsjVq" });

// Test 1: Can we list indexes?
const indexes = await pc.listIndexes();
console.log("Indexes:", indexes);

// Test 2: Can we access the specific index?
const index = pc.index("cohort-2-rag");
const stats = await index.describeIndexStats();
console.log("Stats:", stats);