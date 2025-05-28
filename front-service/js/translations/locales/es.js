export default {
    title: "Cuestionario de Lectura Activa",
    buttons: {
        startQuiz: "Comenzar Cuestionario",
        chooseCategory: "Elegir Categoría",
        settings: "Configuración",
        goBack: "Volver",
        generateAgain: "Generar Nuevo",
        finish: "Finalizar",
        tryAgain: "Intentar de Nuevo"
    },
    settings: {
        title: "Configuración",
        language: "Idioma",
        defaultQuestions: "Preguntas Predeterminadas",
        trueFalseQuestions: "Preguntas Verdadero/Falso",
        typeAnswerQuestions: "Preguntas de Respuesta Escrita",
        timeLimit: "Límite de Tiempo",
        minutes: "Minutos",
        seconds: "Segundos",
        difficulty: {
            easy: "Fácil",
            medium: "Medio",
            hard: "Difícil"
        }
    },
    quiz: {
        title: "Cuestionario",
        question: "Pregunta",
        results: "Resultados",
        score: "¡Has obtenido {correct} de {total} correctas!",
        typeAnswer: "Escribe tu respuesta aquí...",
        submit: "Enviar",
        correct: "✓ ¡Correcto!",
        incorrect: "✗ Incorrecto. La respuesta correcta era: {answer}"
    },
    categories: {
        title: "Seleccionar Categoría",
        noCategories: "No hay categorías disponibles"
    },
    alerts: {
        answerFirst: "¡Por favor responde la pregunta actual antes de generar una nueva!",
        noContent: "No se pudo extraer contenido de la página. Por favor, inténtalo de nuevo.",
        noQuestions: "No se pudieron generar preguntas. Por favor, prueba con otra página.",
        serverError: "No se pudo conectar al servidor. Por favor, asegúrate de que está funcionando.",
        generateError: "Ocurrió un error al generar las preguntas. Por favor, inténtalo de nuevo.",
        contentError: "Error al extraer contenido. Por favor, inténtalo de nuevo en otra página."
    }
};