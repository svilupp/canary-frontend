import { useState } from "react";
import type { Route } from "./+types/skills";
import { loadSkillInstructions } from "../lib/skills-loader";
import { PageLayout } from "../lib/components/PageLayout";
import { StageSidebar } from "../lib/components/StageSidebar";
import { CollapsibleCard } from "../lib/components/CollapsibleCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QA Testing Instructions - Canary" },
    { name: "description", content: "Comprehensive QA testing instructions loaded from textprompts" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const startTime = Date.now();
  console.log("[SKILLS LOADER] Loading skill instructions with textprompts");

  try {
    const skillsData = await loadSkillInstructions();

    const duration = Date.now() - startTime;
    console.log(`[SKILLS LOADER] Loaded ${skillsData.totalInstructions} instructions | ${duration}ms`, {
      stages: skillsData.stages.length,
      totalInstructions: skillsData.totalInstructions,
    });

    return skillsData;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[SKILLS LOADER] Failed to load skills | ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

export default function Skills({ loaderData }: Route.ComponentProps) {
  const { stages, totalInstructions } = loaderData;

  // Initialize with the first stage if available
  const [activeStageId, setActiveStageId] = useState<string | null>(
    stages.length > 0 ? stages[0].id : null
  );

  // Track expanded state for all cards
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [allExpanded, setAllExpanded] = useState(false);

  // Get the active stage
  const activeStage = stages.find(stage => stage.id === activeStageId);

  // Toggle individual card
  const toggleCard = (instructionId: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(instructionId)) {
        next.delete(instructionId);
      } else {
        next.add(instructionId);
      }
      return next;
    });
  };

  // Expand/collapse all cards
  const toggleAllCards = () => {
    if (allExpanded) {
      setExpandedCards(new Set());
      setAllExpanded(false);
    } else {
      const allIds = new Set(activeStage?.instructions.map(i => i.id) || []);
      setExpandedCards(allIds);
      setAllExpanded(true);
    }
  };

  // When stage changes, reset expanded state
  const handleStageSelect = (stageId: string) => {
    setActiveStageId(stageId);
    setExpandedCards(new Set());
    setAllExpanded(false);
  };

  return (
    <PageLayout>
      <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
        {/* Left Sidebar */}
        <StageSidebar
          stages={stages}
          activeStageId={activeStageId}
          onStageSelect={handleStageSelect}
        />

        {/* Main Content */}
        <main className="flex-1" style={{ padding: "var(--spacing-3xl) var(--spacing-2xl)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <header style={{ marginBottom: "var(--spacing-3xl)" }}>
              <h1 style={{ marginBottom: "var(--spacing-lg)" }}>
                QA Testing Instructions
              </h1>
              <p className="text-large" style={{ color: "var(--text-secondary)", marginBottom: "var(--spacing-xl)" }}>
                Comprehensive testing instructions powered by{" "}
                <span className="text-mono" style={{ fontWeight: "600", color: "var(--text-primary)" }}>
                  textprompts
                </span>
                . Each instruction file includes strict metadata validation.
              </p>
              <div className="flex gap-md flex-wrap">
                <span className="badge badge-yellow">
                  {stages.length} Stages
                </span>
                <span className="badge badge-neutral">
                  {totalInstructions} Instructions
                </span>
                <span className="badge badge-success">
                  STRICT Metadata
                </span>
              </div>
            </header>

            {/* Active Stage Content */}
            {activeStage ? (
              <>
                <div className="flex-between" style={{ marginBottom: "var(--spacing-2xl)" }}>
                  <div>
                    <h2 style={{ marginBottom: "var(--spacing-xs)" }}>
                      Stage {activeStage.order}: {activeStage.name}
                    </h2>
                    <p className="text-small" style={{ color: "var(--text-tertiary)", marginBottom: 0 }}>
                      {activeStage.instructions.length} instruction
                      {activeStage.instructions.length !== 1 ? "s" : ""} in this stage
                    </p>
                  </div>
                  <button
                    onClick={toggleAllCards}
                    className="btn btn-outline"
                  >
                    {allExpanded ? "Collapse All" : "Expand All"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
                  {activeStage.instructions.map((instruction) => (
                    <CollapsibleCard
                      key={instruction.id}
                      instruction={instruction}
                      isExpanded={expandedCards.has(instruction.id)}
                      onToggle={() => toggleCard(instruction.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center" style={{ padding: "var(--spacing-3xl) 0" }}>
                <p className="text-large" style={{ color: "var(--text-tertiary)" }}>
                  No stages found. Please check the skills directory.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
