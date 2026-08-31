"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { uploadMedia } from "@/app/actions/media";

export function UploadMediaForm() {
  const [state, action, pending] = useActionState(uploadMedia, null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok === true) toast.success("Image uploaded");
    if (state?.ok === false) toast.error(state.error);
  }, [state]);

  return (
    <form ref={formRef} action={action}>
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept="image/*"
        className="hidden"
        onChange={() => formRef.current?.requestSubmit()}
      />
      <button
        type="button"
        disabled={pending}
        onClick={() => inputRef.current?.click()}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Upload className="size-4" />
        {pending ? "Uploading…" : "Upload image"}
      </button>
    </form>
  );
}
