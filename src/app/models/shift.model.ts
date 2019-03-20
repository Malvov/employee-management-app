export class Shift {
    constructor(
        public date: string,
        public check_in: string,
        public check_out: string,
        public employee_id: string,
        public comment?: string,
        public id?: string
    ) { }
}