import { describe, expect, it } from "vitest";
import {
  displayNameFromPathname,
  isImagePathname,
  uniqueMediaPathname,
} from "@/src/utils/media";

describe("displayNameFromPathname", () => {
  it("strips the directory and extension", () => {
    expect(displayNameFromPathname("media/hero-banner.png")).toBe(
      "hero-banner",
    );
  });

  it("handles nested paths and uppercase extensions", () => {
    expect(displayNameFromPathname("some/dir/Team Photo.JPEG")).toBe(
      "Team Photo",
    );
  });

  it("returns the basename unchanged when there is no extension", () => {
    expect(displayNameFromPathname("noext")).toBe("noext");
  });
});

describe("isImagePathname", () => {
  it("accepts common image extensions regardless of case", () => {
    for (const p of [
      "media/a.png",
      "b.jpg",
      "c.JPEG",
      "d.webp",
      "e.gif",
      "f.svg",
      "g.avif",
    ]) {
      expect(isImagePathname(p), p).toBe(true);
    }
  });

  it("rejects non-image files", () => {
    for (const p of ["doc.pdf", "notes.txt", "archive.zip", "noext"]) {
      expect(isImagePathname(p), p).toBe(false);
    }
  });
});

describe("uniqueMediaPathname", () => {
  it("slugifies the filename under media/ and keeps the extension", () => {
    expect(uniqueMediaPathname("My Hero Banner!.PNG")).toMatch(
      /^media\/my-hero-banner-[a-f0-9]{6}\.png$/,
    );
  });

  it("produces different pathnames for the same filename", () => {
    expect(uniqueMediaPathname("a.png")).not.toBe(uniqueMediaPathname("a.png"));
  });

  it("falls back to a generic slug for names with no usable characters", () => {
    expect(uniqueMediaPathname("!!!.png")).toMatch(
      /^media\/image-[a-f0-9]{6}\.png$/,
    );
  });
});
