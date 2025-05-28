export default {
    title: "Тест Активного Чтения",
    buttons: {
        startQuiz: "Начать Тест",
        chooseCategory: "Выбрать Категорию",
        settings: "Настройки",
        goBack: "Назад",
        generateAgain: "Сгенерировать Заново",
        finish: "Завершить",
        tryAgain: "Попробовать Снова"
    },
    settings: {
        title: "Настройки",
        language: "Язык",
        defaultQuestions: "Стандартные Вопросы",
        trueFalseQuestions: "Вопросы Верно/Неверно",
        typeAnswerQuestions: "Вопросы с Вводом Ответа",
        timeLimit: "Ограничение Времени на Вопрос",
        minutes: "Минуты",
        seconds: "Секунды",
        difficulty: {
            easy: "Легкий",
            medium: "Средний",
            hard: "Сложный"
        }
    },
    quiz: {
        title: "Тест",
        question: "Вопрос",
        results: "Результаты Теста",
        score: "Вы правильно ответили на {correct} из {total} вопросов!",
        typeAnswer: "Введите ваш ответ здесь...",
        submit: "Отправить",
        correct: "✓ Верно!",
        incorrect: "✗ Неверно. Правильный ответ: {answer}"
    },
    categories: {
        title: "Выберите Категорию",
        noCategories: "Нет доступных категорий"
    },
    alerts: {
        answerFirst: "Пожалуйста, ответьте на текущий вопрос перед генерацией нового!",
        noContent: "Не удалось извлечь содержимое страницы. Попробуйте снова.",
        noQuestions: "Не удалось сгенерировать вопросы. Попробуйте другую страницу.",
        serverError: "Не удалось подключиться к серверу. Убедитесь, что он запущен.",
        generateError: "Произошла ошибка при генерации вопросов. Попробуйте снова.",
        contentError: "Не удалось извлечь содержимое. Попробуйте на другой странице."
    }
};