export class Employee {
    constructor(
        public firstName: string,
        public lastName: string,
        public entryDate: string,
        public active: boolean,
        public id?: string
    ) { }
}
