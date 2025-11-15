import type { SkillStage } from "../skills-loader";

interface StageSidebarProps {
  stages: SkillStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
}

export function StageSidebar({ stages, activeStageId, onStageSelect }: StageSidebarProps) {
  return (
    <aside
      className="w-72 min-h-screen sticky top-0 overflow-y-auto"
      style={{
        background: "var(--color-steel-dark)",
        color: "white",
        padding: "var(--spacing-2xl) var(--spacing-xl)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "var(--spacing-2xl)" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "var(--spacing-sm)",
            color: "white",
          }}
        >
          Testing Stages
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-sky-pale)",
            lineHeight: "1.6",
          }}
        >
          Select a stage to view instructions
        </p>
      </div>

      {/* Stage List */}
      <nav>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
          {stages.map((stage) => {
            const isActive = activeStageId === stage.id;
            return (
              <li key={stage.id}>
                <button
                  onClick={() => onStageSelect(stage.id)}
                  className="w-full text-left rounded"
                  style={{
                    background: isActive ? "rgba(255, 214, 10, 0.15)" : "transparent",
                    borderLeft: isActive ? "4px solid var(--color-canary-yellow)" : "4px solid transparent",
                    padding: "var(--spacing-md)",
                    transition: "all var(--transition-base)",
                    cursor: "pointer",
                    border: "none",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <div className="flex items-center gap-md" style={{ marginBottom: "var(--spacing-xs)" }}>
                    <span
                      className={`badge ${isActive ? "badge-yellow" : "badge-neutral"}`}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
                    >
                      {stage.order}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {stage.name}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-sky-pale)",
                      paddingLeft: "calc(var(--spacing-lg) + var(--spacing-sm))",
                    }}
                  >
                    {stage.instructions.length} instruction{stage.instructions.length !== 1 ? "s" : ""}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Stats Footer */}
      <div
        style={{
          marginTop: "var(--spacing-2xl)",
          paddingTop: "var(--spacing-xl)",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div style={{ fontSize: "0.875rem", color: "var(--color-sky-pale)" }}>
          <div className="flex-between" style={{ marginBottom: "var(--spacing-sm)" }}>
            <span>Total Stages:</span>
            <span className="badge badge-yellow" style={{ fontFamily: "var(--font-mono)" }}>
              {stages.length}
            </span>
          </div>
          <div className="flex-between">
            <span>Total Instructions:</span>
            <span className="badge badge-yellow" style={{ fontFamily: "var(--font-mono)" }}>
              {stages.reduce((sum, stage) => sum + stage.instructions.length, 0)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
