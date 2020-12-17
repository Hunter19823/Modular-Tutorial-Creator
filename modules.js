const QUESTIONS = {};
const QuestionsElement = document.getElementById('Questions');
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
class Option{
    constructor(key = 'default', isSolution=false, message, check){
        if(typeof key == 'string'){
            this.value = key;
            this.correct = isSolution;
            this.defaultLogic();
            if(typeof check === 'function'){
                this.check = check;
            }
            if(typeof message !== 'undefined'){
                this.message = message;
            }
        }else{
            this.value = typeof key['value'] !== 'undefined' ? key['value'] : 'Default';
            this.correct = typeof key['correct'] === 'boolean' ? key['correct'] : false;
            this.defaultLogic();
            if(typeof key['check'] === 'function'){
                this.check = key['check'];
            }
            if(typeof key['hide'] === 'function'){
                this.check = key['hide'];
            }
            if(typeof key['message'] !== 'undefined'){
                this.message = key['message'];
            }
            
        }
    }
    defaultLogic(){
        if(this.correct == true){
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
    setCorrect(){
        this.correct = true;
        return this;
    }
    remove(){
        this.div.remove();
        if(this['seperator']){
            this.seperator.remove();
        }
    }
}

class MultipleChoiceQuestion{
    constructor(key = 'Default Question', options = []){
        if(typeof key == 'string'){
            this.question = key;
            this.options = [];
            for(let i=0; i<options.length;i++){
                if(options[i] instanceof Option){
                    this.options.push(options[i]);
                }else{
                    this.options.push(new Option(options[i],false));
                }
            }
        }else{
            this.question = typeof key['question'] !== 'undefined' ? key['question'] : 'Default Question';
            this.options = [];
            if(typeof key['options'] !== 'undefined'){
                for(let i=0; i<key['options'].length;i++){
                    if(key['options'][i] instanceof Option){
                        this.options.push(key['options'][i]);
                    }else{
                        this.options.push(new Option(key['options'][i]));
                    }
                }
            }
        }
    }
    create(){
        let title, description, index, item, button;
        this.element = document.createElement('div');
        this.element.id = 'Question-'+(Object.size(QUESTIONS)+1);
        QUESTIONS[this.element.id] = this
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
            item.seperator = document.createElement('hr');
            this.element.appendChild(item.seperator);
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
            if(this.options[i-1] !== undefined){
                option = document.getElementById(this.element.id+'-option-'+i);
                if(!option.checked){
                    this.options[i-1].hide();
                }
            }
        }
        for(i=1; i<=this.options.length;i++){
            if(this.options[i-1] !== undefined){
                option = document.getElementById(this.element.id+'-option-'+i);
                if(option.checked){
                    this.options[i-1].check();
                }
            }
        }
    }
    addOption(value,isCorrect = false){
        let option = new Option(value,isCorrect);
        this.options.push(option);
        return option;
    }
    addSolution(solution){
        return this.addOption(solution,true);
    }
    setSolution(index){
        let option = this.getOption(index);
        if(option){
            option.setCorrect();
            option.defaultLogic();
        }
    }
    getOption(index){
        if((index>=0 && index<this.options.length)){
            return this.options[index];
        }
    }
    removeOption(index){
        let option = this.getOption(index);
        if(option){
            option.remove();
            delete this.options[index];
        }
    }
    remove(){
        let id = this.element.id;
        this.element.remove();
        delete QUESTIONS[id];
    }
    
}
function checkQuestion(button){
    QUESTIONS[button.srcElement.parentElement.id].check();
}