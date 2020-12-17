let q;
q = new MultipleChoiceQuestion(
'True or False, Expression 2 is an Object Oriented Language.',
['True','False']);
q.setSolution(0);
q.create();

q = new MultipleChoiceQuestion(
'Which segment of code will print Hello World to the player\'s chat?',
['println("Hello World");','log("Hello World")', 'Print(Hello World)', new Option('print("Hello World")',true), 'Print("Hello World")','print(Hello World)']);

q.create();

q = new MultipleChoiceQuestion(
'Which of the following code segmets represents a maximum brightness blue?');
q.addOption('vec(255,0,0)').setMessage('Incorrect!<br>That was the correct syntax, but not the correct color. That color represents the color Red.');
q.addOption('vec(0,255,0)').setMessage('Incorrect!<br>That was the correct syntax, but not the correct color. That color represents the color Green.');
q.addOption('vec(256,0,0)').setMessage('Incorrect!<br>That was the correct syntax, and not the correct color, and that represents the minimum intensity.');
q.addOption('vec(0,256,0)').setMessage('Incorrect!<br>That was the correct syntax, and not the correct color, and that represents the minimum intensity.');
q.addOption('vec(0,0,256)').setMessage('Incorrect!<br>That was the correct syntax, and that was the correct color, but that represents the minimum intensity, not the maximum.');
q.addOption('vec(0,0,255)',true).setMessage('Correct!<br>That was the correct syntax, and the correct color.');
q.create();

q = new MultipleChoiceQuestion({
    question:'What data type should you use if you want to efficiently check if someone is on a whitelist?',
    options: [
        'Vector',
        {
            value: 'Table',
            message: '<h1>Correct!</h1><br>A Table uses Strings as a key, allowing you to store an entity with the key being their name, or steamID, etc...',
            correct: true
        },
        {
            value: 'Array',
            message: 'Incorrect!<br>An Array uses whole numbers as the key, requiring you to either keep track of a player\'s index in the array. Or by looping through the entirety of the array, which would be very costly and inefficient.',
        },
        'Ranger',
        {
            value:'Sandwitch',
            message: 'Oops!<br>This choice isn\'t supposed to be here!',
            check: function(){
                this.div.className = 'confused';
                this.span.className = 'confused';
                this.span.innerHTML = this.message;
            },
            hide: function(){
                QUESTIONS[this.id].removeOption(4);
            }
        }
    ]
});
q.getOption(0).setMessage('Vectors are for storing xyz coordinates, not entities.');
q.getOption(3).setMessage('Rangers are not meant for storing new information, but rather gathering existing data from the world.');
q.create();