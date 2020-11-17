export default class Timer {
	constructor(callManager, timerName) {
		this.callManager = callManager;
		this.timerName = timerName;
		this.gap=1;
		this.count = 0;
		this.count_origin = 0;
		this.circular=false;
		this.intervalId = undefined;
	}

	setCount(count) {
		if (count) {
			this.isCountLessThanZero(count);
			this.count = count;
			this.count_origin = count;
		}
	}
	addCount(count) {
		if (count) {
			this.isCountLessThanZero(count);
			this.count +=count;
			this.count_origin +=count;
		}
	}
	setGap(gap) {
		if (gap) {
			this.isGapLessThanZero(gap);
			this.gap = gap;
		}
	}
	setCircular(circular) {
		this.circular=circular
	}
	start(count) {
		this.setCount(count);
		this.init_or_update("init_from_timer");
		if (this.count > 0) {
			clearInterval(this.intervalId);
			this.intervalId = setInterval(() => {
				this.count -= this.gap;
				this.init_or_update("update_from_timer");
			}, this.gap);
		}
	}
	stop() {
		clearInterval(this.intervalId);
	}
	init() {
		this.init_or_update("init_from_timer");
	}
	init_or_update(tag) {
		if (this.count===0) {
			this.callManager(tag, {
				name: this.timerName,
				value:this.count
			});
			if (this.circular) {
				this.count=this.count_origin;
			} else {
				clearInterval(this.intervalId);
			}
			this.callManager("timesup_from_timer",{
				name: this.timerName
			});
		} else {
			this.callManager(tag, {
				name: this.timerName,
				value:this.count
			});
		}
	}
	isCountLessThanZero(count) {
		if (count < 0) {
			throw new Error("'count' can not be less than zero !");
		}
	}
	isGapLessThanZero(gap) {
		if (gap < 0) {
			throw new Error("'gap' can not be less than zero !");
		}
	}
}
