import { config } from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone'
config();
import fs from 'fs';
import {PDFParse} from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from '@langchain/mistralai';

// console.log("PINECONE:", process.env.PINECONE_API_KEY);
// console.log("MISTRAL:", process.env.MISTRAL_API_KEY);
console.log(typeof fetch);

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("rag");


let dataBuffer = fs.readFileSync("./story.pdf");

const parser = new PDFParse({
    data: dataBuffer
});

const data = await parser.getText();

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
});

// console.log(data);

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0
});

const chunks = await splitter.splitText(data.text);

// const docs = await embeddings.embedDocuments(chunks);
const docs = await Promise.all(chunks.map(async (chunk) => {
    const embedding = await embeddings.embedQuery(chunk);
    return {
        text: chunk,
        embedding
    }
}));

const result = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})

console.log(result);