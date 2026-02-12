import Dexie, { type EntityTable } from "dexie";

interface StoredSource {
  title: string;
  subtitle: string;
  source_url: string;
  source_type: string;
}

interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  sequence: number;
  sources?: StoredSource[];
}

class ChatDatabase extends Dexie {
  messages!: EntityTable<StoredMessage, "id">;

  constructor() {
    super("prisma-docs-chat");
    this.version(2).stores({
      messages: "id, timestamp, sequence",
    });
  }
}

export const db = new ChatDatabase();
export type { StoredMessage, StoredSource };
