<template>
  <div id="bullscows">
    <h1>Bulls and Cows online</h1>
    <GameOptions />
    <table class="options-helpers">
      <thead>
        <tr>
          <th>
            <span>Game Helpers</span>
          </th>

          <th>
            <span />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>Your secret number <br> <small>(put number your secret number)</small></span>
          </td>
          <td>
            <label for="secretNumber" />
            <input
              id="secretNumber"
              v-model="secretNumber"
              :maxlength="4"
              type="text"
              @keypress="isNumber($event)"
            >
            <input
              type="button"
              value="RAND"
              @click="secretNumber = makeArray(4, true).join('')"
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>AI's guessed number <br> <small>field changes automatically</small></span>
          </td>
          <td>
            <input
              id="tryNumber"
              v-model="tryNumber"
              :maxlength="4"
              type="text"
              disabled
              @keypress="isNumber($event)"
            >
          </td>
        </tr>
        <tr>
          <td>
            Count of Bulls & Cows in the Secret number
          </td>
          <td>
            [Bulls : <strong>{{ uresp().bulls }}</strong> ][ Cows : <strong>{{ uresp().cows }}</strong> ]
          </td>
        </tr>
        <tr>
          <td>
            <span>Start new Game</span>
          </td>
          <td>
            <input
              type="button"
              value="NEW GAME"
              @click="secretNumber = makeArray(4, true).join(''); gAlgorithmIndex = getRandom(5); resetClick()"
            >
          </td>
        </tr>
      </tbody>
    </table>

    <h3>Enter number of bulls and cows</h3>

    <table id="tbl">
      <thead style="font-weight: bold">
        <tr>
          <th>Itterations</th>
          <th>AI's guess</th>
          <th>How many bulls?</th>
          <th>How many cows?</th>
          <th>Submit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in nRows"
          :key="index"
        >
          <td>Turn #{{ item }} – </td>
          <td>{{ gGuess[index] }}</td>
          <td>
            <div class="divbc">
              <input
                id="i20"
                :key="'bulls-'+index"
                v-model="bullsAmount[item]"
                :class="item"
                type="number"
                min="0"
                max="4"
                step="1"
                placeholder="Bulls"
                :disabled="item !== nRows"
                @keypress="isNumber($event)"
                @keyup.enter="fclickb(item+1)"
              >
            </div>
          </td>
          <td>
            <div class="divbc">
              <input
                id="i21"
                :key="'cows-'+index"
                v-model="cowsAmount[item]"
                type="number"
                placeholder="Cows"
                min="0"
                max="4"
                step="1"
                :disabled="item !== nRows"
                @keypress="isNumber($event)"
                @keyup.enter="fclickb(item+1)"
              >
            </div>
          </td>
          <td align="left">
            [{{ bullsAmount[item] }} | {{ cowsAmount[item] }}]
            <input
              v-if="index+1 === nRows"
              type="button"
              size="2"
              value="Enter"
              :disabled="!isSubmitable || gHasError.isHas"
              @click="fclickb(item+1)"
            >
          </td>
        </tr>
      </tbody>
    </table>
    <span v-if="lastTurn === true">
      Your number is {{ guessedNumber }}! <input
        id="prestart"
        type="button"
        value="Start new Game"
        @click="fclickb()"
      >
    </span>
    <span v-if="gHasError.isHas">
      {{ gHasError.errorText }} <input
        id="prestart"
        type="button"
        value="Start new Game"
        @click="fclickb()"
      >
    </span>
  </div>
</template>


<script>
//import Permutations from '@/components/Permutations';
import GameOptions from '@/components/GameOptions.vue';

import { debuglog } from 'util';
import { constants } from 'crypto';

