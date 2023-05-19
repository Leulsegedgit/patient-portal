
export class Appointment   {
    constructor(
        public id?: number,
        public reason?: string,
        public insuranceChange?: boolean,
        public phoneNumber?: string,
    ) {
        this.insuranceChange = false;
    }
}
