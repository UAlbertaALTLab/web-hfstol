var assert = require('assert');
let path = require('path');

// import {OlTransducer} from "../lib/hfst_lookup";

let hfstol = require('../lib/index.js')

describe('OlTransducer', function() {
    const lmao = new hfstol.OlTransducer(path.join(__dirname, 'fixtures', 'crk-descriptive-analyzer.hfstol'));

    // before('some long setup', function(done) {
    //
    // });

    describe('Header', function() {
        it('should return -1 when the value is not present', function() {

            // console.log(thing.lol)
            // console.log(lmao.header.a);
            // console.log(lmao.handle);
            //
            // assert.strictEqual([1, 2, 3].indexOf(4), -1);

        });
    });
});