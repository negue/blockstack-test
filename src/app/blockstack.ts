// polyfills
declare function require(file: string);

(window as any).global = window;
(window as any).process = {
  version: ''
};

export default {
  init: async () => {
    if (!global.Buffer) {
      global.Buffer = await import ('buffer').then(i => i.Buffer);
    }

    const blockstack = require('blockstack');

    return blockstack;
  }
};

