## 2024-05-22 - Hoisting JSON.stringify in loops
**Learning:** Hoisting invariant `JSON.stringify` calls out of loops can significantly reduce execution time, especially in high-iteration hot paths like test generation. In this case, it reduced the benchmark time by over 50%.
**Action:** Always check for redundant object serialization inside loops and hoist them.
