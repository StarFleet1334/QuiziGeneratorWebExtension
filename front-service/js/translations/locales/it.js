export default {
    title: "Quiz di Lettura Attiva",
    buttons: {
        startQuiz: "Inizia Quiz",
        chooseCategory: "Scegli Categoria",
        settings: "Impostazioni",
        goBack: "Indietro",
        generateAgain: "Genera di Nuovo",
        finish: "Termina",
        tryAgain: "Riprova"
    },
    settings: {
        title: "Impostazioni",
        language: "Lingua",
        defaultQuestions: "Domande Predefinite",
        trueFalseQuestions: "Domande Vero/Falso",
        typeAnswerQuestions: "Domande a Risposta Aperta",
        timeLimit: "Limite di Tempo per Domanda",
        minutes: "Minuti",
        seconds: "Secondi",
        difficulty: {
            easy: "Facile",
            medium: "Medio",
            hard: "Difficile"
        }
    },
    quiz: {
        title: "Quiz",
        question: "Domanda",
        results: "Risultati del Quiz",
        score: "Hai ottenuto {correct} risposte corrette su {total}!",
        typeAnswer: "Scrivi qui la tua risposta...",
        submit: "Invia",
        correct: "✓ Corretto!",
        incorrect: "✗ Sbagliato. La risposta corretta era: {answer}"
    },
    categories: {
        title: "Seleziona Categoria",
        noCategories: "Nessuna categoria disponibile"
    },
    alerts: {
        answerFirst: "Per favore, rispondi alla domanda attuale prima di generarne una nuova!",
        noContent: "Impossibile estrarre il contenuto dalla pagina. Riprova.",
        noQuestions: "Impossibile generare domande. Prova una pagina diversa.",
        serverError: "Impossibile connettersi al server. Assicurati che sia in esecuzione.",
        generateError: "Si è verificato un errore durante la generazione delle domande. Riprova.",
        contentError: "Estrazione del contenuto fallita. Prova su una pagina diversa."
    }
};