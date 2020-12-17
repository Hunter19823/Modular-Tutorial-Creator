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
    constructor(value, isSolution){
        this.value = value;
        this.correct = isSolution;
        if(isSolution){
            this.message = 'Correct!';
            this.check = function(){
                this.div.className = 'correct';
                this.span.className = 'correct';
                this.span.innerHTML = this.message;
            };
        }else{
            this.message = 'Incorrect!';
            this.check = function(){
                this.div.className = 'incorrect';
                this.span.className = 'incorrect';
                this.span.innerHTML = this.message;
            };
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
        this.hide();
        return div;
    }
    hide(){
        this.div.className = '';
        this.span.className = '';
    }
    setMessage(message){
        this.message = message;
        return this;
    }
    onCheck(onCheckFunction){
        this.check = onCheckFunction;
        return this;
    }
    set(isCorrect){
        this.correct = isCorrect;
        return this;
    }
}

class MultipleChoiceQuestion{
    constructor(question, options){
        this.question = question;
        this.options = [];
        for(let i=0; i<options.length;i++){
            this.options.push(new Option(options[i],false));
        }
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
                this.options[i-1].check();
                // if(this.options[i-1].correct)
            }else{
                this.options[i-1].hide();
            }
        }
    }
    addOption(value){
        let option = new Option(value,false);
        this.options.push(option);
        return option;
    }
    addOption(value,isCorrect){
        let option = new Option(value,isCorrect);
        this.options.push(option);
        return option;
    }
    addSolution(solution){
        return this.addOption(solution,true);
    }
    
}
function checkQuestion(button){
    questions[button.srcElement.parentElement.id].check();
}