class BlackHoleTp {
    id:number;
    x:number;
    y:number;
    z:number;

    constructor(id:number, locate:any) {
        this.id = id;
        this.x = locate.x;
        this.y = locate.y;
        this.z = locate.z;
    }
    public getId(): number {
        return this.id;
    }
}