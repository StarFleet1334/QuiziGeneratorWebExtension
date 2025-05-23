from pydantic import BaseModel

class TextRequest(BaseModel):
    text: str
    trueFalseQuestions: bool = False
    typeAnswerQuestions: bool = False
