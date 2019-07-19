let fs = require('fs');
import {Header} from "./shared";


class OlTransducer{

    constructor(filename){
        const handle = fs.readFileSync(filename);
        this.handle = handle;
        this.header = new Header(handle);

    }



}


export {OlTransducer}
