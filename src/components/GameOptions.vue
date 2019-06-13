<template>
  <table>
    <thead>
      <tr>
        <th>
          <span>Game options</span>
        </th>
        <th>
          <span />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <span>Randon Guessing Number </span>
        </td>
        <td>
          <input
            id="randomness"
            v-model="gRandomness"
            type="checkbox"
          > <label for="randomness">
            ({{ gRandomness ? 'RANDOM GUESS' : 'SEQUENTIAL GUESS' }})
          </label>
        </td>
      </tr>

      <tr>
        <td>
          <span>Chosse algorithm to use</span>
        </td>
        <td>
          <select
            id="selectAlgorithm"
            v-model="gAlgorithmIndex"
          >
            <!-- selecting index set automatically on load using gAlgorithmIndex variable -->
            <option
              v-for=" (item, index) in oName"
              :key="item"
              :value="index"
            >
              {{ item | amendTheSentence }}
            </option>
          </select>
          <small>
            <ul>
              <li>
                Same digits in secret number are<span v-if="!gSameAllowed">
                  NOT
                </span> ALLOWED
              </li>
              <li>Allowe digits from 1 to <span v-text="gDigits" /></li>
            </ul>
          </small>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
    name: 'GameOptions',
    props: {
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
        }
    }
};

</script>

