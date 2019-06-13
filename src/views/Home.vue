<template>
  <div class="home">
    <!--<VueLoadProgress ref="progress" />-->

    <h1>
      Bulls and cows online
    </h1>
    <p>Computer will guess your secret number</p>
    <div class="content">
      <h4>First optimization criterion</h4>

      <p>
        <i>Bulls and cows.</i> It's known that there is no algorithm which could solve all secret numbers using up to six turns, and there are algorithms which could solve any secret number using up to seven turns. The goal is to find algorithm which minimizes amount of secret numbers which algorithm can guess using exactly seven turns (all others should be guessed for up to six turns). Optimal algorithm guesses fifty numbers using exactly seven turns. See <a href="?bullscows_tree,,crushBullsCows">
          crushBullsCows
        </a> algorithm results.
      </p><p>
        <i>Mastermind.</i> It's known that there is no algorithm which could solve all secret numbers using up to four turns, and there are algorithms which could solve any secret number using up to five turns. The goal is to find algorithm which minimizes amount of secret numbers which algorithm can guess using exactly five turns (all others should be guessed for up to four turns). Optimal algorithm guesses 539 numbers using exactly five turns. See <a href="?bullscows_tree,,crushMastermind">
          crushMastermind
        </a> algorithm results.
      </p><h4>Second optimization criterion</h4>

      <p>
        <i>Bulls and cows.</i> The second criterion is minimize average amount of turns for guess arbitrary secret number - minimal average game length. The best average game length is 26274/5040=5.21 turns. See <a href="?bullscows_tree,,avgBullsCows">
          avgBullsCows
        </a> algorithm results.
      </p><p>
        <i>Mastermind.</i> The second criterion is minimize average amount of turns for guess arbitrary secret number - minimal average game length. The best average game length is 5626/1296=4.34 turns if it's possible to do maximum five turns. See <a href="?bullscows_tree,,avgMastermind5">
          avgMastermind5
        </a> algorithm results. Minimal average game length is 5625/1296=4.34 turns if it's possible to do any number of turns (six turns are sufficient). See <a href="?bullscows_tree,,avgMastermind">
          avgMastermind
        </a> algorithm results.
      </p><p>
        For all of the algorithms trees are builded on javascript language and count statistics of them. Also it's possible <a href="?bullscows_play">
          play online
        </a> using one of the algorithms. As well it was created <a href="bullscows/bullscows.pdf">
          article
        </a> which includes mathematical part, programming part and part with the results.
      </p>
    </div>
  </div>
</template>
