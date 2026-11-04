import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = (process.env.DATABASE_NAME || "fable_ebook_platform").trim();
const db = client.db(dbName);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),

  // additional fields
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "reader",
      },

      agreeToTerms: {
        type: "boolean",
        default: false,
      },
    },
  },

  // callbacks
  callbacks: {
    async afterSignIn(user, session) {
      // This will be called on the server after sign in
      // We'll handle token exchange on the client side instead
      return user;
    },
  },
});
