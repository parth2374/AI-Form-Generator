import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
    schema: "./configs/schema.js",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://ai-interview_owner:J8TcZSjlVx7g@ep-rapid-sea-a5y6n8q3.us-east-2.aws.neon.tech/AI-Form-Builder?sslmode=require',
    }
});