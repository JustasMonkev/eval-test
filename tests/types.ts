export interface Business {
    id: string;
    business_name: string;
    industry: string;
    description: string;
    tone: string | null;
    target_audience: string;
    current_promotion: string | null;
    recent_update?: string | null;
    notes?: string;
    problem?: string;
}

export interface Assertion {
    type: 'llm-rubric' | 'contains-any' | 'not-contains' | 'not-contains-any' | 'latency';
    value?: string | string[];
    metric: string;
    threshold?: number;
    weight?: number;
}

export interface TestCase {
    description: string;
    vars: {
        BUSINESS_DATA: string;
        REQUEST: string;
    };
    assert: Assertion[];
}

export interface Scenario {
    request: string;
    assertions: Assertion[];
}

export interface BusinessScenario {
    name: string;
    scenarios: Scenario[];
}
