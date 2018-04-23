// @flow
/* eslint no-unused-vars:0 */
declare var process: Object;

declare var jest: any;

// tests
declare var describe: (name: string, callback: () => void) => void;
declare var it: (name: string, callback: (done: () => void) => void | Promise<void>) => void;
declare var test: it;
declare var expect: any;
declare var jasmine: any;
declare function beforeAll(fn: Function): void
declare function beforeEach(fn: Function): void
declare function afterAll(fn: Function): void
declare function afterEach(fn: Function): void
