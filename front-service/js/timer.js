
export class Timer {
    constructor(minutes, seconds = 0, remainingSeconds = null) {
        const additionalMinutes = Math.floor(seconds / 60);
        const remainingSecondsAfterConversion = seconds % 60;
        const totalMinutes = minutes + additionalMinutes;

        this.totalSeconds = (totalMinutes * 60) + remainingSecondsAfterConversion;
        this.remainingSeconds = remainingSeconds !== null ? remainingSeconds : this.totalSeconds;
        this.timerId = null;
        this.onTimeUp = null;

    }

    start(onTick, onTimeUp) {
        this.onTimeUp = onTimeUp;
        this.timerId = setInterval(() => {
            this.remainingSeconds--;

            if (this.remainingSeconds <= 0) {
                this.stop();
                if (this.onTimeUp) {
                    this.onTimeUp();
                }
                return;
            }

            if (onTick) {
                onTick(this.getTimeRemaining());
            }
        }, 1000);
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    getTimeRemaining() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        return {
            minutes,
            seconds,
            total: this.remainingSeconds
        };
    }


    reset() {
        this.stop();
        this.remainingSeconds = this.totalSeconds;
    }


}