export default {
    name: 'App',
    components: {
        GameOptions
    },
    data () {
        return {
            bullsAmount: [ 0,0 ],
            cowsAmount : [ 0,0 ],

            gHasError  : {            //Error object
                isHas    : false,
                errorText: ''
            },
            
            gGuess       : [],        // Array of all gueses AI made
            lastTurn     : false,     // 
            nRows        : 1,         // Equals to times we submited BULLS | COWS 
            guessedNumber: 0,         // Number that AI send to you to vlaidate if it's a secret number

            gId            : 0,        //current id, using during solving a user number
            gLayer         : 1,        //current layer
            gTurn          : [],       //array of turns, SIZE 7
            gResponse      : [],       //array of responses, SIZE
            gStatisticsType: 0,        //0-dont show statistics, 1-show statistics for current algorithm, 2-show statistics for all algorithms
            
            secretNumber: '1234',     // Your secret number, you want AI to guess (modet of 'Your secret number ')
            tryNumber   : '1234'      // Number, AI will start with
        };
    },
    computed: {
        gAlgorithmIndex: {
            get () {
                return this.$store.state.gAlgorithmIndex; //gAlgorithmIndex setted in store.js
            },
            set (value) {
                this.$store.commit('SET_INDEX' , value);
            }
        },
        gRandomness: {
            get () {
                return this.$store.state.gRandomness;
            },
            set (value) {
                this.$store.commit('SET_RAND' , value);
            }
        },
        n () {
            return [ this.secretNumber, this.tryNumber ];
        },
        isSubmitable () {
            //debugger;
            const n = this.gLayer-1;
            const b = parseInt(this.bullsAmount[n]); const c = parseInt(this.cowsAmount[n]);
            if (isNaN(b) || isNaN(c) || b<0 || b>4 || c<0 || c>4) {
                return false;
            }

            return true;
        },
        gRandomDigits () {return this.makeArray(this.gDigits, this.gRandomness);},
        gRandomPositions () {return this.makeArray(4, this.gRandomness);},
    },
    mounted () {
        this.fclickb();
    },
    
    methods: {
        checkDuplicate (str) {
            const strArray = [ ...String(str) ];
            return strArray.length === (new Set(str)).size;
        },
        isNumber (evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        getRandom (max) {
            return Math.floor(Math.random() * max);
        },
        
        capitalize (s) {
            return s.substr(0, 1).toUpperCase() + s.substr(1);
        },
        
        makeArray (n, random) {
            const a = Array.from(Array(n), (x, i) => i);
            
            if (random) {
                for (let i = 0; i < n - 1; i++) {
                    let j = this.getRandom(n - i);
                    if (j === 0) {
                        continue;
                    }
                    j += i;
                    [ a[i], a[j] ] = [ a[j], a[i] ];
                }
            }
            return a;
        },
        //
        
        uresp () {
            const _ = this;
            if (_.secretNumber.length !== 4 || _.tryNumber.length !== 4) {
                //_.gHasError = true;
                return `Please enter 4 digits`;
            }
            const i = _.getResponse(parseInt(_.n[0], 10), parseInt(_.n[1], 10));
            return {
                bulls: _.BULL(i),
                cows: _.COW(i)
            };
        },
        applyRandom (n) {
            const _ = this;
            const r = [];
            const rr = new Array(4);

            //rr.reduce( (a, c, i) => a[],[])

            for (let i = 0; i < 4; i++) {
                r[_.gRandomPositions[i]] = _.gRandomDigits[n.charCodeAt(i) - _.ZERO_CODE];
            }

            return r.join('');  
        },
        
        resetClick () {
            this.nRows = 1;    //global variable shows how many turns did we do
            this.fclickb();
        },

        isFirstRound (rowNum) {
            const _ = this;
            _.gId             = 0;
            _.gLayer          = 1;
            _.gHasError.isHas = false;
            _.gGuess          = [];
            //_.makeRandom();
            //_.secretNumber = _.numberToString(_.gArray[_.getRandom(_.gArray.length)]);
            
        },

        fclickb (rowNum) {
            const _ = this;
            let i; let j; 
            let n; 
            let response;
            let row;
            let lastTurn = false;
            // debugger
            if (this.gSameAllowed === false) {
                if (!this.checkDuplicate(this.secretNumber)) {
                    _.gHasError.isHas = true;
                    _.gHasError.errorText = 'Same numbers are not allowed for this algorithm';
                    return; 
                }
            }

            if (rowNum === undefined) {
                this. isFirstRound(rowNum);
            }

            else { 
                n = [ parseInt(_.bullsAmount[rowNum-1]), parseInt(_.cowsAmount[rowNum-1]) ];

                response = _.BC(n[0], n[1]);
                if (n[0] < 0 || n[0] > 4 || n[1] < 0 || n[1] > 4 || _.findER(response) === -1) {
                    //showError(2);
                    _.gHasError.isHas = true;
                    _.gHasError.errorText = 'Wrong amount of bulls or Cows';
                    return; 
                }

                if (response === _.BC40) {
                    //check that this turn corresponds with all prev turns&answers
                    for (i = 0; i < _.gLayer - 2; i++) {
                        if (_.getResponse(_.gTurn[_.gLayer - 2], _.gTurn[i]) !== _.gResponse[i]) {
                            //showError(2);
                            _.gHasError.isHas = true;
                            _.gHasError.errorText = 'This answer isn\'t possible';
                            return;
                        }
                    }
                    _.resetClick();
                    return;
                }

                i = _.gTree[_.gId].child[response];

                if (i === 0) {
                    //showError(2);
                    _.gHasError.isHas = true;
                    _.gHasError.errorText = 'This answer isn\'t possible';
                    return; 
                }
                _.gId = i;
                if (_.gTree[_.gId].child === undefined) {
                    lastTurn = true;
                }

            }
            
            _.nRows = _.gLayer; 

            n = new Array(lastTurn ? 1 : 4);
            i = _.applyRandom(_.numberToString(_.gTree[_.gId].turn));

            _.tryNumber = i;
            _.gGuess.push(i);

            if (lastTurn) 
            {return _.guessedNumber = i;}
            
            else {
                n[1] = i;
                // left cell
                _.gTurn[_.gLayer - 1] = _.numberToString(_.gTree[_.gId].turn);
                _.gResponse[_.gLayer - 2] = response;
            }
            _.gLayer++;
        }
    }
};
</script>

