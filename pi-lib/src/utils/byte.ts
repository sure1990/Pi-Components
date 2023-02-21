export class Byte {

    private data: number = 0;

    public IsBitSet(n: number): boolean {
        var mask = 1 << n; //to get the nth bit
        return ((this.data & mask) != 0)
    }

    public SetBit(n: number): void {
        var mask = 1 << n; //to get the nth bit
        this.data |= mask; // set a the nth bit in data
    }

    public ClearBit(n: number): void {
        var mask = 1 << n; //to get the nth bit
        this.data &= ~mask; //clear the nth bit in data
    }

    public toString() {
        return ("000000000" + this.data.toString(2)).substr(-8)
    }
}


export class ByteCollection {

    [index: number]: Byte
    private readonly byteCollection: Byte[] = []
    private readonly byteSize = 8;//8-bit is 1 byte


    public get length(): number {
        return this.size;
    }

    constructor(private size: number) {
        this.init();
    }

    private init() {
        for (let index = 0; index < this.size; index++) {
            //initialize bytecollection with byte=>(size)
            this.byteCollection.push(new Byte());
            this[index] = this.byteCollection[index];
        }
    }

    private GetIndex(n: number): number {
        const bitCount = this.size * this.byteSize
        if (n > bitCount) {
            throw new Error(`Index Out of bounds. Size=${bitCount}/Index=${n}`)
        }
        const collectionIndex = Math.ceil(n / this.byteSize);
        return collectionIndex - 1;
    }

    public SetBit(n: number) {
        const index = this.GetIndex(n);//index in the byte collection
        const nthBit = n - 1 - (index * this.byteSize); //0 based bit position
        this.byteCollection[index].SetBit(nthBit);
    }

    public ClearBit(n: number) {
        const index = this.GetIndex(n);//index in the byte collection
        const nthBit = n - 1 - (index * this.byteSize); //0 based bit position
        this.byteCollection[index].ClearBit(nthBit);
    }

    public toString() {
        let str = '';
        for (let index = 0; index < this.length; index++) {
            str = str.concat(this[index].toString());
        }
        return str;
    }
}