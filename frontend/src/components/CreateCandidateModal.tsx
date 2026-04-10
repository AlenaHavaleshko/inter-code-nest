import { Modal } from "@mantine/core";
import type { CreateCandidateDto } from "../types/candidate";
import { CandidateForm } from "./CandidateForm";

interface CreateCandidateModalProps {
  opened: boolean;
  submitting: boolean;
  onSubmit: (dto: CreateCandidateDto) => Promise<void>;
  onClose: () => void;
}

export function CreateCandidateModal({
  opened,
  submitting,
  onSubmit,
  onClose,
}: CreateCandidateModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add Candidate"
      size="md"
      styles={{
        inner: { overflowY: "hidden" },
        content: { overflowY: "hidden" },
        body: { overflowY: "hidden" },
      }}
    >
      <CandidateForm
        onSubmit={onSubmit}
        onCancel={onClose}
        submitting={submitting}
      />
    </Modal>
  );
}
