import {
  Table,
  Badge,
  Button,
  Group,
  Loader,
  Center,
  Text,
} from "@mantine/core";
import { CandidateStatus } from "../types/candidate";
import type { Candidate } from "../types/candidate";

const STATUS_COLORS: Record<CandidateStatus, string> = {
  [CandidateStatus.New]: "blue",
  [CandidateStatus.Screening]: "yellow",
  [CandidateStatus.Interview]: "violet",
  [CandidateStatus.Offer]: "orange",
  [CandidateStatus.Hired]: "green",
};

const truncate: React.CSSProperties = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const wrap: React.CSSProperties = {
  whiteSpace: "normal",
  wordWrap: "break-word",
};

interface CandidatesTableProps {
  candidates: Candidate[];
  loading: boolean;
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: string) => void;
}

export function CandidatesTable({
  candidates,
  loading,
  onEdit,
  onDelete,
}: CandidatesTableProps) {
  if (loading) {
    return (
      <Center h={200}>
        <Loader />
      </Center>
    );
  }

  if (candidates.length === 0) {
    return (
      <Center h={200}>
        <Text c="dimmed">No candidates found</Text>
      </Center>
    );
  }

  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      style={{ width: "100%" }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: "14%" }}>Name</Table.Th>
          <Table.Th style={{ width: "13%" }}>Email</Table.Th>
          <Table.Th style={{ width: "11%" }}>Phone</Table.Th>
          <Table.Th style={{ width: "13%" }}>Position</Table.Th>
          <Table.Th style={{ width: "14%" }}>Status</Table.Th>
          <Table.Th style={{ width: "17%" }}>Notes</Table.Th>
          <Table.Th style={{ width: "9%" }}>Created</Table.Th>
          <Table.Th style={{ width: "9%" }}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {candidates.map((c) => (
          <Table.Tr key={c.id}>
            <Table.Td>
              <div style={truncate}>{c.name}</div>
            </Table.Td>
            <Table.Td>
              <div style={truncate}>{c.email}</div>
            </Table.Td>
            <Table.Td>{c.phone}</Table.Td>
            <Table.Td>
              <div style={truncate}>{c.position}</div>
            </Table.Td>
            <Table.Td style={{ whiteSpace: "nowrap" }}>
              <Badge
                color={STATUS_COLORS[c.status]}
                style={{ maxWidth: "none" }}
                styles={{
                  label: { overflow: "visible", textOverflow: "clip" },
                }}
              >
                {c.status}
              </Badge>
            </Table.Td>
            <Table.Td>
              <div style={wrap}>{c.notes}</div>
            </Table.Td>
            <Table.Td>{new Date(c.createdAt).toLocaleDateString()}</Table.Td>
            <Table.Td>
              <Group gap={6} wrap="nowrap">
                <Button
                  size="xs"
                  variant="light"
                  color="blue"
                  onClick={() => onEdit(c)}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() => onDelete(c.id)}
                >
                  Delete
                </Button>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
