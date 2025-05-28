export default {
    title: "능동적 읽기 퀴즈",
    buttons: {
        startQuiz: "퀴즈 시작",
        chooseCategory: "카테고리 선택",
        settings: "설정",
        goBack: "뒤로가기",
        generateAgain: "다시 생성",
        finish: "완료",
        tryAgain: "다시 시도"
    },
    settings: {
        title: "설정",
        language: "언어",
        defaultQuestions: "기본 문제",
        trueFalseQuestions: "참/거짓 문제",
        typeAnswerQuestions: "주관식 문제",
        timeLimit: "문제 제한 시간",
        minutes: "분",
        seconds: "초",
        difficulty: {
            easy: "쉬움",
            medium: "보통",
            hard: "어려움"
        }
    },
    quiz: {
        title: "퀴즈",
        question: "문제",
        results: "퀴즈 결과",
        score: "총 {total}문제 중 {correct}문제를 맞추셨습니다!",
        typeAnswer: "여기에 답을 입력하세요...",
        submit: "제출",
        correct: "✓ 정답입니다!",
        incorrect: "✗ 오답입니다. 정답은: {answer}"
    },
    categories: {
        title: "카테고리 선택",
        noCategories: "사용 가능한 카테고리가 없습니다"
    },
    alerts: {
        answerFirst: "새로운 문제를 생성하기 전에 현재 문제에 답해주세요!",
        noContent: "페이지에서 내용을 추출할 수 없습니다. 다시 시도해주세요.",
        noQuestions: "문제를 생성할 수 없습니다. 다른 페이지를 시도해주세요.",
        serverError: "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.",
        generateError: "문제 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        contentError: "내용 추출에 실패했습니다. 다른 페이지에서 시도해주세요."
    }
};