export default {
    title: "Quiz de Lecture Active",
    buttons: {
        startQuiz: "Commencer le Quiz",
        chooseCategory: "Choisir une Catégorie",
        settings: "Paramètres",
        goBack: "Retour",
        generateAgain: "Générer à Nouveau",
        finish: "Terminer",
        tryAgain: "Réessayer"
    },
    settings: {
        title: "Paramètres",
        language: "Langue",
        defaultQuestions: "Questions par Défaut",
        trueFalseQuestions: "Questions Vrai/Faux",
        typeAnswerQuestions: "Questions à Réponse Écrite",
        timeLimit: "Limite de Temps",
        minutes: "Minutes",
        seconds: "Secondes",
        difficulty: {
            easy: "Facile",
            medium: "Moyen",
            hard: "Difficile"
        }
    },
    quiz: {
        title: "Quiz",
        question: "Question",
        results: "Résultats du Quiz",
        score: "Vous avez obtenu {correct} sur {total} !",
        typeAnswer: "Tapez votre réponse ici...",
        submit: "Envoyer",
        correct: "✓ Correct !",
        incorrect: "✗ Incorrect. La bonne réponse était : {answer}"
    },
    categories: {
        title: "Sélectionner une Catégorie",
        noCategories: "Aucune catégorie disponible"
    },
    alerts: {
        answerFirst: "Veuillez répondre à la question actuelle avant d'en générer une nouvelle !",
        noContent: "Impossible d'extraire le contenu de la page. Veuillez réessayer.",
        noQuestions: "Aucune question n'a pu être générée. Veuillez essayer une autre page.",
        serverError: "Impossible de se connecter au serveur. Veuillez vérifier qu'il est en cours d'exécution.",
        generateError: "Une erreur s'est produite lors de la génération des questions. Veuillez réessayer.",
        contentError: "Échec de l'extraction du contenu. Veuillez réessayer sur une autre page."
    }
};