export default {
    title: "Quiz de Leitura Ativa",
    buttons: {
        startQuiz: "Iniciar Quiz",
        chooseCategory: "Escolher Categoria",
        settings: "Configurações",
        goBack: "Voltar",
        generateAgain: "Gerar Novamente",
        finish: "Finalizar",
        tryAgain: "Tentar Novamente"
    },
    settings: {
        title: "Configurações",
        language: "Idioma",
        defaultQuestions: "Questões Padrão",
        trueFalseQuestions: "Questões Verdadeiro/Falso",
        typeAnswerQuestions: "Questões de Resposta Escrita",
        timeLimit: "Limite de Tempo da Questão",
        minutes: "Minutos",
        seconds: "Segundos",
        difficulty: {
            easy: "Fácil",
            medium: "Médio",
            hard: "Difícil"
        }
    },
    quiz: {
        title: "Quiz",
        question: "Questão",
        results: "Resultados do Quiz",
        score: "Você acertou {correct} de {total} questões!",
        typeAnswer: "Digite sua resposta aqui...",
        submit: "Enviar",
        correct: "✓ Correto!",
        incorrect: "✗ Incorreto. A resposta correta era: {answer}"
    },
    categories: {
        title: "Selecionar Categoria",
        noCategories: "Nenhuma categoria disponível"
    },
    alerts: {
        answerFirst: "Por favor, responda à questão atual antes de gerar uma nova!",
        noContent: "Não foi possível extrair conteúdo da página. Tente novamente.",
        noQuestions: "Não foi possível gerar questões. Tente uma página diferente.",
        serverError: "Não foi possível conectar ao servidor. Certifique-se de que ele está funcionando.",
        generateError: "Ocorreu um erro ao gerar questões. Tente novamente.",
        contentError: "Falha ao extrair conteúdo. Tente em uma página diferente."
    }
};