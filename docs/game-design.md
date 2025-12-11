# Game Design Document: " The Leadership Journey"

## 1\. Project Overview

A web-based, 2-phase interactive game.

  * **Style:** Retro RPG (similar to Pokémon/Gameboy).
  * **Goal:** The player explores the user's leadership identity, battles weaknesses using strengths, and evolves into the "Envisioned Leader."
  * [cite_start]**Time Limit:** Must be playable in under 15 minutes[cite: 27].

## 2\. Technical Stack (Recommended)

  * **Framework:** React (for easy state management) or Phaser.js (if you want more complex graphics).
  * **Styling:** Tailwind CSS (for the UI overlay) + Canvas (for the game map).
  * **Data:** A simple `gameData.json` file to hold all text/dialogue.

-----

## 3\. Game Flow & Content Requirements

### Phase 1: The "Professor Oak" Intro (The Philosophy)

[cite_start]**Assignment Goal:** Articulate Personal Leadership Philosophy [cite: 39] [cite_start]and Core Values[cite: 46].

  * **Scene:** A static character sprite (You) stands against a simple background.
  * **Mechanic:** Dialogue box (Typewriter effect).
  * **Script Logic:**
    1.  **Intro:** "Hello there\! Welcome to the world of Leadership."
    2.  **Philosophy:** "I define leadership as [Insert Personal Definition Here]." (Reflect on how this view has shifted recently) [cite_start][cite: 40].
    3.  **Values:** "My core values are [Value A] and [Value B]."
  * **Interaction:** User clicks "Next" to advance text.

### Phase 2: The Quiz (The Quote)

[cite_start]**Assignment Goal:** Include a favorite quote and explain why it resonates[cite: 43].

  * **Scene:** Still in the Intro scene.
  * **Mechanic:** Multiple Choice Question.
  * **Logic:**
      * **Question:** "To understand my motivation, you must know this quote by [Author Name]..."
      * **Display Quote:** "[Insert Quote Here]"
      * **Prompt:** "Why does this resonate with me?"
      * **Options:**
          * A) [Wrong/Funny Answer]
          * B) [Wrong/Funny Answer]
          * C) [Correct Answer - The Explanation of resonance]
  * [cite_start]**On Success:** "Exactly\! This reflects my definition of leadership because..."[cite: 44]. Transition to Phase 3.

### Phase 3: The Grass Map (Strengths vs. Weaknesses)

[cite_start]**Assignment Goal:** Identify 2-3 Weaknesses and 2-3 Strengths[cite: 49]. [cite_start]Explain how you leverage strengths to address weaknesses[cite: 50, 51].

  * **Scene:** Top-down 2D grid map (grass tiles). Player moves an avatar using arrow keys.
  * **Mechanic:** Random Encounters.
  * **The Enemies (Weaknesses):**
      * Create 3 "Monsters" named after your development areas (e.g., "Micro-Manager," "Conflict Avoider," "Impatient").
  * **The Battle:**
      * Text: "A wild [Weakness Name] appeared\!"
      * Player Menu: **FIGHT** | **ITEM** | **RUN**
      * **FIGHT Menu (Strengths):** The "attacks" should be your Strengths (e.g., "Empathy," "Strategic Vision," "Technical Expertise").
  * **Winning Logic:**
      * You must code specific "Super Effective" matches.
      * *Example:* If Enemy is "Conflict Avoider," using Strength "Empathy" is Super Effective.
      * *Text on Hit:* "You used Empathy\! You listened to the team's needs. It's super effective\!" [cite_start](This fulfills the requirement of explaining *how* you leverage the strength [cite: 50]).

### Phase 4: The Evolution (The Envisioned Leader)

[cite_start]**Assignment Goal:** Describe the ideal future self and impact on others[cite: 54, 55].

  * **Scene:** The avatar glows and evolves (sprite changes).
  * **Mechanic:** Cinematic / End Screen.
  * **Text:**
      * "Congratulations\! The current leader has evolved into the [Title of Future Self]."
      * "In this form, I aim to achieve [List Achievements]."
      * "My impact on others will be [Describe Impact]."
  * **Button:** "Download Resume" (Links to Deliverable Two).

-----

## 4\. Data Structure for the Coding Agent

To make this easy for your agent to code, tell them to separate the **Content** from the **Logic**. Create a JSON object like this:

```json
{
  "hero": {
    "name": "Tech Lead [Your Name]",
    "philosophy": "Leadership is serving the team...",
    "values": ["Innovation", "Transparency"]
  },
  "quiz": {
    "quote": "Management is doing things right; leadership is doing the right things.",
    "author": "Peter Drucker",
    "correct_explanation": "It resonates because I value strategic direction over micromanagement."
  },
  "battles": [
    {
      "weakness_enemy": "Silence in Meetings",
      "weakness_description": "I struggle to speak up quickly.",
      "effective_strength_attack": "Deep Analysis",
      "attack_description": "I used Deep Analysis! I prepared my thoughts beforehand and provided a comprehensive solution."
    },
    {
      "weakness_enemy": "Burnout Risk",
      "weakness_description": "I take on too much work.",
      "effective_strength_attack": "Delegation",
      "attack_description": "I used Delegation! I trusted my junior devs with the module."
    }
  ],
  "ending": {
    "future_title": "CTO of Innovation",
    "impact_statement": "I will empower the next generation of engineers to build without fear."
  }
}
```

## 5\. Next Step for You

You need to fill in the "values" inside that JSON structure with your actual personal reflections before giving it to the coding agent.