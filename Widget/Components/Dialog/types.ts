import { ReactNode } from "react";

export type DialogPropTypes = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};
