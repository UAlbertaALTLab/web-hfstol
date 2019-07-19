let assert = require('assert')

class Header {

    /**
     *
     * @param file {Buffer}
     */
    constructor(file) {
        let bytes = file.toString('ascii', 0, 4)

        assert(bytes === 'HFST' && file.readInt8(4) === 0, '.hfstol file version not supported, or wrong file supplied')

        // the remaining part of hfst3 header, assume it does nothing.
        const remaining = file.readUInt16LE(5)

        const start = remaining + 8

        this.number_of_symbols = file.readUInt16LE(start + 2)


        this.headerEnd = remaining + 8 + 56

        // this.a = bytes

    }
}

class Alphabet {

    /**
     *
     * @param file {Buffer}
     * @param alphabetStart {int}
     * @param number_of_symbols {int}
     */
    constructor(file, alphabetStart, number_of_symbols) {
        this.keyTable = []
        this.flagDiacriticOperations = {}
        let progress = 0

        for (let i = 0; i < number_of_symbols; i++) {
            // console.log(i)
            const symbol = []
            while (true) {
                let byte = file.readUInt8(alphabetStart + progress)
                // console.log(byte)
                progress++
                if (byte === 0) {
                    const symbol_str = Buffer.from(symbol).toString()
                    console.log(symbol_str)
                    if (symbol_str.length > 4 && symbol_str.charAt(0) === '@' && symbol_str.slice(-1) === '@' && symbol_str.charAt(2) === '.' && 'PNRDCU'.includes(symbol_str.charAt(1))) {
                        let [op, feat, val] = ['','','']
                        const parts = symbol_str.slice(1,-1).split('.')
                        if (parts.length === 2){
                            [op, feat] = parts
                        }
                        else if (parts.length === 3){
                            [op, feat, val] = parts
                        }
                        else{
                            this.keyTable.push(symbol_str)
                            break
                        }
                        this.flagDiacriticOperations[i] = new FlagDiacriticOperation(op, feat, val)
                        this.keyTable.push('')
                        break
                    }
                    this.keyTable.push('')
                    break

                }
                symbol.push(byte)
            }
        }
        this.keyTable[0] = ''
    }
}


class FlagDiacriticOperation{

    constructor(op, feat, val){
        this.op = op
        this.feat = feat
        this.val = val

    }
}

export {Header, Alphabet}