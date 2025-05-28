export default {
    title: "主动阅读测验",
    buttons: {
        startQuiz: "开始测验",
        chooseCategory: "选择类别",
        settings: "设置",
        goBack: "返回",
        generateAgain: "重新生成",
        finish: "完成",
        tryAgain: "重试"
    },
    settings: {
        title: "设置",
        language: "语言",
        defaultQuestions: "默认问题",
        trueFalseQuestions: "判断题",
        typeAnswerQuestions: "填空题",
        timeLimit: "答题时限",
        minutes: "分钟",
        seconds: "秒",
        difficulty: {
            easy: "简单",
            medium: "中等",
            hard: "困难"
        }
    },
    quiz: {
        title: "测验",
        question: "问题",
        results: "测验结果",
        score: "你答对了{total}题中的{correct}题！",
        typeAnswer: "在此输入答案...",
        submit: "提交",
        correct: "✓ 正确！",
        incorrect: "✗ 错误。正确答案是：{answer}"
    },
    categories: {
        title: "选择类别",
        noCategories: "暂无可用类别"
    },
    alerts: {
        answerFirst: "请先回答当前问题再生成新问题！",
        noContent: "无法提取页面内容。请重试。",
        noQuestions: "无法生成问题。请尝试其他页面。",
        serverError: "无法连接到服务器。请确保服务器正在运行。",
        generateError: "生成问题时出错。请重试。",
        contentError: "内容提取失败。请在其他页面重试。"
    }
};