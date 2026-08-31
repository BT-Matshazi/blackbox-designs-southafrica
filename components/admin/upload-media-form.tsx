"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, LoaderCircle, Upload } from "lucide-react";
import { uploadMedia } from "@/app/actions/media";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function UploadMediaForm() {
  const [state, action, pending] = useActionState(uploadMedia, null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (state?.ok === true) {
      toast.success("Image uploaded");
      formRef.current?.reset();
      setFileName(null);
    }
    if (state?.ok === false) {
      toast.error(state.error);
      formRef.current?.reset();
      setFileName(null);
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} aria-busy={pending}>
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept="image/*"
        className="hidden"
        disabled={pending}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          setFileName(file?.name ?? null);
          if (file) formRef.current?.requestSubmit();
        }}
      />
      <div className="flex flex-col gap-4">
        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="group flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-background p-6 text-center transition-colors hover:bg-muted/45 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
            {pending ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <ImagePlus className="size-5" />
            )}
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              {pending ? "Uploading image" : "Choose an image"}
            </span>
            <span className="text-xs text-muted-foreground">
              {fileName ?? "The upload starts as soon as a file is selected."}
            </span>
          </span>
        </button>

        {pending && <Progress value={68} aria-label="Uploading image" />}

        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="w-fit"
        >
          {pending ? (
            <LoaderCircle data-icon="inline-start" className="animate-spin" />
          ) : (
            <Upload data-icon="inline-start" />
          )}
          {pending ? "Uploading..." : "Upload image"}
        </Button>
      </div>
    </form>
  );
}
