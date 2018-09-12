declare module "*.json"

export class CollectionObject {

    constructor(jsn:string)

    fetch() {
        return require('../../data/'+this.jsn);
    }

}
