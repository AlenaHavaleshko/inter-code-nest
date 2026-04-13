import { Tabs } from "@mantine/core";
import { CandidateStatus } from "../types/candidate";

export const ALL_TAB = "all";
const TAB_VALUES = [ALL_TAB, ...Object.values(CandidateStatus)];

interface StatusTabsProps {
  value: string;
  onChange: (value: string) => void;
}

export function StatusTabs({ value, onChange }: StatusTabsProps) {
  return (
    <Tabs value={value} onChange={(val) => onChange(val ?? ALL_TAB)} mb="md">
      <Tabs.List>
        {TAB_VALUES.map((s) => (
          <Tabs.Tab key={s} value={s}>
            {s === ALL_TAB ? "All" : s}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
