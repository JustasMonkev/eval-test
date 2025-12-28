import {getBusinessById} from './utils.ts';
import type {BusinessScenario, TestCase} from './types.ts';

const businessScenarios: Record<string, BusinessScenario> = {
    // Sunrise Bakery - has anniversary, null promotion
    biz_001: {
        name: 'Sunrise Bakery',
        scenarios: [
            {
                request: 'Celebrate our 12 years in business',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Mentions 12 years, anniversary, or longevity',
                        metric: 'content/anniversary',
                    },
                    {type: 'llm-rubric', value: 'References Portland or local community', metric: 'content/location',},
                ],
            },
            {
                request: 'Tease our upcoming anniversary celebration',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Creates anticipation without overpromising specific details',
                        metric: 'content/appropriate-teaser',
                    },
                ],
            },
            {
                request: 'Promote our weekend sale',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Does NOT mention a sale or discount because none exists in the data - should redirect or clarify',
                        metric: 'content/no-hallucination'
                    },
                ],
            },
        ],
    },

    // TechFlow Solutions - B2B SaaS with promotion
    biz_002: {
        name: 'TechFlow Solutions',
        scenarios: [
            {
                request: 'Announce our new AI-powered task prioritization feature on LinkedIn',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Mentions AI-powered task prioritization specifically',
                        metric: 'content/feature-mention',
                    },
                    {
                        type: 'llm-rubric',
                        value: 'Targets CTOs, engineering managers, or remote team leads',
                        metric: 'content/audience-fit',
                    },
                ],
            },
            {
                request: 'Promote our free trial offer on LinkedIn',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Mentions 30-day free trial with no credit card required',
                        metric: 'content/promotion-accuracy',
                    },
                ],
            },
        ],
    },

    // Glow & Grace Skincare - null tone, new brand
    biz_003: {
        name: 'Glow & Grace Skincare',
        scenarios: [
            {
                request: 'Promote our buy 2 get 1 free serum deal',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Accurately mentions buy 2 serums get 1 free promotion',
                        metric: 'content/promotion-accuracy',
                    },
                    {type: 'llm-rubric', value: 'Mentions end of month deadline', metric: 'content/urgency',},
                ],
            },
            {
                request: 'Introduce our brand to new followers',
                assertions: [
                    {type: 'llm-rubric', value: 'Mentions vegan and cruelty-free values', metric: 'content/values',},
                    {
                        type: 'llm-rubric',
                        value: 'Tone is balanced and versatile (brand is still figuring out voice)',
                        metric: 'content/flexible-tone',
                    },
                ],
            },
            {
                request: 'Post about clean beauty',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Targets health-conscious women appropriately',
                        metric: 'content/audience-fit',
                    },
                ],
            },
        ],
    },

    // Martinez Legal Group - professional legal, bilingual
    biz_004: {
        name: 'Martinez Legal Group',
        scenarios: [
            {
                request: 'Share helpful information about the visa application process on LinkedIn.',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Maintains professional legal tone - no exclamation marks or overly casual language',
                        metric: 'content/legal-tone',
                    },
                    {
                        type: 'llm-rubric',
                        value: 'Content is informative and helpful for immigrants',
                        metric: 'content/helpful',
                    },
                ],
            },
            {
                request: 'Introduce our bilingual legal team',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Mentions bilingual English/Spanish services',
                        metric: 'content/bilingual',
                    },
                    {type: 'llm-rubric', value: 'Trustworthy and compassionate tone', metric: 'content/tone-match',},
                ],
            },
            {
                request: 'Post something fun for Friday',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Remains professional and appropriate for a law firm - does not become too casual',
                        metric: 'content/industry-appropriate',
                    },
                ],
            },
        ],
    },

    // FitCore Gym - has problem field (overcrowding)
    biz_005: {
        name: 'FitCore Gym',
        scenarios: [
            {
                request: 'Announce our new outdoor training area at Brickell',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Mentions new outdoor training area at Brickell location specifically',
                        metric: 'content/update-accuracy',
                    },
                    {type: 'llm-rubric', value: 'Energetic, motivational tone', metric: 'content/tone-match',},
                ],
            },
            {
                request: 'Prepare members for the January rush',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Addresses potential overcrowding tactfully and manages expectations',
                        metric: 'content/problem-addressed'
                    },
                    {
                        type: 'llm-rubric',
                        value: 'Remains positive and welcoming despite the capacity concern',
                        metric: 'content/positive-spin',
                    },
                ],
            },
            {
                request: 'Motivational Monday post On Instagram',
                assertions: [
                    {
                        type: 'llm-rubric',
                        value: 'Motivational and energetic, targeting fitness beginners to enthusiasts',
                        metric: 'content/motivation',
                    },
                ],
            },
        ],
    },
};

export function generateContentTests(): TestCase[] {
    const tests: TestCase[] = [];

    for (const [businessId, config] of Object.entries(businessScenarios)) {
        const business = getBusinessById(businessId);
        // Optimization: Serialize once per business instead of per scenario
        const businessDataJson = JSON.stringify(business);

        for (const scenario of config.scenarios) {
            tests.push({
                description: `CONTENT | ${config.name} | ${scenario.request}`,
                vars: {
                    BUSINESS_DATA: businessDataJson,
                    REQUEST: scenario.request,
                },
                assert: scenario.assertions,
            });
        }
    }

    return tests;
}
