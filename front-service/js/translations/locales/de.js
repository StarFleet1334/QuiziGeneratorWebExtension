export default {
    title: "Aktives Lese-Quiz",
    buttons: {
        startQuiz: "Quiz Starten",
        chooseCategory: "Kategorie Wählen",
        settings: "Einstellungen",
        goBack: "Zurück",
        generateAgain: "Neu Generieren",
        finish: "Beenden",
        tryAgain: "Erneut Versuchen"
    },
    settings: {
        title: "Einstellungen",
        language: "Sprache",
        defaultQuestions: "Standardfragen",
        trueFalseQuestions: "Wahr/Falsch Fragen",
        typeAnswerQuestions: "Eingabefragen",
        timeLimit: "Zeitlimit pro Frage",
        minutes: "Minuten",
        seconds: "Sekunden",
        difficulty: {
            easy: "Einfach",
            medium: "Mittel",
            hard: "Schwer"
        }
    },
    quiz: {
        title: "Quiz",
        question: "Frage",
        results: "Quizergebnisse",
        score: "Du hast {correct} von {total} richtig!",
        typeAnswer: "Gib deine Antwort hier ein...",
        submit: "Absenden",
        correct: "✓ Richtig!",
        incorrect: "✗ Falsch. Die richtige Antwort war: {answer}"
    },
    categories: {
        title: "Kategorie Auswählen",
        noCategories: "Keine Kategorien verfügbar"
    },
    alerts: {
        answerFirst: "Bitte beantworte die aktuelle Frage, bevor du eine neue generierst!",
        noContent: "Konnte keinen Inhalt von der Seite extrahieren. Bitte versuche es erneut.",
        noQuestions: "Es konnten keine Fragen generiert werden. Bitte versuche eine andere Seite.",
        serverError: "Keine Verbindung zum Server möglich. Bitte stelle sicher, dass er läuft.",
        generateError: "Fehler beim Generieren der Fragen. Bitte versuche es erneut.",
        contentError: "Fehler beim Extrahieren des Inhalts. Bitte versuche es auf einer anderen Seite."
    }
};