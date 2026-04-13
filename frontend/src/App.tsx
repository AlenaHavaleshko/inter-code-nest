import { useState, useEffect, useCallback } from "react";
import { Container, Title, Button, Group, Alert } from "@mantine/core";
import { CandidateStatus } from "./types/candidate";
import type { Candidate, CreateCandidateDto } from "./types/candidate";
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "./api/candidates";
import { StatusTabs, ALL_TAB } from "./components/StatusTabs";
import { CandidatesTable } from "./components/CandidatesTable";
import { CandidateModals } from "./components/CandidateModals";

export default function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>(ALL_TAB);
  const [createOpen, setCreateOpen] = useState(false);
  const [editCandidate, setEditCandidate] = useState<Candidate | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const status =
        statusFilter === ALL_TAB
          ? undefined
          : (statusFilter as CandidateStatus);
      setCandidates(await getCandidates(status));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  async function handleCreate(dto: CreateCandidateDto) {
    setSubmitting(true);
    try {
      await createCandidate(dto);
      setCreateOpen(false);
      await fetchCandidates();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create candidate");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(dto: CreateCandidateDto) {
    if (!editCandidate) return;
    setSubmitting(true);
    try {
      await updateCandidate(editCandidate.id, dto);
      setEditCandidate(null);
      await fetchCandidates();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update candidate");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await deleteCandidate(deleteId);
      setDeleteId(null);
      await fetchCandidates();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete candidate");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container fluid px="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Candidates</Title>
        <Button onClick={() => setCreateOpen(true)}>+ Add Candidate</Button>
      </Group>

      {error && (
        <Alert
          color="red"
          mb="md"
          title="Error"
          withCloseButton
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <StatusTabs value={statusFilter} onChange={setStatusFilter} />

      <CandidatesTable
        candidates={candidates}
        loading={loading}
        onEdit={setEditCandidate}
        onDelete={setDeleteId}
      />

      <CandidateModals
        createOpen={createOpen}
        editCandidate={editCandidate}
        deleteId={deleteId}
        submitting={submitting}
        onCreateSubmit={handleCreate}
        onCreateClose={() => setCreateOpen(false)}
        onEditSubmit={handleUpdate}
        onEditClose={() => setEditCandidate(null)}
        onDeleteConfirm={handleDelete}
        onDeleteClose={() => setDeleteId(null)}
      />
    </Container>
  );
}
