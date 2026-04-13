import { useState } from "react";
import {
  TextInput,
  Select,
  Textarea,
  Stack,
  Button,
  Group,
} from "@mantine/core";
import { CandidateStatus } from "../types/candidate";
import type { CreateCandidateDto } from "../types/candidate";

interface CandidateFormProps {
  initialValues?: Partial<CreateCandidateDto>;
  onSubmit: (values: CreateCandidateDto) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
}

const STATUS_OPTIONS = Object.values(CandidateStatus).map((s) => ({
  value: s,
  label: s,
}));

type FormErrors = Partial<Record<keyof CreateCandidateDto, string>>;

export function CandidateForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting,
}: CandidateFormProps) {
  const [values, setValues] = useState<CreateCandidateDto>({
    name: initialValues?.name ?? "",
    email: initialValues?.email ?? "",
    phone: initialValues?.phone ?? "",
    position: initialValues?.position ?? "",
    status: initialValues?.status ?? CandidateStatus.New,
    notes: initialValues?.notes ?? "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Invalid email address";
    }
    if (!values.phone.trim()) errs.phone = "Phone is required";
    if (!values.position.trim()) errs.position = "Position is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Full name"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          error={errors.name}
        />
        <TextInput
          label="Email"
          placeholder="email@example.com"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          error={errors.email}
        />
        <TextInput
          label="Phone"
          placeholder="+380..."
          required
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          error={errors.phone}
        />
        <TextInput
          label="Position"
          placeholder="e.g. Frontend Developer"
          required
          value={values.position}
          onChange={(e) =>
            setValues((v) => ({ ...v, position: e.target.value }))
          }
          error={errors.position}
        />
        <Select
          label="Status"
          data={STATUS_OPTIONS}
          value={values.status}
          onChange={(val) =>
            setValues((v) => ({
              ...v,
              status: (val as CandidateStatus) ?? CandidateStatus.New,
            }))
          }
        />
        <Textarea
          label="Notes"
          placeholder="Additional notes..."
          rows={3}
          value={values.notes}
          onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
