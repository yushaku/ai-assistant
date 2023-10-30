[ +
      " import crypto from 'node:crypto';\n" +
      "-import {Buffer} from 'node:buffer';\n" +
      "+import {isUint8Array} from 'uint8array-extras';\n" +
      '\n' +
      ' export default function hash(data) {\n' +
      "-\tif (!(typeof data === 'string' || Buffer.isBuffer(data))) {\n" +
      "+\tif (!(typeof data === 'string' || isUint8Array(data))) {\n" +
      " \t\tthrow new TypeError('Incorrect type.');\n" +
      ' \t}\n' +
      '\n' +
      " \treturn crypto.createHash('md5').update(data).digest('hex');\n" +
      ' }\n' +
      'Most Node.js APIs accept Uint8Array too, so no extra work was required. Ideally, this code should also transition to Web Crypto, but that’s not relevant to this example.\n' +
      'TypeScript\n' +
      "-import {Buffer} from 'node:buffer';\n" +
      '\n' +
      '-export function getSize(input: string | Buffer): number { … }\n' +
      '+export function getSize(input: string | Uint8Array): number { … }\n' +
      'Enforcement\n' +
      'I recommend enforcing Uint8Array over Buffer with linting.\n' +
      'Add this to your ESLint config:\n' +
      '{\n' +
      "\t'no-restricted-globals': [\n" +
      "\t\t'error',\n" +
      '\t\t{\n' +
      "\t\t\tname: 'Buffer',\n" +
      "\t\t\tmessage: 'Use Uint8Array instead.'\n" +
      '\t\t}\n' +
      '\t],\n' +
      "\t'no-restricted-imports': [\n" +
      "\t\t'error',\n" +
      '\t\t{\n' +
      "\t\t\tname: 'buffer',\n" +
      "\t\t\tmessage: 'Use Uint8Array instead.'\n" +
      '\t\t},\n' +
      '\t\t{\n' +
      "\t\t\tname: 'node:buffer',\n" +
      "\t\t\tmessage: 'Use Uint8Array instead.'\n" +
      '\t\t}\n' +
      '\t]\n' +
      '}\n' +
      'And if you use TypeScript, add this:\n' +
      '{\n' +
      "\t'@typescript-eslint/ban-types': [\n" +
      "\t\t'error',\n" +
      '\t\t{\n' +
      '\t\t\ttypes: {\n' +
      '\t\t\t\tBuffer: {\n' +
      "\t\t\t\t\tmessage: 'Use Uint8Array instead.',\n" +
      '\t\t\t\t\tsuggest: [\n' +
      "\t\t\t\t\t\t'Uint8Array'\n" +
      '\t\t\t\t\t]\n' +
      '\t\t\t\t}\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      '\t]\n' +
      '}\n' +
      'If you use XO, it will soon come with this config by default.\n' +
      'How Can I Help?\n' +
      'Voice your support for Node.js using Uint8Array for new APIs.\n' +
      'Help me move my packages to Uint8Array. Pick one and give it a go.\n' +
      'Help us make a lint rule to prevent the use of Buffer methods.\n' +
      'Future\n' +
      'Uint8Array (or rather TypedArray) need more utility methods!\n' +
      'For example, there is currently no good built-in way to convert a Uint8Array to Base64 or Hex. Although, it looks like this is most likely coming.\n' +
      'Consider proposing missing bits to TC39.\n' +
      'The End\n' +
      'Let’s make the JavaScript package ecosystem more cross-platform. Thanks for reading.\n' +
      'Discuss',
    metadata: {
      source: 'https://sindresorhus.com/blog/goodbye-nodejs-buffer?ref=dailydev'
    }
  }
]

  Document {
    pageContent: 'October 24, 2023 — 4 min read\n' +
      "Goodbye, Node.js BufferIt's time to move from Buffer to Uint8Array.The Buffer type has been the cornerstone for binary data handling in Node.js since the beginning. However, these days we have Uint8Array, which is a native JavaScript type and works cross-platform. While Buffer is an instance of Uint8Array, it introduces numerous methods that are not available in other JavaScript environments. Consequently, code leveraging Buffer-specific methods needs polyfilling, preventing many valuable packages from being browser-compatible.\n" +
      'Buffer also comes with additional caveats. For instance, Buffer#slice() creates a mutable segment linked to the original Buffer, while Uint8Array#slice() creates an immutable copy, resulting in possible unpredictable behavior. The problem is not the behavior of the Buffer#slice() method, but the fact that Buffer is a subclass of Uint8Array and completely changes the behavior of an inherited method. Instead of Buffer#slice(), use Uint8Array#subarray() or Buffer#subarray(). Furthermore, buffers expose private information through global variables, a potential security risk.\n' +
      'It is time to move on.\n' +
      'The Plan\n' +
      'I intend to move all my packages from using Buffer to Uint8Array. If you are a maintainer of a JavaScript package, I encourage you to do the same.\n' +
      'Buffer will never be removed, and probably never even deprecated, but at least the community can slowly move away from it. My hope is that the Node.js team will at least start discouraging the use of Buffer.\n' +
      'How\n' +
      'First, familiarize yourself with the subtle incompatibilities between Uint8Array and Buffer.\n' +
      'I have made the uint8array-extras package to make the transition easier. Pull requests are welcome for additional utilities.\n' +
      'If your code accepts a Buffer and doesn’t use any Buffer-specific methods, you can simply update your docs and types to Uint8Array. Changing the input type from Buffer to Uint8Array is a non-breaking change since Buffer is an instance of Uint8Array.\n' +
      'Changing the return type from Buffer to Uint8Array is a breaking change, because consumers may use Buffer-specific methods.\n' +
      'If you absolutely need to convert a Uint8Array to a Buffer, you can use Buffer.from(uint8Array) (copies the data) or Buffer.from(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength) (does not copy). However, there is usually a better way.\n' +
      'The primary transition steps are:\n' +
      '\n' +
      "Remove all import {Buffer} from 'node:buffer' imports.\n" +
      'Remove all occurrences of the Buffer global.\n' +
      'Stop using Buffer-specific methods.\n' +
      'Replace Buffer reading/writing methods, like Buffer#readInt32BE(), with DataView.\n' +
      '\n' +
      'Questions\n' +
      'Why did Buffer exist in the first place?\n' +
      'Buffer was created long before Uint8Array existed.\n' +
      'How can I convert to and from Base64 with Uint8Array?\n' +
      'You can use my uint8array-extras package for now. It will most likely eventually be supported natively in JavaScript.\n' +
      'How do I handle Node.js APIs that return a Buffer, like the fs methods?\n' +
      'Since Buffer is a subclass of Uint8Array, you can just treat it like a Uint8Array. Just make sure you don’t use .slice() (which differs in behavior) or any Buffer-specific methods.\n' +
      'Examples\n' +
      'JavaScript\n' +
      "+import {stringToBase64} from 'uint8array-extras';\n" +
      '\n' +
      "-Buffer.from(string).toString('base64');\n" +
      '+stringToBase64(string);\n' +
      "+import {uint8ArrayToHex} from 'uint8array-extras';\n" +
      '\n' +
      "-buffer.toString('hex');\n" +
      '+uint8ArrayToHex(uint8Array);\n' +
      ' const bytes = getBytes();\n' +
      '\n' +
      '+const view = new DataView(bytes.buffer);\n' +
      '\n' +
      '-const value = bytes.readInt32BE(1);\n' +
      '+const value = view.getInt32(1);\n'
