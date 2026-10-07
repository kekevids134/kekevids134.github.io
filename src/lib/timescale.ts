import Decimal from 'decimal.js';

export class TimeScale {
    interval: Decimal;
    offset: Decimal;

    constructor(interval: number | string, offset: number | string) {
        this.interval = new Decimal(interval);
        this.offset = new Decimal(offset);
    }

    now(digits: number = 6): Decimal {
        const now = new Decimal(Date.now()).div(1000);
        return now.minus(this.offset).div(this.interval).toDecimalPlaces(digits);
    }

    from(timestamp: number | string, digits: number = 6): Decimal {
        return new Decimal(timestamp)
            .div(1000)
            .minus(this.offset)
            .div(this.interval)
            .toDecimalPlaces(digits);
    }
}

export const VTC = new TimeScale(1850, 946684800);
