"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const Modal = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;

export function ModalContent({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/30" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        {children}
        <Dialog.Close className="absolute right-4 top-4"><X size={16} /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
