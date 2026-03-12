"use client";
import * as Tabs from "@radix-ui/react-tabs";

export const TabRoot = Tabs.Root;
export const TabList = ({ children }: { children: React.ReactNode }) => <Tabs.List className="mb-4 flex gap-2">{children}</Tabs.List>;
export const TabTrigger = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <Tabs.Trigger value={value} className="rounded-md border px-3 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white">
    {children}
  </Tabs.Trigger>
);
export const TabContent = Tabs.Content;
