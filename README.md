

# list-tar-items

> **archetype:**  Node.js package
>  [https://github.com/alexstevovich/list-tar-items-node](https://github.com/alexstevovich/list-tar-items-node)

**list-tar-items** lists items in a `.tar`, `.tar.gz`, or `.tar.br` archive.


## Details

- Lists all file and folder paths inside an archive
- Supports `.tar`, `.tar.gz`, and `.tar.br` formats
- Stream-based, memory-efficient
- Returns [] for empty archives, errors on non tar files.

## Installation


```sh
npm install list-tar-items
```


## Usage

```js
import listTarItems from "list-tar-items";

const items = await listTarItems("./my-archive.tar.gz");
console.log(items);
// Output:
// [ 'file1.txt', 'dir/file2.txt', 'nested/file3.txt' ]
```


## API 

### listTarItems(path: string): Promise<string[]>

List file and folder paths inside a `.tar`, `.tar.gz`, or `.tar.br` file.

#### Parameters

| Name   | Type     | Description                          |
|--------|----------|--------------------------------------|
| `path` | `string` | Path to the tar archive on disk      |

#### Returns

A `Promise<string[]>` that resolves to an array of file and folder paths inside the archive.

#### Throws

- If the file does not exist  
- If the file is not a valid tar archive  


## **Links**
- **Development**: [https://github.com/alexstevovich/list-tar-items-node](https://github.com/alexstevovich/list-tar-items-node)
- **NPM Package**: [https://www.npmjs.com/package/list-tar-items](https://www.npmjs.com/package/list-tar-items)

## License

Licensed under the Apache License 2.0.


