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
            let symbol = ''
            while (true) {
                let byte = file.readUInt8(alphabetStart + progress)
                progress++
                if (byte === 0) {
                    if (symbol.length === 4 && symbol.charAt(0) === '@' && symbol.slice(-1) === '@' && symbol.charAt(2) === '.' && 'PNRDCU'.includes(symbol.charAt(1))) {
                        let [op, feat, val] = ['','','']


                    }
                }


            }

        }
    }
}


export {Header, Alphabet}