import { MissingModelRequirementsSheet } from "./MissingModelRequirementsSheet";
import type { ModelRequirement } from "../modelRequirements";

interface MissingCompanionModelsSheetProps {
  isOpen: boolean;
  missing: ModelRequirement[];
  onClose: () => void;
  onDownload: () => void;
}

export function MissingCompanionModelsSheet({
  isOpen,
  missing,
  onClose,
  onDownload,
}: MissingCompanionModelsSheetProps) {
  const count = missing.length;
  const subtitle =
    count === 1
      ? "Companion mode needs one more model before it can run. Skipping will switch this character back to Roleplay."
      : `Companion mode needs ${count} more models before it can run. Skipping will switch this character back to Roleplay.`;

  return (
    <MissingModelRequirementsSheet
      isOpen={isOpen}
      title="Companion needs setup"
      description={`Companion mode needs some local models to analyze emotion, extract entities, route memories, and recall past context. ${subtitle}`}
      missing={missing}
      onClose={onClose}
      onDownload={onDownload}
      closeLabel="Use Roleplay instead"
    />
  );
}
