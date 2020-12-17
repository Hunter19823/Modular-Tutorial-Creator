const questions = {};
const QuestionsElement = document.getElementById('Questions');
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

class Option{
    constructor(value){
        this.value = value;
        this.correctMessage = 'Correct!';
        this.correct = function(){
            this.div.className = 'correct';
            this.span.className = 'correct';
            this.span.innerHTML = this.correctMessage;
        };
        this.incorrectMessage = 'Incorrect!';
        this.incorrect = function(){
            this.div.className = 'incorrect';
            this.span.className = 'incorrect';
            this.span.innerHTML = this.incorrectMessage;
        };
        this.hide = function(){
            this.div.className = '';
            this.span.className = '';
        }
    }
    create(id, index){
        this.id = id;
        this.index = index;
        let div, label, input, span;
        div         = document.createElement('div');
        div.id      = id+"-block-"+(index);
        
        label       = document.createElement('label');
        label.for   = id+'-option-'+(index);
        
        input       = document.createElement('input');
        input.type  = 'radio';
        input.name  = 'option';
        input.value = this.value;
        input.id    = id+'-option-'+(index);
        
        span        = document.createElement('span');
        span.id     = id+'-result-'+(index);
        
        label.appendChild(input);
        label.innerHTML += this.value;
        div.appendChild(label);
        div.appendChild(document.createElement('br'));
        div.appendChild(span);
        this.div = div;
        this.label = label;
        this.span = span;
        this.input = input;
        return div;
    }
    setIncorrectMessage(message){
        this.incorrectMessage = message;
        return this;
    }
    setCorrectMessage(message){
        this.correctMessage = message;
        return this;
    }
}

class MultipleChoiceQuestion{
    constructor(question, options, solutions){
        this.question = question;
        this.options = [];
        for(let i=0; i<options.length;i++){
            this.options.push(new Option(options[i]));
        }
        this.solutions = solutions;
    }
    
    create(){
        let title, description, index, item, button;
        this.element = document.createElement('div');
        this.element.id = 'Question-'+(Object.size(questions)+1);
        questions[this.element.id] = this
        QuestionsElement.appendChild(this.element);
        title = document.createElement('h3');
        title.innerText = this.question;
        this.element.appendChild(title);
        description = document.createElement('p');
        description.innerText = 'Choose 1 answer.';
        this.element.appendChild(description);
        this.element.appendChild(document.createElement('hr'));
        for(index=0; index<this.options.length; index++){
            item = this.options[index];
            this.element.appendChild(item.create(this.element.id,index+1));
            this.element.appendChild(document.createElement('hr'));
        }
        
        button = document.createElement('button');
        button.type = 'button';
        button.innerText = 'Check';
        button.onclick = function(button){checkQuestion(button)};
        this.element.appendChild(button);
    }
    
    check(){
        let i,option;
        for(i=1; i<=this.options.length;i++){
            option = document.getElementById(this.element.id+'-option-'+i);
            if(option.checked){
                if(this.solutions.includes(option.value)){
                    this.options[i-1].correct();
                }else{
                    this.options[i-1].incorrect();
                }
            }else{
                this.options[i-1].div.className = '';
                this.options[i-1].span.className = '';
            }
        }
    }
    
    addOption(value){
        let option = new Option(value);
        this.options.push(option);
        return option;
    }
    addSolution(solution){
        this.solutions.push(solution);
        return this;
    }
    
}
function checkQuestion(button){
    questions[button.srcElement.parentElement.id].check();
}