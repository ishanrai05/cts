export const description = `
Unit tests for parameterization system.
`;

import {
  CaseRecorder,
  TestGroup,
  pcombine,
  poptions,
} from "../framework/index.js";

export const group = new TestGroup();

group.test("test_fail", {}, (log) => {
  log.fail();
});

group.test("test_sync", {}, (log) => {
});

group.test("test_async", {}, async (log) => {
});

group.test("ptest_sync", {
  cases: [{}],
}, (log, p) => {
  log.log(JSON.stringify(p));
});

group.test("ptest_async", {
  cases: [{}],
}, async (log, p) => {
  log.log(JSON.stringify(p));
});

function print(log: CaseRecorder, p: object) {
  log.log(JSON.stringify(p));
}

group.test("literal", {
  cases: [{hello: 1}, {hello: 2}],
}, print);

group.test("list", {
  cases: poptions("hello", [1, 2, 3]),
}, print);

group.test("combine_none", {
  cases: pcombine([]),
}, print);

group.test("combine_unit_unit", {
  cases: pcombine([[{}], [{}]]),
}, print);

group.test("combine_lists", {
  cases: pcombine([ poptions("x", [1, 2]), poptions("y", ["a", "b"]), [{}] ]),
}, print);

group.test("combine_arrays", {
  cases: pcombine([
    [{x: 1, y: 2}, {x: 10, y: 20}],
    [{z: "z"}, {w: "w"}],
  ]),
}, print);

group.test("combine_mixed", {
  cases: pcombine([
    poptions("x", [1, 2]),
    [{z: "z"}, {w: "w"}],
  ]),
}, print);