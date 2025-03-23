/*˹*******************************************************
 * list-tar-items
 * 
 * @license
 * 
 * Apache-2.0
 * 
 * Copyright 2016-2025 Alex Stevovich
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 
 * @meta
 *
 * package_name: list-tar-items
 * package_purpose: List items in a .tar, .tar.gz, or .tar.br archive.
 * file_name: index.js
 * file_purpose: Core functionality and exports.
 *  
 * @system
 *
 * generated_on: 2025-03-23T04:27:14.451Z
 * file_uuid: 6b6d03f9-ffdc-4401-b175-dd3e294d0bbf
 * file_size: 2979 bytes
 * file_hash: 2ed5e9e857ccdba9fe8f0ab07d3e742597b8efb802daba60db404d23acc8c6e4
 * mast_hash: d643d9d26b8c8c5250ce51df3fb6019a22af7dbaa1de8c5869865b95a0ac48c7
 * generated_by: shipmast
 *
*******************************************************˼*/

import fs from "fs";
import zlib from "zlib";
import * as tar from "tar";

/**
 * Lists file and folder items from a `.tar`, `.tar.gz`, or `.tar.br` archive.
 *
 * Automatically handles decompression based on file extension. Resolves to an
 * array of file paths within the archive. If the archive is invalid or contains
 * no items, the promise will reject with an appropriate error.
 *
 * @function
 * @param {string} path - Absolute or relative path to the tar archive.
 * @returns {Promise<string[]>} A promise that resolves with a list of entry paths.
 *
 * @throws {Error} If the file is unreadable, malformed, or contains no items.
 *
 * @example
 * const items = await listTarItems('./archive.tar.gz');
 * console.log(items); // ['file1.txt', 'folder/file2.txt']
 */
export async function listTarItems(path) {
  const ext = path.endsWith(".gz") ? "gz" : path.endsWith(".br") ? "br" : null;

  const items = [];
  let gotTarHeader = false;

  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(path).on("error", reject);

    if (ext === "gz") {
      stream = stream.pipe(zlib.createGunzip()).on("error", reject);
    } else if (ext === "br") {
      stream = stream.pipe(zlib.createBrotliDecompress()).on("error", reject);
    }

    const tarStream = tar.t({
      onentry(entry) {
        gotTarHeader = true;
        items.push(entry.path);
      },
    });

    tarStream.on("end", () => {
      if (!gotTarHeader && items.length === 0) {
        reject(new Error("Not a valid tar archive"));
      } else {
        resolve(items);
      }
    });

    tarStream.on("error", reject);

    stream.pipe(tarStream);
  });
}

export default listTarItems;
