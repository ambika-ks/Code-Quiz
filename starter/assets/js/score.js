var score=0;
for (var i=0;i<questions.length;i++){
    var response=this.prompt(questions[i].prompt)
    if (response==questions[i].answer){
        score++;
        alert("Correct");
    }
    else{
        alert("WRONG");
    }
}
 alert(`Your score : ${score}`);