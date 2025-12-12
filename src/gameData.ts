
export interface QuizQuestion {
    question: string;
    answer: string;
    options: string[];
    explanation: string;
}

export interface Battle {
    id: string;
    enemy: string; // Renamed from weakness_enemy for clarity, or map valid props
    weakness: string; // Renamed from effective_strength_attack
    description: string;
    // We can keep original structure or simplify. Let's map to what I used in components.
    // In BattleScene I used: enemy.enemy, enemy.weakness.
    // In MapScene I used: id.

    // Let's keep the user's structure but add 'id' and maybe standard aliases or just use their names.
    // User structure: weakness_enemy, weakness_description, effective_strength_attack, attack_description.
    // I will append 'id' and also map the properties I used in my code to these or updated my code.
    // Better to update this file to have clean names and 'id'.

    weakness_enemy: string;
    weakness_description: string;
    effective_strength_attack: string;
    attack_description: string;
}

export interface GameContent {
    hero: {
        name: string;
        philosophy: string;
        values: string[];
    };
    quizzes: QuizQuestion[]; // Renamed from quiz
    battles: Battle[];
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
    quizzes: [
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
        },
        {
            question: "Core Value: When a team fails, who is responsible?",
            answer: "The Leader (Me)",
            options: ["The Leader (Me)", "The Team", "The Market", "Bad Luck"],
            explanation: "Extreme Ownership is key."
        }
    ],
    battles: [
        {
            id: "b1",
            enemy: "Silence in Meetings", // Alias for easier use
            weakness: "Deep Analysis", // Alias
            description: "I struggle to speak up quickly.",

            weakness_enemy: "Silence in Meetings",
            weakness_description: "I struggle to speak up quickly.",
            effective_strength_attack: "Deep Analysis",
            attack_description: "I used Deep Analysis! I prepared my thoughts beforehand and provided a comprehensive solution."
        },
        {
            id: "b2",
            enemy: "Burnout Risk",
            weakness: "Delegation",
            description: "I take on too much work.",

            weakness_enemy: "Burnout Risk",
            weakness_description: "I take on too much work.",
            effective_strength_attack: "Delegation",
            attack_description: "I used Delegation! I trusted my junior devs with the module."
        },
        {
            id: "b3",
            enemy: "Imposter Syndrome",
            weakness: "Past Successes",
            description: "I doubt my own abilities.",

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
