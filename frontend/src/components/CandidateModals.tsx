import type { Candidate, CreateCandidateDto } from "../types/candidate";
import { CreateCandidateModal } from "./CreateCandidateModal";
import { EditCandidateModal } from "./EditCandidateModal";
import { DeleteCandidateModal } from "./DeleteCandidateModal";

interface CandidateModalsProps {
  createOpen: boolean;
  editCandidate: Candidate | null;
  deleteId: string | null;
  submitting: boolean;
  onCreateSubmit: (dto: CreateCandidateDto) => Promise<void>;
  onCreateClose: () => void;
  onEditSubmit: (dto: CreateCandidateDto) => Promise<void>;
  onEditClose: () => void;
  onDeleteConfirm: () => Promise<void>;
  onDeleteClose: () => void;
}

export function CandidateModals({
  createOpen,
  editCandidate,
  deleteId,
  submitting,
  onCreateSubmit,
  onCreateClose,
  onEditSubmit,
  onEditClose,
  onDeleteConfirm,
  onDeleteClose,
}: CandidateModalsProps) {
  return (
    <>
      <CreateCandidateModal
        opened={createOpen}
        submitting={submitting}
        onSubmit={onCreateSubmit}
        onClose={onCreateClose}
      />

      <EditCandidateModal
        candidate={editCandidate}
        submitting={submitting}
        onSubmit={onEditSubmit}
        onClose={onEditClose}
      />

      <DeleteCandidateModal
        opened={!!deleteId}
        submitting={submitting}
        onConfirm={onDeleteConfirm}
        onClose={onDeleteClose}
      />
    </>
  );
}
