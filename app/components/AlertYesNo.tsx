import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

interface Props {
  isAlertOpen: boolean;
  setIsAlertOpen: (isAlertOpen: boolean) => void;
  confirm: () => void;
}

const AlertYesNo = (props: Props) => {
  return (
    <>
      <AlertDialog open={props.isAlertOpen} onOpenChange={props.setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Generation</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace your current slides. Are you sure you want to
              continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={props.confirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertYesNo;
