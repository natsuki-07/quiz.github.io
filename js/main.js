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

  
  //クイズリスト
  let quiz_list_world = [
    {q:'カナダの首都はどこでしょう？', c:['オタワ','トロント','バンクーバー']},
   {q:'チェコ共和国の通貨は？', c:['コルナ','コロナ','チェコドル']},
   {q:'Facebookの創業者は？', c:['マーク・ザッカーバーグ','ビル・ゲイツ','マット・マレンウェッグ']},
   {q:'オーストラリアの首都は？',   c:['キャンベラ','シドニー','メルボルン']},
   {q:'世界で2番目に面積の大きい国は？',   c:['カナダ','アメリカ','ブラジル']},
   {q:'2019年にNBAで初優勝したチームは？',   c:['ラプターズ','レイカーズ','ウィザーズ']},
   {q:'自由の女神は左手に何を持っている？',   c:['独立宣言書','合衆国憲法','奴隷解放宣言']},
   {q:'世界一平均寿命が長い国は日本です。では世界で2番目に平均寿命が長い国はどこ？',   c:['スイス','ドイツ','アイスランド']},
   {q:'アメリカの初代大統領は誰？',   c:['ジョージ・ワシントン','エイブラハム・リンカーン','フランクリン・ルーズベルト']},
  ];

  let quiz_list_jump = [
    {q:'鬼滅の刃 柱の人数は何人？', c:['9','8','10']},
    {q:'アイシールド21　泥門デビルバッツが一番最初に勝ったチームはどこ？', c:['恋ヶ浜キューピット','賊学カメレオンズ','王城ホワイトナイツ']},
    {q:'REBORN 白蘭と真6弔花がしているリングは？', c:['マーレリング','シモンリング','ヴァリアーリング']},
    {q:'ドラゴンボール 亀仙人の戦闘力は？', c:['139','80','250']},
    {q:'HUNTER×HUNTER ヒソカの頬のペイントで左側にあるのは何のマーク？', c:['ほし','ハート','なみだ']},
    {q:'バクマン 真城の好きな漫画は？', c:['あしたのジョー','ドラゴンボール','魁!!男塾']},
    {q:'ワンピース ワポルが食した悪魔のみは？', c:['バクバクの実','モグモグの実','ショクショクの実']},
    {q:'ワンピース 白髭海賊団の3番隊隊長は誰？', c:['ジョズ','サッチ','ビスタ']},
    {q:'NARUTO うちはイタチを殺すことを目的とした、サスケ、重吾、水月、カリンの小隊の名前は？', c:['蛇','暁','鷹']},
  ];

  let quiz_list_rock = [
    {q:'RADWIMPSの盟友であり、RADWIMPSの覆面バンドとも言われるバンドグループの名前は？', c:['味噌汁\'s','にっぽんぽん','ジェニファー山口さん']},
    {q:'名古屋出身のバンドで4月にYONFESを主催するバンドの名前は？', c:['04limited sazabys','スキマスイッチ','SPYAIR']},
    {q:'静岡県の清水区で行われる静岡を代表する野外フェスはなに？', c:['マグロック','フジロック','お茶ロック']},
    {q:'SIMが主催するフェスは？', c:['DEAD POP FESTIVAL','AIR JAM','ポルノ超特急']},
    {q:'[ALEXANDROS]のボーカルはどこの国の帰国子女？', c:['シリア','フィリピン','トルコ']},
    {q:'RADWIMPSのベースはだれ？', c:['武田祐介','桑原彰','山口智史']},
    {q:'MAN WITH A MISSIONのメンバーで唯一言葉がしゃべれるのは誰？', c:['ジャンケン・ジョニー','カミカゼ・ボーイ','スペア・リブ']},
    {q:'細美武士が一番最後に結成したバンドは？', c:['MONOEYES','ELLEGARDEN','the HIATUS']},
    {q:'マキシマムザホルモンのフェスの定番曲は？', c:['恋のスペルマ','「F」','恋のメガラバ']},
  ];
  

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