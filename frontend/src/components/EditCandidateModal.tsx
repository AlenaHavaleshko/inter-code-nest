import { Modal } from "@mantine/core";
import type { Candidate, CreateCandidateDto } from "../types/candidate";
import { CandidateForm } from "./CandidateForm";

interface EditCandidateModalProps {
  candidate: Candidate | null;
  submitting: boolean;
  onSubmit: (dto: CreateCandidateDto) => Promise<void>;
  onClose: () => void;
}

export function EditCandidateModal({
  candidate,
  submitting,
  onSubmit,
  onClose,
}: EditCandidateModalProps) {
  return (
    <Modal
      opened={!!candidate}
      onClose={onClose}
      title="Edit Candidate"
      size="md"
      styles={{ inner: { overflowY: 'hidden' }, content: { overflowY: 'hidden' }, body: { overflowY: 'hidden' } }}
      >
      {candidate && (
        <CandidateForm
          initialValues={candidate}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitting={submitting}
        />
      )}
    </Modal>
  );
}
