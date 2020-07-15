'use strict';
{
  let question = document.getElementById('question');
  let choices = document.getElementById('choices');
  const btn = document.querySelector('.next');
  const maru = document.getElementById('maru');
  const batu = document.getElementById('batu');
  const quizbox = document.getElementById('quizbox');
  const scorebox = document.getElementById('scorebox');
  const score = document.getElementById('score');
  const intro = document.getElementById('intro');
  const world = document.getElementById('world');
  const jump = document.getElementById('jump');
  const rock = document.getElementById('rock');
  const genre_text = document.getElementById('genre');

  //クイズジャンル選択
  function quizSelect(){
    world.addEventListener('click',()=>{
     quiz_set = quiz_list_world;
     world.disabled = true;
     rock.disabled = false;
     jump.disabled = false;
     make_quiz();
    });
    jump.addEventListener('click',()=>{
     quiz_set = quiz_list_jump;
     jump.disabled = true;
     world.disabled = false;
     rock.disabled = false;
     make_quiz();
    });
    rock.addEventListener('click',()=>{
     quiz_set = quiz_list_rock;
     jump.disabled = false;
     world.disabled = false;
     rock.disabled = true;
     make_quiz();
      });
    }
    quizSelect();

  let quiz_lists = [quiz_list_jump,quiz_list_world,quiz_list_rock];
 
  let n = Math.floor(Math.random()*quiz_lists.length);
  let quiz_list = quiz_lists[n];


  //問題の順番を並び替え
  for(let i = quiz_list.length-1;i>0;i--){
  const j = Math.floor(Math.random()*(i+1));
  [quiz_list[i],quiz_list[j]]=[quiz_list[j],quiz_list[i]];
  }

  quiz_list.length = 5; //問題数
  let quiz_set = quiz_list; //クイズをセット
  let current_num= 0; //今の問題数(-1)
  let isAnswered; //回答したかどうか 
  let point = 0; //正解数

  //各問題の表示
  question.textContent = quiz_set[current_num].q;

  //正誤判定
  function answerCheck(li){
    btn.disabled = false;
    if(isAnswered) return;
    isAnswered = true;
    if(current_num === quiz_set.length-1){
      btn.textContent = 'スコアを表示';
    }
     if(li.textContent === quiz_set[current_num].c[0]){
       li.classList.add('currect');
       maru.classList.remove('hide');
       point++;
     } else {
      li.classList.add('wrong');
      batu.classList.remove('hide');   
     }
  }

  //クイズ作成
function make_quiz(){
  isAnswered = false;
  btn.disabled = true;
  //問題のセット
  question.textContent = quiz_set[current_num].q;
  //回答の順番をランダムにする
  let shuffledChoices = random([...quiz_set[current_num].c]);
  //今の問題を消す
  while(choices.firstChild) {
    choices.removeChild(choices.firstChild);
  }

  //選択肢作成
  shuffledChoices.forEach(choice => {
   const li = document.createElement('li');
   li.textContent = choice;
   choices.appendChild(li);

   li.addEventListener('click',()=>{
    answerCheck(li);
     });
  });

  //選択肢をランダム
  function random(array){
    for(let i = array.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [array[j],array[i]] = [array[i],array[j]];
    }
    return array;
  }
}

make_quiz();

//次の問題へを押したとき
btn.addEventListener('click',()=>{
  if(current_num === quiz_set.length-1){
      quizbox.classList.add('hide');
      scorebox.classList.remove('hide');
      score.textContent = `${quiz_set.length}問中${point}問正解`;
      intro.textContent = '結果発表!!';

      world.disabled = true;
      jump.disabled = true;
      rock.disabled = true;
  }
  genre_text.textContent = "";
  current_num++;
  make_quiz();
  if(!maru.classList.contains('hide')){
    btn.disabled = false;
    maru.classList.add('hide');
  }
  if(!batu.classList.contains('hide')){
    batu.classList.add('hide');
  }
});



}