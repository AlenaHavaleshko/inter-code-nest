import { Modal, Text, Button, Group } from "@mantine/core";
import type { Candidate, CreateCandidateDto } from "../types/candidate";
import { CandidateForm } from "./CandidateForm";

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
      <Modal
        opened={createOpen}
        onClose={onCreateClose}
        title="Add Candidate"
        size="md"
      >
        <CandidateForm
          onSubmit={onCreateSubmit}
          onCancel={onCreateClose}
          submitting={submitting}
        />
      </Modal>

      <Modal
        opened={!!editCandidate}
        onClose={onEditClose}
        title="Edit Candidate"
        size="md"
      >
        {editCandidate && (
          <CandidateForm
            initialValues={editCandidate}
            onSubmit={onEditSubmit}
            onCancel={onEditClose}
            submitting={submitting}
          />
        )}
      </Modal>

      <Modal
        opened={!!deleteId}
        onClose={onDeleteClose}
        title="Confirm Delete"
        size="sm"
      >
        <Text mb="lg">Are you sure you want to delete this candidate?</Text>
        <Group justify="flex-end">
          <Button
            variant="subtle"
            onClick={onDeleteClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button color="red" loading={submitting} onClick={onDeleteConfirm}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}
