import {
    Dialog,
    DialogPanel
} from "@headlessui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  content: ReactNode;
};

export const Modal = ({ isOpen, setIsOpen, content }: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/50">
        <DialogPanel className="w-full space-y-4 rounded-lg flex items-center justify-center max-h-[90%]">
          {content}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
