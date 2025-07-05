"use client";

import { usePathname } from "@/i18n/routing";
import { isActiveLink } from "@/hooks";
import { useDialog } from "@/context";

export const Dialogs = ({ ...props }) => {
  const pathname = usePathname();

  const {
    activeDialog,
    openDialog,
    dialogData: data,
    closeDialog,
    isDialogDismissed,
  } = useDialog();

  const dialogProps = { closeDialog, data, ...props };

  const isActive = isActiveLink(pathname, []);

  const isDismissed = isDialogDismissed("");

  switch (activeDialog) {
    default:
      return null;
  }
};
