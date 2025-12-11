export interface GameContent {
    hero: {
        name: string;
        philosophy: string;
        values: string[];
    };
    quiz: {
        question: string;
        answer: string;
        options: string[];
        explanation: string;
    }[];
    battles: {
        weakness_enemy: string;
        weakness_description: string;
        effective_strength_attack: string;
        attack_description: string;
    }[];
    ending: {
        future_title: string;
        impact_statement: string;
    };
}

export const gameData: GameContent = {
    hero: {
        name: "SANGTAE AHN",
        philosophy: "Leadership is serving the team...",
        values: ["Innovation", "Transparency"]
    },
    quiz: [
        {
            question: "Management is doing things right; leadership is doing the right things.",
            answer: "Peter Drucker",
            options: ["Peter Drucker", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
            explanation: "It resonates because I value strategic direction over micromanagement."
        },
        {
            question: "What's Tae's leadership quote? Always be deciding, scaling, and _",
            answer: "Leaving",
            options: ["Leaving", "Leading", "Deciding", "Scaling"],
            explanation: "Always be leaving is a quote that resonates with me because it emphasizes the importance of creating space for others to grow and thrive."
        }
    ],
    battles: [
        {
            weakness_enemy: "Silence in Meetings",
            weakness_description: "I struggle to speak up quickly.",
            effective_strength_attack: "Deep Analysis",
            attack_description: "I used Deep Analysis! I prepared my thoughts beforehand and provided a comprehensive solution."
        },
        {
            weakness_enemy: "Burnout Risk",
            weakness_description: "I take on too much work.",
            effective_strength_attack: "Delegation",
            attack_description: "I used Delegation! I trusted my junior devs with the module."
        },
        {
            weakness_enemy: "Imposter Syndrome",
            weakness_description: "I doubt my own abilities.",
            effective_strength_attack: "Past Successes",
            attack_description: "I recalled Past Successes! I remembered the successful launch of the last project."
        }
    ],
    ending: {
        future_title: "CTO of Innovation",
        impact_statement: "I will empower the next generation of engineers to build without fear."
    }
};
