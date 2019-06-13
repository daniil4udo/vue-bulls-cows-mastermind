<template>
  <div class="tree">
    <h1 align="center">
      {{ oName[gAlgorithmIndex] | amendTheSentence }} Algorithm Statistics
    </h1>
    <h2>Description of statistics table</h2>
    <p>
      The statistics table shows how many secret numbers algorithm can guess using exactly 1,2, 3... turns. This is shown in last column total. In addition secret numbers are split by very first response (since that very first turn is the same). Consider column of table which corresponds of very first response 0.1 (0 bulls and 1 cow).
    </p>
    <p>
      Total amount of secret numbers with response 0.1 on very first turn is <strong>{{ responseNumbers[1] }}</strong>. Total amount of turns to guess all recent numbers is <strong>{{ turns[1] }}</strong>.
    </p>
    <p>
      The algorithm {{ oName[gAlgorithmIndex] | amendTheSentence }},in the range from 0 to <span v-text="gDigits-1" />  guesses {{ layers[2][1] }} secret numbers for exactly three turns, {{ layers[3][1] }} secret numbers for exactly four turns, {{ layers[4][1] }} secret numbers for exactly five turns etc. 
    </p>
    <p>
      Average game length is {{ roundNumber(turns[1] / responseNumbers[1]) }} = {{ turns[1] }} / {{ responseNumbers[1] }}.
    </p>
    <h2>
      Overall description of the table
    </h2>
    <p>
      Upper line - algorithm - {{ oName[gAlgorithmIndex] | amendTheSentence }}; Nodes - {{ nodes }}; Turns from recent moves - {{ recentMovesTurns }}% shows algorithm name number of tree nodes and percent of turns from recent numbers.
    </p>
    <p>
      Last column total shows count of numbers which algorithm guesses for exactly 1, 2, etc turns. It guesses:
    </p>
    <ul>
      <li>
        <b>{{ layerTotal[1] }}</b> number for one turn
      </li><li>
        <b>{{ layerTotal[2] }}</b> for two turns
      </li><li>
        <b>{{ layerTotal[3] }}</b> for three turns
      </li><li>
        ...
      </li><li>
        <b>{{ layerTotal[maxLayers] }}</b> for {{ maxLayers }} turns
      </li>
    </ul><ul>
      <li>
        {{ totalNumbers }} - total amount of secret numbers
      </li><li>
        {{ totalTurns }} - total amount of turns to guess all possible secret numbers
      </li><li>
        {{ roundNumber(totalTurns / totalNumbers) }} - overall average number of turns for guess secret number.
      </li>
    </ul>
    <GameOptions />

    <div id="tree">
      <table
        :id="'ts'+oName[gAlgorithmIndex]"
        width="100%"
        class="single"
      >
        <tbody>
          <tr>
            <th
              align="center"
              :colspan="eRespLength + 3"
            >
              Algorithm - {{ oName[gAlgorithmIndex] }}; Nodes - {{ nodes }} Turns from recent moves - {{ recentMovesTurns }}%
            </th>
          </tr>

          <tr>
            <td /><td />
            <th
              :colspan="eRespLength"
              align="center"
            >
              first turn response
            </th>
            <th
              rowspan="2"
              align="center"
            >
              Total
            </th>
          </tr>

          <tr>
            <td /><td />
            <th
              v-for=" i in eRespLength"
              :key="i"
              align="center"
            >
              B{{ Math.floor(i / 5) }}.C{{ (i % 5) }}
            </th>
          </tr>
          <!--gAlgorithmIndex < 2 ? 7 : (gAlgorithmIndex === 4 ? 6 : 5)"-->
          <tr
            v-for="(layer, index) of layers.length" 
            :key="layer"
          >
            <th
              v-if="layer === 1"
              :rowspan="layers.length"
              align="center"
            >
              l<br>a<br>y<br>e<br>r
            </th>
          
            <th
              id="layerId"
              align="center"
            >
              {{ layer }}
            </th>
          
            <td
              v-for="(layerVal, layerInd) in layers[index]"
              id="layerValue"
              :key="layerInd"
              align="right"
            >
              {{ layerVal }}
            </td>
          
            <td
              id="layerTotal"
              align="right"
            >
              <b> {{ layerTotal[layer] }} </b>
            </td>
          </tr>

          <tr>
            <th
              colspan="2"
              align="center"
            >
              total<br>numbers
            </th>
            <td
              v-for="number in responseNumbers"
              :key="number"
              align="right"
            >
              <strong>{{ number }}</strong>
            </td>
          
            <td align="right">
              {{ totalNumbers }}
            </td>
          </tr>
        
          <tr>
            <th
              colspan="2"
              align="center"
            >
              average
            </th>
          
            <td
              v-for="(avarage, ind) in avarages"
              :key="ind"
              align="right"
            >
              <strong>{{ avarage }} </strong>
            </td>
            <td align="right">
              {{ totalAvarage }}
            </td>
          </tr>

          <tr>
            <th
              colspan="2"
              align="center"
            >
              total<br>turns
            </th>
          
            <td
              v-for="turn in turns"
              :key="turn"
              align="right"
            >
              <strong>{{ turn }}</strong>
            </td>

            <td align="right">
              {{ totalTurns }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--
    <p>
      layerTotal -  {{ layerTotal }}
    </p>
    <p>
      stats - {{ stat }}
    </p>
    <p>
      layers - {{ layers }}
    </p>
    <p> 
      responseNumbers - {{ responseNumbers }}
    </p>

    <p> 
      totalNumbers - {{ totalNumbers }}
    </p>
    
    <p>
      turns - {{ turns }}
    </p>
    totalTurns - {{ totalTurns }}
    <p />
    <p>
      avarages - {{ avarages }}
    </p>
    <p>
      totalAvarage -  {{ totalAvarage }}
    </p> -->
  </div>
</template>

<script>
import GameOptions from '@/components/GameOptions.vue';
import { mapMutations, mapState } from 'vuex';

export default {
    components: {
        GameOptions
    },
    data () {
        return {
            //gAlgorithmIndex: 0,
            stats: {}
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
        eRespLength () {
            Object.assign(this.stats, { eRespLength: this.ENUM_RESPONSE.length  } );
            return this.ENUM_RESPONSE.length;
        },
        maxLayers () {
            return this.layers.length;
        },
        stat () {
            return this.getStatistics()[0];
        },
        nodes () {
            const nodes = this.gTree.length;
            Object.assign(this.stats, { nodes: nodes } );
            return nodes;
        },
        recentMovesTurns () {
            const recentMovesTurns = this.roundNumber(this.gArray.length * 100 / this.nodes, 3);
            Object.assign(this.stats, { recentMovesTurns: recentMovesTurns } );
            return recentMovesTurns;
        },
        //response statistics
        layers () { //[ [], [], [], ... ]
            let layer; const pt = [];
            for (let r0 = 0, layer = 1; layer < 8; layer++) {
                const ptLayer = [];
                if (this.layerTotal[layer] === 0) {
                    break;
                }
                for (let k = 0; k < this.eRespLength; k++) {
                    const i = this.ENUM_RESPONSE[k];
                    this.stat[i][layer] === 0 ? ptLayer.push('-') : ptLayer.push(this.stat[i][layer]);
                }
                pt.push(ptLayer);
            }
            //debugger;
            Object.assign(this.stats, { layers: pt  } );
            return pt; //return 7 Arrays (stands for a layer) of Array of 14
        },
        //Total of the layer
        layerTotal () {
            Object.assign(this.stats, { layerTotal: this.getStatistics()[1] } );
            return this.getStatistics()[1];
            //return this.layers.map( arr => arr.filter( fArr => !isNaN(fArr)).reduce( (a, c) => a + parseInt(c), 0))
        },
        //total numbers
        responseNumbers () {
            let r; let k; let r0; let layer;
            const rTotalNumbers = [];
            for (r = k = 0; k < this.eRespLength; k++) {
                const i = this.ENUM_RESPONSE[k];
                for (r0 = 0, layer = 1; layer < 8; layer++) {
                    r0 += this.stat[i][layer];
                }
                rTotalNumbers.push(r0);
                r += r0;
            }
            Object.assign(this.stats, { responseNumbers: rTotalNumbers } );
            return rTotalNumbers;
        },
        //sum of total numbers
        totalNumbers () {
            const totalNumbers = this.responseNumbers.reduce( (a,c) => a+c);
            Object.assign(this.stats, { totalNumbers: totalNumbers } );
            return totalNumbers;
        },
        //total turns
        turns () {
            let pt; let k; let l; let layer;
            const turns = [];
            for (pt = k = 0; k < this.eRespLength; k++) {
                const i = this.ENUM_RESPONSE[k];
                for (l = 0, layer = 1; layer < 8; layer++) {
                    l += this.stat[i][layer] * layer;
                }
                turns.push(l);
            }
            Object.assign(this.stats, { turns: turns } );
            return turns;
        },
        totalTurns () {
            const totalTurns = this.turns.reduce( (a,c) => a + c);
            Object.assign(this.stats, { totalTurns: totalTurns } );
            return totalTurns;
        },
        //average
        avarages () {
            let pt; let r; let k;
            let l; let r0; let layer;
            const avarages = [];
            for (pt = r = k = 0; k < this.eRespLength; k++) {
                const i = this.ENUM_RESPONSE[k];
                for (l = r0 = 0, layer = 1; layer < 8; layer++) {
                    r0 += this.stat[i][layer];
                    l += this.stat[i][layer] * layer;
                }
                avarages.push( this.roundNumber(l / r0));
            }
            Object.assign(this.stats, { avarages: avarages } );
            return avarages;
        },
        totalAvarage () {
            const totalAvarage = this.roundNumber(this.totalTurns / this.totalNumbers);
            Object.assign(this.stats, { totalAvarage: totalAvarage } );
            return totalAvarage;
        },

    },
    methods: {

        getStatistics (gArray = this.gArray) {
            let layer ; let pt; let r; let r0;
            //let startTime = new Date().getTime()

            const stat = new Array(this.BC40 + 1).fill(0).map( e => new Array(8).fill(0));
            const layerTotal = new Array(8).fill(0); //total amount of layers

            for (let i = 0; i < gArray.length; i++) {
                r = this.getResponse(gArray[i], gArray[0]);
                for (pt = 0, layer = 1; ; layer++) {
                    r = this.getResponse(gArray[i], this.gTree[pt].turn);
                    if (layer === 1) {
                        r0 = r;
                    }
                    if (r === this.BC40) {
                        stat[r0][layer]++;
                        layerTotal[layer]++;
                        break;
                    }
                    pt = this.gTree[pt].child[r];
                    if (layer > 8) {
                        console.error('Error 186 ' + gArray[i]);
                        return;
                    }
                }//for(pt)
            }//for(i)
            return [ stat, layerTotal ];
        }
    },

};
</script>
