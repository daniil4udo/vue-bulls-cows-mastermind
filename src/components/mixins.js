'use strict';

import { mapGetters } from 'vuex';

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
//export default Permutations;
export const mixinBullsCows = {
    data () {
        return {
            ZERO_CODE: 48,   //'0'.charCodeAt(0);
            START    : 35,   //'#'.charCodeAt(0)
            oName: [
                'crushBullsCows',
                'avgBullsCows',
                'crushMastermind',
                'avgMastermind5',
                'avgMastermind'
            ],
            oTree: [
                '##;d);)3*O)3%+#l#l)3#l%+)3%+A|AtAtA|-3At<O<GAt<GGnAdG^FdF.:OGrGrERH#@:@TAjAa)CA1AeAeAr1.6t4vEN+x4i+x55,`J9<i<bK*%;,GIe%3Lx<yG]DtFNGw&9&MG@F.EQ?|DtGb:vE6Gk$FE6ATH&H#GAH$GzFQGsH&,;IO;Q#.+9FHYcIA,;6aY`LFI-Y#M~NnC9C%CrI+N&W:QjBVYiRhMY=2W4S[<TGII3Rq<xS[To7#6D@F7YkY8Xq7SYaN1YOFC67>y7X<qYLI@Yb0x0vA1W4A.BlKx<*B?FK<c0u;O;iO.Y?,WYgIr7YOAVU6wY/+K-XSH1vU<@-K(@(Y**Y:ILTY`K)@R+nV%X~In.E6:1aLH6SY`F8Y[.1TU1fYM9R/LYWF:V<XQ5FVSVf/EVc(x(i,Y+>D)XSL]Yb3qMsB>*CJdJ|VMY`K<JnYcYQ+jVc(dE8YJUyV\'X)KXUkX55-5&.I/A/?/=.43P3O3v/5/y-FKzT]TRYhY(BTCOB4:\':.9|GH?P?EA_W[EaX2BzN9VALY<wFZ%|\'7(@X7Uo4W4H,#OFBiPr,s4SOP.yU>Y.WI?\'?G>BIO7;VAB6YPYcWMKn>,Bn:+PLYf&eVXHtXJPqEu19%P%]KwYKVGXpNoUwXvVH)p4*?d(TC{7rUqYX?HYMNaNHRNS\'NoX-XpU;LyY^Y.YgY@S^H)QaKr>?Y&LyL@VnXcVQD9X{R|T3C-XAC?QVTvAD=RXo;uYj0E<VW7>534;gVJSq+PYF6@X+TdWoFiXYM7YZYJ5@XI\'XKX1VMYfVDK]X|EiXKYZXR',
                '##;d*W);*O)2%+#l#l)3#l#3#*#lA|AtAs<O<GAt<O;l;k<GK+>p;XMfAiJyKxKxMgMhKx@z1{GiGjAcG[G%(p:KEO?eEOEO:81J1.6t4vEN?x4i6u)dK+J9J7;c<k%;JIe%3%2<yG]DtFNFc&9&9Gy&KEQ?|DtGb:vE6Gk.YE64\'DuGeGA&J&KFQGsH&GX&2&+#|#[H&H&6bLFI-HfM~NnC9C%CrI+N&W:QjBVA<BHBGC:CeS[A5C$WsA{=*<x<U<?OJ3CN=2h2/POX$=%Lr>*=`C@Be9DCAB,V^G`2%M\'7C<d676=<{Ld;];b;v<CAdAVV_Q25sYV2Y8b1}Ie0}EK=L-&0105+C5]<=+{+mA/B2A>0)Ut5j8\':3|3t3l88816s7U7NOE3x/TK?=HROK_6tW|F27OY\'9>5F5Wg>k5aKQWD@]6nYX5Q0s0,:/x/v=;5351EUO$+g+~*0(x(w(qK=*Q*C.1JdJcY6Jt:3:R*z+F:;:9@*(c(bP84r)L5-5&.I/A/?/=.43P3O3vV5Vc(YJVY(BTCO?S:\':.9|AyBq9u?CDj:$UJLC?XLY<wA\'%|\'7(@%f%e4W4H,#OFBiPr,s4SOP.yDTD{>m?\'?G>BIO7;VAB6*JK{+$NyLU,PL\'A&e$XHt&:PEJv%=%h%&*H%0\'L$I#})p4**y(T(R7r)A$~?AOW9^K|\'/#Q%x#;&l3J7`YQ;AK]0x7a:_Q+0wDMIx2f0pNcHbC5C(1=E~D1>iF5O:RhC&L9;@>v+D+}Ic362Z.H1M6l3j/j9,Vb.K1i8{2SY\'X);XGy7g(jB:',
                '#++S&j&d&l$I$7$C#^$C#I&n0b0b0b0b,:+s0b0b0Z0b-S(q-2+{)w\'>\'<-i&q0w)~)r(B0R0e)d,0../20(..0L(I(R/@\'J-V.H0|/k${*I.G.}0S\'`*Y/$%_)b$r$v$1.m0K)f)A#q$\'/s)~)F+m0r$i$R.}.I/T1&0u%&0M0r(<0Y0[,)',
                '#++T&j&c&l$I$7$C#^+^#I&n.5.Y+~+x++s0=0i(q-2+{)w\'>\'<-i&q0w-|)S)M(A&}(;*[/?&J0N(I&2&M\'J0`+|*D\'I${*I.G$P$O\'`*Y/$%_)b#e$v$1$Q0K)f)A#q$\'#X)~)F+m#A$i$c.}#w#)#%#t0M+C.0+#0i1(',
                '#++T&j&c&l$I$7$C#^+^#I&n.5.Y+~+x++s0=0i(q-2+{)w\'>\'<-i&q0w-|)S)M(A&}(;*[/?&J0N(I&2&M\'J0`+|*D\'I${*I.G$P$O\'`*Y/$%_)b(#$v$1$Q0K)f)A#q$\'#X)~)F+m#A$i$c.}#w#)#%#t0M+C.0#i'
            ],
            permutationType: {
                PERMUTATIONS_WITHOUT_REPLACEMENTS: 0,
                PERMUTATIONS_WITH_REPLACEMENTS   : 1,
                COMBINATION                      : 2
            },
        };
    },
    computed: {
        ...mapGetters({
            gSameAllowed: 'SAME_ALLOWED', 
            gDigits: 'DIGITS'
        }),
        RADIX () {
            return 127 - this.START;
        },
        // gSameAllowed () {
        //     return this.$store.getters.SAME_ALLOWED;
        // },
        // gDigits () {
        //     return this.$store.getters.DIGITS;
        // },
        ENUM_RESPONSE () {
            return [
                this.BC(0, 0), this.BC(0, 1), this.BC(0, 2), this.BC(0, 3), this.BC(0, 4),
                this.BC(1, 0), this.BC(1, 1), this.BC(1, 2), this.BC(1, 3),
                this.BC(2, 0), this.BC(2, 1), this.BC(2, 2),
                this.BC(3, 0),
                this.BC(4, 0)
            ];
        },
        BC40 () {
            return this.BC(4, 0);
        },
        MBC () {
            return this.BC(3, 0) + 1;
        },
        gArray () {
            const mutations = new Permutations(
                4,
                this.gDigits,
                this.gSameAllowed
                    ? this.permutationType.PERMUTATIONS_WITH_REPLACEMENTS
                    : this.permutationType.PERMUTATIONS_WITHOUT_REPLACEMENTS
            );
            let l;
            let i;
            let m;
            let j = 0;
            const gArray = new Array(mutations.number());
            do {
                for (l = 1000, m = i = 0; i < mutations.getK(); i++, l /= 10) {
                    m += l * mutations.getIndex(i);
                }
                gArray[j++] = m;
            } while (mutations.next());
            return gArray;
        },
        gTree () {//tree init on load
            const _ = this;
            let i;
            let j;
            let k;
            let m;
            let node;
            const recent = new Array(_.ENUM_RESPONSE.length - 1);
            const s      = _.oTree[_.gAlgorithmIndex];
            const q      = new Array(_.MBC);

            const tree      = [];
            tree [0]        = {};
            tree [0].recent = _.gArray;

            for (let l = (i = 0); i < tree.length; i++) {
                node = tree[i];
                if (node.recent.length === 1) {
                    node.turn = node.recent[0];
                    node.child = undefined;
                } else {
                    node.turn = -1;
                    if (node.recent.length === 2) {
                        node.turn = node.recent[0];
                    } else if (node.recent.length <= _.ENUM_RESPONSE.length) {
                        for (j = 0; j < node.recent.length; j++) {
                            for (k = 0; k < q.length; k++) {
                                q[k] = false;
                            }
                            for (k = 0; k < node.recent.length; k++) {
                                if (k === j) {
                                    continue;
                                }
                                m = _.getResponse(node.recent[j], node.recent[k]);
                                if (q[m]) {
                                    break;
                                }
                                q[m] = true;
                            }
                            if (k === node.recent.length) {
                                node.turn = node.recent[j];
                                break;
                            }
                        }
                    }
                    if (node.turn === -1) {
                        node.turn = _.gArray[_.parseNumber(s.substring(l, l + 2))];
                        l += 2;
                    }

                    node.child = new Array(_.MBC); /*size is MBC!*/

                    //split recent
                    for (j = 0; j < recent.length; j++) {
                        recent[j] = [];
                    }
                    for (j = 0; j < node.recent.length; j++) {
                        k = _.getResponse(node.turn, node.recent[j]);
                        if (k !== _.BC40) {
                            recent[_.findER(k)].push(node.recent[j]);
                        }
                    }

                    for (j = 0; j < recent.length; j++) {
                        if (recent[j].length === 0) {
                            node.child[ _.ENUM_RESPONSE[j] ] = 0;
                        } else {
                            node.child[ _.ENUM_RESPONSE[j] ] = tree.length;
                            tree.push({});
                            tree[ tree.length - 1 ].recent = recent[j];
                        }
                    }
                }
            } //for(i)

            return tree;
        },
    },
    methods: {
        findER (r) {
            return this.ENUM_RESPONSE.findIndex(e => r === e);
        },
        BC (bull, cow) {
            return bull * 5 + cow;
        },
        BULL (r) {
            return Math.floor(r / 5);
        },
        COW (r) {
            return r % 5;
        },
        numberToString (n) {
            return (String(n).length < 4) 
                ? '0'.repeat(4 - String(n).length) + String(n)
                : String(n);
            
        },
        parseNumber (b) {
            if (b.length === 0) {
                return 0;
            } else if (b.length === 1) {
                return this.parseDigit(b.charCodeAt(0));
            } else {
                return (
                    this.parseDigit(b.charCodeAt(0)) * (this.RADIX) + this.parseDigit(b.charCodeAt(1))
                );
            }
        },
        parseDigit (c) {
            return c >= '\\'.charCodeAt(0) ? c - 1 - this.START : c - this.START;
        },
        roundNumber (x, digits = 3) {
            return parseFloat(x.toFixed(digits));
        },
        getResponse (n1, n2) {
            const _ = this;
            let r = 0;
            const a = new Array(_.gDigits).fill(0);
            
            let n = [ _.numberToString( n1), _.numberToString(n2) ];
            if (n[0].length !== 4 || n[1].length !==4 ) {
                console.error('%c Error70!', 'color: red; font-weight: bold;');
                return 'Error70 ' + r;
            }

            n = [ [ ...n[0] ], [ ...n[1] ] ].map(arr => arr.map(e => parseInt(e)));

            for (let i = (r = 0); i < 4; i++) {
                if (n[0][i] === n[1][i]) {
                    r += 5;
                } else {
                    if (a[n[0][i]]++ < 0) {
                        r++;
                    }
                    if (a[n[1][i]]-- > 0) {
                        r++;
                    }
                }
            }
            return r;
        },
        
    }
};