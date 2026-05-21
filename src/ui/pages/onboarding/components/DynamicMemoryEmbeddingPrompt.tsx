import { describeRequirement } from "../../../modelRequirements";
import { MissingModelRequirementsSheet } from "../../../components/MissingModelRequirementsSheet";

export interface DynamicMemoryEmbeddingPromptProps {
  onDownload: () => void;
  onContinueWithout: () => void;
}

export function DynamicMemoryEmbeddingPrompt({
  onDownload,
  onContinueWithout,
}: DynamicMemoryEmbeddingPromptProps) {
  return (
    <MissingModelRequirementsSheet
      isOpen
      title="Dynamic Memory needs setup"
      description="This data uses Dynamic Memory, which needs a local embedding model before those memory features can run."
      missing={[describeRequirement("embedding")]}
      onClose={onContinueWithout}
      onDownload={onDownload}
      closeLabel="Continue without Dynamic Memory"
      downloadLabel="Download model"
    />
  );
}
