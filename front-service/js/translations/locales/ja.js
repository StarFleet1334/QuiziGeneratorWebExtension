export default {
    title: "アクティブリーディングクイズ",
    buttons: {
        startQuiz: "クイズを開始",
        chooseCategory: "カテゴリーを選択",
        settings: "設定",
        goBack: "戻る",
        generateAgain: "再生成",
        finish: "終了",
        tryAgain: "もう一度"
    },
    settings: {
        title: "設定",
        language: "言語",
        defaultQuestions: "デフォルトの質問",
        trueFalseQuestions: "○/×問題",
        typeAnswerQuestions: "記述式問題",
        timeLimit: "制限時間",
        minutes: "分",
        seconds: "秒",
        difficulty: {
            easy: "簡単",
            medium: "普通",
            hard: "難しい"
        }
    },
    quiz: {
        title: "クイズ",
        question: "問題",
        results: "クイズ結果",
        score: "{total}問中{correct}問正解！",
        typeAnswer: "ここに回答を入力してください...",
        submit: "送信",
        correct: "✓ 正解！",
        incorrect: "✗ 不正解。正解は：{answer}"
    },
    categories: {
        title: "カテゴリーを選択",
        noCategories: "利用可能なカテゴリーがありません"
    },
    alerts: {
        answerFirst: "新しい問題を生成する前に、現在の問題に回答してください！",
        noContent: "ページからコンテンツを抽出できませんでした。もう一度お試しください。",
        noQuestions: "問題を生成できませんでした。別のページをお試しください。",
        serverError: "サーバーに接続できません。サーバーが実行中か確認してください。",
        generateError: "問題の生成中にエラーが発生しました。もう一度お試しください。",
        contentError: "コンテンツの抽出に失敗しました。別のページでお試しください。"
    }
};