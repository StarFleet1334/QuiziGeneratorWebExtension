import random
import re
from typing import Optional, Dict, List

def robust_parse_question(text: str) -> Optional[Dict]:
    question = None
    choices = {}
    correct_answer = None

    lines = text.strip().split('\n')
    for line in lines:
        line = line.strip()

        if line.lower().startswith('question:'):
            question = line[9:].strip()
        elif re.match(r'^[A-D][\)\.]\s', line):
            label = line[0]
            content = line[2:].strip()
            choices[label] = content
        elif line.lower().startswith('correct:'):
            correct_answer = line[8:].strip().upper()
            if correct_answer and len(correct_answer) == 1:
                correct_answer = correct_answer[0]

    if (question and
            len(choices) == 4 and
            correct_answer and
            correct_answer in ['A', 'B', 'C', 'D'] and
            all(k in choices for k in ['A', 'B', 'C', 'D'])):

        correct_content = choices[correct_answer]

        choice_items = list(choices.items())

        random.shuffle(choice_items)

        shuffled_choices = {}
        for new_label, (_, content) in zip(['A', 'B', 'C', 'D'], choice_items):
            shuffled_choices[new_label] = content
            if content == correct_content:
                correct_answer = new_label

        return {
            "question": question,
            "choices": shuffled_choices,
            "correct_answer": correct_answer
        }
    return None
