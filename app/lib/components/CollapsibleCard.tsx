import type { SkillInstruction } from "../skills-loader";

interface CollapsibleCardProps {
  instruction: SkillInstruction;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CollapsibleCard({ instruction, isExpanded, onToggle }: CollapsibleCardProps) {
  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "badge-danger";
      case "HIGH":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="card">
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between text-left"
        aria-expanded={isExpanded}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-md mb-sm flex-wrap">
            <h3 className="card-title" style={{ margin: 0, fontSize: "1.125rem" }}>
              {instruction.title}
            </h3>
            <span className="badge badge-neutral text-mono">
              v{instruction.version}
            </span>
            {instruction.severity && (
              <span className={`badge ${getSeverityBadgeClass(instruction.severity)}`}>
                {instruction.severity}
              </span>
            )}
          </div>
          <p className="text-small" style={{ color: "var(--text-secondary)", marginBottom: "var(--spacing-sm)" }}>
            {instruction.description}
          </p>
          {instruction.taskId && (
            <p className="text-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: 0 }}>
              ID: {instruction.taskId}
            </p>
          )}
        </div>

        {/* Expand/Collapse Icon */}
        <div style={{ marginLeft: "var(--spacing-lg)", flexShrink: 0 }}>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            style={{ color: "var(--text-secondary)", transition: "transform var(--transition-base)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div
          style={{
            marginTop: "var(--spacing-lg)",
            paddingTop: "var(--spacing-lg)",
            borderTop: "1px solid var(--border-color)",
            background: "var(--bg-tertiary)",
            margin: "var(--spacing-lg) calc(-1 * var(--spacing-xl))",
            padding: "var(--spacing-xl)",
          }}
        >
          <pre
            className="text-mono"
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "0.875rem",
              lineHeight: "1.7",
              padding: "var(--spacing-lg)",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              margin: 0,
              fontFamily: "var(--font-body)",
            }}
          >
            {instruction.content}
          </pre>
        </div>
      )}
    </div>
  );
}
