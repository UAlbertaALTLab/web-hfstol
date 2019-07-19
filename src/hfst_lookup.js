let fs = require('fs');
import {Alphabet, Header} from "./shared"


class OlTransducer{

    constructor(filename){
        const handle = fs.readFileSync(filename);
        this.handle = handle;
        this.header = new Header(handle);
        this.alphabet = new Alphabet(handle, this.header.headerEnd, this.header.number_of_symbols)
    }



}


export {OlTransducer}
