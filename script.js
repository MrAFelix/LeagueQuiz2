const correctAnswerIcon = "https://th.bing.com/th/id/R313473ddfe400e41c10c5043e010d3c7?rik=KyaZfokjcf0J0Q&riu=http%3a%2f%2fcliparts.co%2fcliparts%2frcL%2fn4q%2frcLn4qBAi.png&ehk=hlV7hKakUOSRNAh0Mi1hW7yCcBeJ41h3VroWLGfbIm0%3d&risl=&pid=ImgRaw";
const wrongAnswerIcon= "https://th.bing.com/th/id/R52eed87a18746ea010e37970da9cce26?rik=79sqzHdDjvlWlQ&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2f1%2f1%2f9%2f2%2f12065738771352376078Arnoud999_Right_or_wrong_5.svg.hi.png&ehk=bM7v7yC8SqCjMYvWCxNZIGDuMgdsL2ocNcIJJyDyBzE%3d&risl=&pid=ImgRaw";
const warningIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7WP9E3LDA10kP2Rk2enw-_kjI-iJd4kny8yH2kTrPR8hgrwtBg";

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {
    question: "1. Which champion has the highest base HP at level 1 with no items, runes, or masteries equipped?",
     optionone: "Tryndamere",
    optiontwo: "Trundle",
    optionthree: "Garen",
    optionfour: "Alistar",
    correctAnswer: "Tryndamere"
  },
  {
     question: "2. Sound effects for which champion were made using “dog food and beans inside a condom” that was “slapped against a wall”?",
    optionone: "Orianna",
    optiontwo: "Tahm Kench",
    optionthree: "Illaoi",
    optionfour: "Zac",
    correctAnswer: "Zac"
  
  },
  {
     question: "3. During the video 'Get Jinxed', the titular rogue is seen careering upward, hanging on to a set of a balloons. Before she enters shot, a single balloon appears in the shape of another League of Legends champion. Who is it?",
    optionone: "Teemo",
    optiontwo: "Ziggs",
    optionthree: "Gnar",
    optionfour: "Corki",
    correctAnswer: "Ziggs"
    
  },
  {
    question: "4. I buy a Rod of Ages (at full stacks), a Titanic Hydra, and Warmog’s Armor, but then the total bonus health of all three items is slashed by 20 percent. How much bonus health would remain?",
    optionone: "1440",
    optiontwo: "1400",
    optionthree: "1360",
    optionfour: "1480",
    correctAnswer: "1400"
  },
  {
    question: "5. Back in 2014, Riot released a batch of Pool Party skins. The login screen for the event clearly shows a champion attending the party who, rather mysteriously, still doesn’t have a Pool Party skin. Who is it?",
    optionone: "Vi",
    optiontwo: "Janna",
    optionthree: "Jinx",
    optionfour: "Yassuo",
    correctAnswer: "Jinx"
  },
 
  ];

let questionsCount = questionsArray.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		// console.log("handleStartClick() ran");
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-box').fadeIn("slow");
		renderQuizBox(); 

	});
}


function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`Score:${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}


function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    // console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}



function checkAnswer(selected){
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}


function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",correctAnswerIcon);
    $(".popup-box #popup-text").text("You are right!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",wrongAnswerIcon);
        $(".popup-box #popup-text").text(`Sorry, the correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
}


function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    // console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}


function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

function resetQuiz(){
  questionCounter = 0;
  score = 0;
}


function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    // console.log("handleStartOver() ran");
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());
