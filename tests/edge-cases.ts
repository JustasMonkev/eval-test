import businesses from '../data/business-profiles.json' with {type: 'json'};
import type {Business, TestCase} from './types.ts';

const typedBusinesses = businesses as Business[];

export function generateEdgeCaseTests(): TestCase[] {
    return [
        {
            description: 'EDGE | Empty request',
            vars: {
                BUSINESS_DATA: JSON.stringify(typedBusinesses[0]),
                REQUEST: '',
            },
            assert: [
                {
                    type: 'llm-rubric',
                    value: 'Asks for clarification or provides helpful guidance about what kind of post to create',
                    metric: 'edge/empty-input-handling',
                    threshold: 0.7
                },
            ],
        },

        // Vague request
        {
            description: 'EDGE | Vague request - just "post something"',
            vars: {
                BUSINESS_DATA: JSON.stringify(typedBusinesses[2]),
                REQUEST: 'Post something',
            },
            assert: [
                {
                    type: 'llm-rubric',
                    value: 'Creates a reasonable default post or asks for more details',
                    metric: 'edge/vague-handling',
                    threshold: 0.7
                },
                {
                    type: 'llm-rubric',
                    value: 'Does NOT produce nonsensical or off-topic content',
                    metric: 'edge/coherent',
                    threshold: 0.8
                },
            ],
        },
        {
            description: 'EDGE | Business with null tone (Glow & Grace)',
            vars: {
                BUSINESS_DATA: JSON.stringify(typedBusinesses[2]),  // biz_003 has tone: null
                REQUEST: 'Create an engaging brand post',
            },
            assert: [
                {
                    type: 'llm-rubric',
                    value: 'Infers appropriate tone from industry (beauty/wellness) and target audience',
                    metric: 'edge/null-tone-inference',
                    threshold: 0.7
                },
                {
                    type: 'llm-rubric',
                    value: 'Tone is balanced and not extreme in any direction',
                    metric: 'edge/balanced-tone',
                    threshold: 0.7
                },
            ],
        },
        {
            description: 'EDGE | Request promotion when none exists',
            vars: {
                BUSINESS_DATA: JSON.stringify(typedBusinesses[3]),  // Martinez Legal has no promotion
                REQUEST: 'Promote our current discount offer',
            },
            assert: [
                {
                    type: 'llm-rubric',
                    value: 'Does NOT invent a discount or promotion that does not exist',
                    metric: 'edge/no-hallucination',
                    threshold: 0.9,
                    weight: 2
                },
                {
                    type: 'llm-rubric',
                    value: 'Either clarifies no promotion exists or creates non-promotional content',
                    metric: 'edge/graceful-fallback',
                    threshold: 0.7
                },
            ],

        },
        {
            description: 'EDGE | Wrong industry request (ask bakery about software)',
            vars: {
                BUSINESS_DATA: JSON.stringify(typedBusinesses[0]),  // Sunrise Bakery
                REQUEST: 'Announce our new software feature release',
            },
            assert: [
                {
                    type: 'llm-rubric',
                    value: 'Recognizes mismatch and either clarifies or redirects to bakery-appropriate content',
                    metric: 'edge/mismatch-handling',
                    threshold: 0.7
                },
                {
                    type: 'llm-rubric',
                    value: 'Does NOT pretend the bakery has software features',
                    metric: 'edge/no-hallucination',
                    threshold: 0.9
                },
            ],

        },
        {
            description: 'EDGE | Overly detailed request',
            vars: {
                BUSINESS_DATA: JSON.stringify(typedBusinesses[1]),

                REQUEST: 'Write a post about our AI feature that mentions machine learning, neural networks, automation, productivity, remote teams, collaboration, project management, task tracking, sprint planning, agile methodology, and our free trial offer',
            },
            assert: [
                {
                    type: 'llm-rubric',
                    value: 'Prioritizes key points rather than cramming everything in',
                    metric: 'edge/prioritization',
                    threshold: 0.7
                },
                {
                    type: 'llm-rubric',
                    value: 'Output is still coherent and readable',
                    metric: 'edge/readability',
                    threshold: 0.8
                },
            ],

        },
        {
            description: 'EDGE | Request in Spanish',
            vars: {
                BUSINESS_DATA: JSON.stringify(typedBusinesses[3]),  // Martinez Legal (bilingual)
                REQUEST: 'Escribe un post sobre nuestros servicios de inmigración',
            },
            assert: [
                {
                    type: 'llm-rubric',
                    value: 'Handles the Spanish request appropriately - either responds in Spanish or English',
                    metric: 'edge/language-handling',
                    threshold: 0.7
                },
                {
                    type: 'llm-rubric',
                    value: 'Content is relevant to immigration services',
                    metric: 'edge/content-relevant',
                    threshold: 0.8
                },
            ],

        },
    ];
}
