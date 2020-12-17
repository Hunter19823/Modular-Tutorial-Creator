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