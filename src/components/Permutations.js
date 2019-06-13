'use strict';

/*
const permutationType = {
    PERMUTATIONS_WITHOUT_REPLACEMENTS: 0,
    PERMUTATIONS_WITH_REPLACEMENTS: 1,
    COMBINATION: 2
}
*/
class Permutations {
    constructor (k, n, type) {
        if (k === undefined || n === undefined || type === undefined) {
            return;
        }
        this.init(k, n, type);
    }
    number () {
        let r = 1;
        //if (this.type === PermutationType.PERMUTATIONS_WITH_REPLACEMENTS)
        if (this.type === 1) {
            for (let i = 0; i < this.k; i++) {
                r *= this.n;
            }
        }
        else {
            for (let i = this.n - this.k + 1; i <= this.n; i++) {
                r *= i;
            }
            //if (this.type === PermutationType.COMBINATION)
            if (this.type === 2) {
                for (let i = 2; i <= this.k; i++) {
                    r /= i;
                }
            }
        }
        return r;
    }
    init (_k, _n, _type) {
        if (_k <= 0 || _n <= 0) {
            console.log('%c Permutations Error – N & K should be positive!', 'color: red; font-weight: bold;');
            return false;
        }
        //if (_type !== PermutationType.PERMUTATIONS_WITH_REPLACEMENTS && _n < _k)
        if (_type !== 1 && _n < _k) {
            console.log('%c Permutations Error – N < K!', 'color: red; font-weight: bold;');
            return false;
        }
        this.n    = _n;
        this.k    = _k;
        this.type = _type;
        this.i    = new Array(this.k);
        this.a    = new Array(this.n);
        //init indexes
        this.index = 0;
        this.i[0]  = -1;
        this.add();
        return true;
    }
    add () {
        let j = this.index;
        let m;
        let l;
        this.i[j]++;
        for (j++; j < this.k; j++) {
            //this.type === PermutationType.COMBINATION ?
            this.i[j] = this.type === 2 ? this.i[j - 1] + 1 : 0;
        }
        //if (this.type === PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS)
        if (this.type === 0) {
            for (j = 0; j < this.n; j++) {
                this.a[j] = j;
            }
            for (j = 0; j < this.k; j++) {
                m = j + this.i[j];
                l = this.a[m];
                for (; j !== this.k - 1 && m > j; m--) {
                    this.a[m] = this.a[m - 1];
                }
                this.a[j] = l;
            }
        }
    }
    next () {
        let l;
        let j;
        for (j = this.k - 1; j >= 0; j--) {
            // if (this.type === PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS)
            if (this.type === 0) {
                l = j;
            }
            //if (this.type === PermutationType.PERMUTATIONS_WITH_REPLACEMENTS)
            else if (this.type === 1) {
                l = 0;
            }
            else {
                l = this.k - 1 - j;
            }
            if (this.n - 1 !== this.i[j] + l) {
                break;
            }
        }
        this.index = j;
        if (this.index === -1) {
            return false;
        }
        this.add();
        return true;
    }
    getK () {
        return this.k;
    }
    getN () {
        return this.n;
    }
    getIndexes () {
        // this.type === PermutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS ?
        return this.type === 0 ? this.a : this.i;
    }
    getIndex (i) {
        return this.getIndexes()[i];
    }
}

export default Permutations;