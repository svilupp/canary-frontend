import { Prompt, setMetadata, MetadataMode, type PromptMeta } from "textprompts";

// Set strict metadata mode globally for skills
setMetadata(MetadataMode.STRICT);

// Extend PromptMeta to include our custom fields
export interface ExtendedPromptMeta extends PromptMeta {
  taskId?: string;
  severity?: string;
  terminatesOnFailure?: boolean;
}

export interface SkillInstruction {
  id: string;
  title: string;
  version: string;
  description: string;
  taskId?: string;
  severity?: string;
  terminatesOnFailure?: boolean;
  content: string;
  path: string;
  order: number;
}

export interface SkillStage {
  id: string;
  name: string;
  order: number;
  instructions: SkillInstruction[];
}

export interface SkillsData {
  stages: SkillStage[];
  totalInstructions: number;
}

/**
 * Extract stage info from file path
 * e.g., "/skills/qa-tester/instructions/stage-1-initial-load/01-file.txt"
 * Returns: { stageName: "Initial Load", stageId: "stage-1-initial-load", stageOrder: 1 }
 */
function parseFilePath(filePath: string): {
  stageName: string;
  stageId: string;
  stageOrder: number;
  filename: string;
  instructionOrder: number;
} {
  const parts = filePath.split("/");
  const filename = parts[parts.length - 1];
  const stageId = parts[parts.length - 2];

  // Parse stage directory name
  const stageMatch = stageId.match(/^stage-(\d+)-(.+)$/);
  const stageOrder = stageMatch ? parseInt(stageMatch[1], 10) : 0;
  const stageName = stageMatch
    ? stageMatch[2]
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : stageId;

  // Parse instruction order from filename
  const instructionMatch = filename.match(/^(\d+)-/);
  const instructionOrder = instructionMatch ? parseInt(instructionMatch[1], 10) : 0;

  return { stageName, stageId, stageOrder, filename, instructionOrder };
}

/**
 * Load all skill instructions using Vite's glob import
 * This bundles all .txt files at build time, making them available in Cloudflare Workers
 */
export async function loadSkillInstructions(): Promise<SkillsData> {
  const stages: SkillStage[] = [];
  const stageMap = new Map<string, SkillStage>();

  try {
    // Use Vite's eager glob import to load all .txt files at build time
    // This works in both dev and production (Cloudflare Workers)
    const modules = import.meta.glob<{ default: string }>(
      "/app/skills/qa-tester/instructions/stage-*/*.txt",
      { query: "?raw", eager: true }
    );

    // Process each file
    for (const [filePath, module] of Object.entries(modules)) {
      const { stageName, stageId, stageOrder, filename, instructionOrder } = parseFilePath(filePath);

      // Parse the file content using textprompts
      // textprompts automatically parses TOML front-matter in STRICT mode
      const prompt = Prompt.fromString(module.default, {
        path: filePath,
        meta: MetadataMode.STRICT
      });

      const meta = prompt.meta as ExtendedPromptMeta;

      // Create instruction object
      const instruction: SkillInstruction = {
        id: meta?.taskId || filename.replace(".txt", ""),
        title: meta?.title || "Untitled",
        version: meta?.version || "0.0.0",
        description: meta?.description || "",
        taskId: meta?.taskId,
        severity: meta?.severity,
        terminatesOnFailure: meta?.terminatesOnFailure,
        content: prompt.prompt.value,
        path: filePath,
        order: instructionOrder
      };

      // Get or create stage
      let stage = stageMap.get(stageId);
      if (!stage) {
        stage = {
          id: stageId,
          name: stageName,
          order: stageOrder,
          instructions: []
        };
        stageMap.set(stageId, stage);
      }

      stage.instructions.push(instruction);
    }

    // Convert map to array and sort
    for (const stage of stageMap.values()) {
      // Sort instructions by order
      stage.instructions.sort((a, b) => a.order - b.order);
      stages.push(stage);
    }

    // Sort stages by order
    stages.sort((a, b) => a.order - b.order);

    const totalInstructions = stages.reduce((sum, stage) => sum + stage.instructions.length, 0);

    console.log(`[SKILLS LOADER] Loaded ${totalInstructions} instructions across ${stages.length} stages`);
    return { stages, totalInstructions };

  } catch (error) {
    console.error("[SKILLS LOADER] Error loading skill instructions:", error);
    throw error;
  }
}
