#!/usr/bin/env node

import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';

let totalCorrect = 0;
let playerName;

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

async function askQuestion(question, answers, correctAnswerIndex) {
  const options = answers.map((answer) => ({
    value: answer,
    label: answer,
  }));

  const answer = await p.select({
    message: question,
    initialValue: answers[0],
    options,
  });

  const s = p.spinner();
  s.start();
  await setTimeout(1000);
  s.stop();

  if (answer === answers[correctAnswerIndex]) {
    totalCorrect++;
  }
}

class Question {
  constructor(question, answersArray, correctAnswerIndex) {
    this.question = question;
    this.answersArray = answersArray;
    this.correctAnswerIndex = correctAnswerIndex;
  }
}

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants To Be A JavaScript Millionaire? \n'
  );

  await setTimeout(2000);
  rainbowTitle.stop();
}

async function resultMassage() {
  const rainbowTitle = chalkAnimation.rainbow(
    'You are one the way to become To Be A JavaScript Millionaire? \n'
  );

  await setTimeout(2000);
  rainbowTitle.stop();
}

async function main() {
  console.clear();
  await setTimeout(1000);

  p.intro(
    `${color.bgMagenta(
      color.black(
        ' Welcome. Let us find out how much of a CLI expert you REALLY are. '
      )
    )}`
  );

  await welcome();
  await askName();

  const allQuestions = [
    new Question(
      '1) What is the output of console.log(typeof null) ?',
      ['object', 'null', 'undefined', 'boolean'],
      0
    ),

    new Question(
      '2) Which of the following is NOT a JavaScript data type?',
      ['String', 'Number', 'Character', 'Boolean'],
      2
    ),

    new Question(
      '3) What will be logged here? console.log(0.1 + 0.2 === 0.3);',
      ['true', 'false', 'NaN', 'undefined'],
      1
    ),

    new Question(
      "4) 'JS is a high-level, single-threaded, garbage-collected,\n" +
        'interpreted (or just-in-time compiled), prototype-based,\n' +
        "multi-paradigm, dynamic language with a ____ event loop'\n",
      ['blocking', 'non-blocking', 'synchronous', 'multi-threaded'],
      1
    ),

    new Question(
      '5) Which of the following is NOT a primitive type?',
      ['object', 'boolean', 'number', 'null'],
      0
    ),

    new Question(
      '6) Which of these is NOT a TypeScript feature?',
      ['Static typing', 'Interfaces', 'Classes', 'Manual memory management'],
      3
    ),

    new Question(
      '7) Which keyword is used to create a subclass?',
      ['extends', 'inherit', 'implements', 'super'],
      0
    ),

    new Question(
      '8) What is x? var x = 1_1 + "1" + Number(1)\n',
      ['4', '"4"', '"1111"', '69420'],
      2
    ),

    new Question(
      '9) Which operator is used to compare both value and type?',
      ['==', '===', '=', '!=='],
      1
    ),

    new Question(
      '10) JavaScript was created in 10 days then released on',
      ['May 23rd, 1995', 'Nov 24th, 1995', 'Dec 4th, 1995', 'Dec 17, 1996'],
      2
    ),
  ];

  const readyToPlay = await p.select({
    message: 'No cheating. 10 questions. Results at the end. Ready to play?',
    initialValue: 'Yes',
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  });

  if (readyToPlay === 'Yes') {
    for (const q of allQuestions) {
      await askQuestion(q.question, q.answersArray, q.correctAnswerIndex);
    }

    p.outro(
      `${color.bgMagenta(
        color.black(`You got ${totalCorrect} questions correct!`)
      )}`
    );

    if (totalCorrect === 10) {
      const s = p.spinner();
      s.start('Generating secret message...');
      await setTimeout(5000);
      s.stop();
      p.outro(
        `${color.bgMagenta(
          color.black(`Congrats , ${playerName} ! $ 1 , 0 0 0 , 0 0 0`)
        )}`
      );
      await resultMassage();
    } else {
      const s = p.spinner();
      s.start();
      await setTimeout(3000);
      s.stop();
      p.outro(
        `${color.bgMagenta(
          color.black(
            `You need 10/10 correct to unlock the secret message. Try again.`
          )
        )}`
      );
    }
  } else {
    p.outro(`${color.bgMagenta(color.black(`Ok. Bye!`))}`);
  }
}

main().catch(console.error);
