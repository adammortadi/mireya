"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({ 
  formAction, 
  itemType = "item" 
}: { 
  formAction: string | ((formData: FormData) => void | Promise<void>);
  itemType?: string;
}) {
  return (
    <button 
      type="submit" 
      formAction={formAction}
      onClick={(e) => {
        if (!confirm(`Are you sure you want to delete this ${itemType}? This action cannot be undone.`)) {
          e.preventDefault();
        }
      }}
      className="rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100 flex-shrink-0" 
      title={`Delete ${itemType}`}
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}
