const questions = [
	{
		question: "Kas ir augstākais kalns Latvijā?",
		answers: [
			{text: "Sirdskalns", correct: false},
			{text: "Gaiziņkalns", correct: true},
			{text: "Dzegužkalns", correct: false},
			{text: "Riekstukalns", correct: false},
		]
	},
	{
		question: "Kas ir garākā upe Latvijā?",
		answers: [
			{text: "Gauja", correct: true},
			{text: "Daugava", correct: false},
			{text: "Venta", correct: false},
			{text: "Lielupe", correct: false},
		]
	},
	{
		question: "Kas ir dziļākais ezers latvijā?",
		answers: [
			{text: "Garais ezers", correct: false},
			{text: "Ušurs", correct: false},
			{text: "Dziļezers", correct: false},
			{text: "Drīdzis", correct: true},
		]
	},
	{
		question: "Ar kuru Latvijas robežvalsti Latvijai ir visgarākā robeža?",
		answers: [
			{text: "Lietuvu", correct: true},
			{text: "Igauniju", correct: false},
			{text: "Krieviju", correct: false},
			{text: "Baltkrieviju", correct: false},
		]
	},
	{
		question: "Cik plata ir Ventas Rumba?",
		answers: [
			{text: "235 m", correct: false},
			{text: "282 m", correct: false},
			{text: "249 m", correct: true},
			{text: "301 m", correct: false},
		]
	},
		{
		question: "Kādā klimata joslā atrodas Latvija?",
		answers: [
			{text: "Tropu", correct: false},
			{text: "Mērenā", correct: true},
			{text: "Ekvatoriālā", correct: false},
			{text: "Arktiskā un antarkstiskā", correct: false},
		]
	},
		{
		question: "Kāds ir Latvijas robežas kopējais garums?",
		answers: [
			{text: "1894 km", correct: false},
			{text: "1931 km", correct: false},
			{text: "1728 km", correct: false},
			{text: "1836 km", correct: true},
		]
	},
		{
		question: "Kas ir lielākais ezers Latvijas?",
		answers: [
			{text: "Rāznas ezers", correct: false},
			{text: "Lubāns", correct: true},
			{text: "Engures ezers", correct: false},
			{text: "Burtnieks", correct: false},
		]
	},
		{
		question: "Kas ir Latvijas galvaspilsēta?",
		answers: [
			{text: "Rīga", correct: true},
			{text: "Viļņa", correct: false},
			{text: "Tallina", correct: false},
			{text: "Maskava", correct: false},
		]
	},
		{
		question: "Kas ir vecākā pilsēta Latvija?",
		answers: [
			{text: "Rīga", correct: false},
			{text: "Liepāja", correct: false},
			{text: "Ogre", correct: false},
			{text: "Ludza", correct: true},
		]
	}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Nākamais";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.
	question;
	
	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	}
	else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState()
	questionElement.innerHTML = `Tu pareizi atbildēji ${score} no ${questions.length} jautājumiem!`;
	nextButton.innerHTML = "Spēlēt vēlreiz!"
	nextButton.style.display = "block";
}

function handleNextButton() {
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length) {
		showQuestion();
	}
	else {
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if(currentQuestionIndex < questions.length) {
		handleNextButton();
	}
	else {
		startQuiz();
	}
});

startQuiz();