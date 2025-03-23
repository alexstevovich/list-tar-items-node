import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs/promises";
import { listTarItems } from "../src/index.js";

const filePaths = [
  "file1.txt",
  "file2.txt",
  "nested/file3.txt",
];

const tarMocks = [
  { label: "plain .tar file", file: "mock.tar" },
  { label: ".tar.gz file", file: "mock.tar.gz" },
  { label: ".tar.br file", file: "mock.tar.br" },
];

describe("listTarItems", () => {
  for (const { label, file } of tarMocks) {
    it(`should list items from a ${label}`, async () => {
      const items = await listTarItems(path.resolve("test/mock", file));
      expect(items).toEqual(expect.arrayContaining(filePaths));
    });
  }

  it("should throw if the file does not exist", async () => {
    await expect(listTarItems("test/mock/does-not-exist.tar")).rejects.toThrow();
  });

  it("should return [] for an empty tar file", async () => {
    const file = path.resolve("test/mock", "empty.tar");
    const items = await listTarItems(file);
  
    // Filter out root folder items like "./"
    const filtered = items.filter(e => e !== "./" && e !== "");
  
    expect(filtered).toEqual([]);
  });

  it("should throw if the file is not a valid tar archive", async () => {
    const file = path.resolve("test/mock", "invalid.txt");
    await expect(listTarItems(file)).rejects.toThrow("Not a valid tar archive");
  });
});
