
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
        values: ["Innovation", "Transparency", "Growth"]
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
            id: "gym1",
            enemy: "Credibility Cave",
            weakness: "Model the Way",
            description: "Gym 1: Demonstrate Value Consistency.",
            weakness_enemy: "Inconsistency",
            weakness_description: "Actions do not match words.",
            effective_strength_attack: "Model the Way",
            attack_description: "I used Model the Way! I aligned my actions with my shared values."
        },
        {
            id: "gym2",
            enemy: "Vision Peak",
            weakness: "Inspire Vision",
            description: "Gym 2: Articulate a Compelling Vision.",
            weakness_enemy: "Lack of Purpose",
            weakness_description: "The team feels aimless.",
            effective_strength_attack: "Inspire Vision",
            attack_description: "I used Inspire a Shared Vision! I appealed to their personal aspirations."
        },
        {
            id: "gym3",
            enemy: "Challenge Gorge",
            weakness: "Challenge Process",
            description: "Gym 3: Overcome a Major Obstacle.",
            weakness_enemy: "Stagnation",
            weakness_description: "We are stuck in the status quo.",
            effective_strength_attack: "Challenge Process",
            attack_description: "I used Challenge the Process! I experimented with small wins to find the path."
        },
        {
            id: "gym4",
            enemy: "Strengthen Falls",
            weakness: "Enable Others",
            description: "Gym 4: Develop a Weak Teammate.",
            weakness_enemy: "Dependence",
            weakness_description: "Team members rely too much on command.",
            effective_strength_attack: "Enable Others",
            attack_description: "I used Enable Others to Act! I coached them to solve the puzzle themselves."
        },
        {
            id: "gym5",
            enemy: "Celeb Temple",
            weakness: "Encouragement",
            description: "Gym 5: Master Genuine Recognition.",
            weakness_enemy: "Low Morale",
            weakness_description: "The team feels unappreciated.",
            effective_strength_attack: "Encouragement",
            attack_description: "I used Encourage the Heart! I celebrated a specific value-based victory."
        }
    ],
    ending: {
        future_title: "Exemplary Leader",
        impact_statement: "I have mastered the Five Practices and am ready to lead with purpose."
    }
};
