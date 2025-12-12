export interface QuizQuestion {
    question: string;
    answer: string;
    options: string[];
    explanation: string;
}

export interface Battle {
    id: string;
    // The user's original structure for battles:
    enemy: string; // The challenge area (e.g., Credibility Cave)
    weakness: string; // The Practice to use against the enemy (e.g., Model the Way)
    description: string;
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
    quizzes: QuizQuestion[];
    battles: Battle[];
    ending: {
        future_title: string;
        impact_statement: string;
    };
}

export const gameData: GameContent = {
    hero: {
        name: "SANGTAE AHN",
        philosophy: "Leadership is serving the team with humility and a continuous 'learn-it-all' mindset.",
        values: ["Innovation", "Transparency", "Growth", "Extreme Ownership"]
    },
    quizzes: [
        {
            // Focus: Model the Way & Credibility
            question: "According to Kouzes and Posner, the most crucial foundation for leadership credibility is:",
            answer: "Value/action consistency", // 3 words
            options: [
                "Charisma", // 1 word
                "Technical skill", // 2 words
                "Value/action consistency", // 3 words
                "Centralized decisions" // 2 words
            ],
            explanation: "Model the Way requires integrity, which is the consistent alignment of a leader’s words and actions. This builds trust and credibility."
        },
        {
            // Focus: Inspire a Shared Vision & Enrollment
            question: "To effectively 'Enlist Others' in a Shared Vision, a leader must primarily appeal to:",
            answer: "Personal hopes/dreams", // 2 words
            options: [
                "Salary/incentives", // 1 word
                "Logical plans", // 2 words
                "Personal hopes/dreams", // 2 words
                "Organizational duty" // 2 words
            ],
            explanation: "Inspiration is an emotional process; the vision must connect to followers' intrinsic motivation and desires for the future."
        },
        {
            // Focus: Challenge the Process & Small Wins
            question: "What is the primary strategic purpose of generating 'Small Wins' when applying Challenge the Process?",
            answer: "Build psychological momentum", // 3 words
            options: [
                "Reduce workload", // 2 words
                "Isolate risk", // 2 words
                "Build psychological momentum", // 3 words
                "Identify leaders" // 2 words
            ],
            explanation: "Small Wins are critical for maintaining hope, reducing fear, and building the necessary commitment to tackle massive, complex challenges."
        },
        {
            // Focus: Enable Others to Act & Leader-as-Coach (Humble Inquiry)
            question: "In the 'Leader as Coach' model, the fundamental shift is moving from 'telling' solutions to 'asking' what kind of questions?",
            answer: "Humble Inquiry questions", // 3 words
            options: [
                "Assign blame", // 2 words
                "Yes/No data", // 2 words
                "Focus on mistakes", // 3 words
                "Humble Inquiry questions" // 3 words
            ],
            explanation: "Humble Inquiry empowers individuals to develop their own problem-solving skills, which fosters self-determination (Enable Others to Act)."
        },
        {
            // Focus: Encourage the Heart & Values/Victories
            question: "The main purpose of corporate ceremonies and recognition in 'Encourage the Heart' is to:",
            answer: "Reinforce shared values", // 3 words
            options: [
                "Provide a break", // 2 words
                "Reinforce shared values", // 3 words
                "Measure productivity", // 2 words
                "Minimize leader labor" // 3 words
            ],
            explanation: "Celebrations are strategic: they connect individual efforts to collective success and make the organizational values emotionally resonant."
        }
    ],
    battles: [
        {
            id: "gym1",
            enemy: "The Doubt Vortex",
            weakness: "Model the Way",
            description: "Mission 1: Your team doubts your commitment. Prove your integrity and restore trust.",
            weakness_enemy: "Broken Trust",
            weakness_description: "The team perceives a gap between the leader's words and their daily actions.",
            effective_strength_attack: "Model the Way",
            attack_description: "I used **Model the Way** to defeat **Broken Trust**! My actions now speak louder than my words, restoring the team's belief."
        },
        {
            id: "gym2",
            enemy: "The Apathy Abyss",
            weakness: "Inspire Vision",
            description: "Mission 2: The team lacks direction and passion. You must cast a compelling future that inspires action.",
            weakness_enemy: "Aimless Drift",
            weakness_description: "The team feels disconnected and unmotivated by the current organizational goals.",
            effective_strength_attack: "Inspire Vision",
            attack_description: "I used **Inspire a Shared Vision** to overcome **Aimless Drift**! I connected the mission to their personal hopes and dreams."
        },
        {
            id: "gym3",
            enemy: "The Status Quo Swamp",
            weakness: "Challenge Process",
            description: "Mission 3: Your system is outdated and inefficient. Challenge the norm and lead through learning and experimentation.",
            weakness_enemy: "Fear of Failure",
            weakness_description: "Resistance to change due to fear of mistakes and the comfort of the familiar.",
            effective_strength_attack: "Challenge Process",
            attack_description: "I used **Challenge the Process** to break the **Fear of Failure**! We experimented, learned from small setbacks, and found a better path."
        },
        {
            id: "gym4",
            enemy: "The Dependency Wall",
            weakness: "Enable Others",
            description: "Mission 4: A key team member is struggling due to lack of confidence. Empower them to grow and take ownership.",
            weakness_enemy: "Skill Gaps",
            weakness_description: "Team members rely too much on the leader for solutions, hindering their self-determination.",
            effective_strength_attack: "Enable Others",
            attack_description: "I used **Enable Others to Act** to dismantle the **Dependency Wall**! I strengthened their competence through coaching and building collaboration."
        },
        {
            id: "gym5",
            enemy: "The Grind Fatigue",
            weakness: "Encouragement",
            description: "Mission 5: Morale is low after a long, difficult push. You must restore energy and reinforce collective pride.",
            weakness_enemy: "Burnout",
            weakness_description: "The team feels unappreciated and their effort is disconnected from the organizational values.",
            effective_strength_attack: "Encouragement",
            attack_description: "I used **Encourage the Heart** to lift the **Grind Fatigue**! I recognized their specific value-based efforts, creating collective pride."
        }
    ],
    ending: {
        future_title: "Exemplary Leader of the Future",
        impact_statement: "I have mastered the Five Practices of Exemplary Leadership and am ready to lead with purpose, coaching, and a growth mindset."
    }
};