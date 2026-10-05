"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteSessionMutation } from "@/store/api/AIApi";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import icon from "../../public/images/logout-icon.png";
import ButtonWithLoading from "./common/custom/ButtonWithLoading";

interface DeleteDialogProps {
  sessionId: string;
}
const DeleteDialog: React.FC<DeleteDialogProps> = ({ sessionId }) => {
  const [open, setOpen] = useState(false);

  const [deleteSession, { isLoading }] = useDeleteSessionMutation();
  const handleDelete = async () => {
    await deleteSession(sessionId);
    setOpen(false);
  };

  const handleCancel = async () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[450px] rounded-2xl p-6 shadow-lg border border-gray-700 
        
          bg-[#1A1D21] text-gray-100"
        >
          <DialogTitle className="text-lg font-semibold mb-4">
            Delete chat?
          </DialogTitle>

          {/* Info Box */}
          <div
            className="p-3 mb-4 flex items-center gap-3 rounded-xl text-sm 
            
            bg-[#212B36] text-gray-300"
          >
            <Image src={icon} alt="warning" width={22} height={22} />
            <span>
              This chat will be permanently deleted. Do you still want to
              proceed?
            </span>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border 
              bg-gray-200 text-gray-800 hover:bg-gray-300
              dark:bg-[#161C24] dark:text-gray-200 dark:border-gray-600 dark:hover:bg-[#1f2730] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <ButtonWithLoading title="Delete..." /> : "Delete"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 
        dark:text-red-500 dark:hover:text-red-400 cursor-pointer"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </div>
  );
};

export default DeleteDialog;
