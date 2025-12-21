import type {TestCase} from './tests/types.ts';
import {generateContentTests} from './tests/content-tests.ts';
import {generateSecurityTests} from './tests/security-tests.ts';
import {generateEdgeCaseTests} from './tests/edge-cases.ts';

function generateAllTests(): TestCase[] {
    const contentTests = generateContentTests();
    const securityTests = generateSecurityTests();
    const edgeCaseTests = generateEdgeCaseTests();

    const allTests = [
        ...contentTests,
        ...securityTests,
        ...edgeCaseTests,
    ];

    console.log(`Generated ${allTests.length} total test cases:`);
    console.log(`  - Content tests: ${contentTests.length}`);
    console.log(`  - Security tests: ${securityTests.length}`);
    console.log(`  - Edge case tests: ${edgeCaseTests.length}`);

    return allTests;
}

export default generateAllTests();
