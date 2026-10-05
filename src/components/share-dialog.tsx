"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Share2 } from "lucide-react"
import icon from "../../public/images/logout-icon.png"
import Image from "next/image"

const ShareDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[650px] rounded-2xl p-6 shadow-lg 
          bg-white text-gray-900 
          dark:bg-[#1A1D21] dark:text-gray-100">
          
          <h2 className="text-lg font-semibold mb-4">
            Share chat link to others:
          </h2>

          {/* Info Box */}
          <div className="p-3 mb-4 flex items-center gap-2 rounded-xl text-sm 
            bg-gray-100 text-gray-700 
            dark:bg-[#212B36] dark:text-gray-300">
            <Image src={icon} alt="logout" width={20} height={20} />
            <span>You will be log out from the site.</span>
          </div>

          {/* Input + Copy Button */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 border rounded-md px-3 py-2 
              bg-gray-50 text-gray-800 
              dark:bg-[#161C24] dark:text-gray-200 dark:border-gray-700"
              value="https://yourlink.com/share/..."
              readOnly
            />
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-2"
              onClick={() => navigator.clipboard.writeText("https://yourlink.com/share/...")}
            >
              Copy Link
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dropdown Item */}
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 
        dark:text-green-400 dark:hover:text-green-500"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share           
      </DropdownMenuItem>
    </div>
  )
}

export default ShareDialog
