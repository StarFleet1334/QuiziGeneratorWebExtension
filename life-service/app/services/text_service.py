import re
from typing import List, Dict, Optional

class TextService:
    @staticmethod
    def split_into_chunks(text: str, max_length: int = 350) -> List[str]:
        sentences = text.split('.')
        chunks, current_chunk, current_length = [], [], 0

        for sentence in sentences:
            sentence = sentence.strip() + '.'
            sentence_length = len(sentence.split())
            if current_length + sentence_length > max_length:
                chunks.append(' '.join(current_chunk))
                current_chunk, current_length = [sentence], sentence_length
            else:
                current_chunk.append(sentence)
                current_length += sentence_length

        if current_chunk:
            chunks.append(' '.join(current_chunk))

        return chunks

    @staticmethod
    def get_category_prompt(chunk: str) -> str:
        return f"""
            Please analyze the passage below and extract its key subject areas.  
            Return **no more than five** broad thematic categories that could each serve as the basis for multiple quiz questions.
            
            Text to analyze:
            {chunk}
            
            Guidelines
            • Focus on high‑level themes that capture the core ideas of the text.  
            • Keep the labels concise and professional (one short phrase each).  
            • List the themes as a numbered list, 1–5, with one category per line.
            
            Categories:
            """

    @staticmethod
    def get_question_prompt(chunk: str, category: str = None) -> str:
        base_prompt = (
            "Using ONLY the information from the given text, create one multiple-choice question"
        )

        if category:
            base_prompt += f" specifically about the topic: {category}"

        full_prompt = f"""{base_prompt}
        The question must be directly answerable from the text.
        One option must be the correct answer that appears in the text.
        Other options must be clearly wrong but plausible.
        Place the correct answer randomly among the options.
        Format your response exactly like this:

        Question: [Write a clear question]
        A) [Option]
        B) [Option]
        C) [Option]
        D) [Option]
        
        Correct: [Write A, B, C, or D - must correspond to the option that matches the text exactly]
    
        Text to use:
        {chunk}
    
        Important: 
        - The correct answer MUST be a fact stated in the text. Do not make up or infer answers.
        - Place the correct answer randomly among A, B, C, or D."""

        return full_prompt

    @staticmethod
    def parse_categories(text: str) -> List[str]:
        lines = text.strip().split('\n')
        categories = []

        for line in lines:
            line = line.strip()
            if line and (
                    line.startswith('-') or
                    line.startswith('*') or
                    any(line.startswith(str(i)) for i in range(1, 6))
            ):
                clean_category = line.strip('- *1234567890.').strip()
                if clean_category:
                    categories.append(clean_category)

        return categories

    @staticmethod
    def parse_question(text: str) -> Optional[Dict]:
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
            return {
                "question": question,
                "choices": choices,
                "correct_answer": correct_answer
            }
        return None

    @staticmethod
    async def is_chunk_relevant(chunk: str, category: str, ai_service) -> bool:
        prompt = f"""
            Is this text related to the category "{category}"? 
            Text to analyze: {chunk}
            Answer with just YES or NO.
        """
        response = await ai_service.generate_content(prompt)
        return "YES" in response.upper()