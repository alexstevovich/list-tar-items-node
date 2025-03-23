/**
 * list-tar-items
 *
 * Lists file and folder items from a `.tar`, `.tar.gz`, or `.tar.br` archive.
 */

declare module "list-tar-items" {
    /**
     * List file and folder paths inside a tar archive.
     *
     * @param path - Absolute or relative path to the `.tar`, `.tar.gz`, or `.tar.br` file.
     * @returns Promise resolving to a list of entry paths.
     * @throws If the file is invalid, unreadable, or contains no items.
     */
    export function listTarItems(path: string): Promise<string[]>;
  
    export default listTarItems;
  }
  