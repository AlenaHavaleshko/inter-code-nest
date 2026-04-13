import { Modal, Text, Button, Group } from "@mantine/core";

interface DeleteCandidateModalProps {
  opened: boolean;
  submitting: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export function DeleteCandidateModal({
  opened,
  submitting,
  onConfirm,
  onClose,
}: DeleteCandidateModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Confirm Delete"
      size="sm"
      styles={{
        inner: { overflowY: "hidden" },
        content: { overflowY: "hidden" },
        body: { overflowY: "hidden" },
      }}
    >
      <Text mb="lg">Are you sure you want to delete this candidate?</Text>
      <Group justify="flex-end">
        <Button variant="subtle" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button color="red" loading={submitting} onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}
