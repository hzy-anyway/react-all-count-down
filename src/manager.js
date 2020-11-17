import Timer from './timer.js';

const day_weight=24*60*60*1000;
const hour_weight=60*60*1000;
const minute_weight=60*1000;
const second_weight=1000;
const tenth_weight=100;
const hundredth_weight=10;
const milisecond_weight=1;

export default class Manager {
    static countdowns={}; // {name:components(Array)}
    static timers={}; // {name:timer(Timer)}
	static start=(name,time)=> {
		if (!this.timers[name]) throw new Error(`there's no countdown named '${name}'`);
        if (name&&this.timers[name]) {
            if (time) {
                this.timers[name].start(this.makeCount(time));
            } else {
                this.timers[name].start();
            }
        }
	}
	static stop=(name)=> {
		if (!this.timers[name]) throw new Error(`there's no countdown named '${name}'`);
        if (name&&this.timers[name]) {
            this.timers[name].stop();
        }
    }
    static removeTimer=(name)=> {
        if (name&&this.timers[name]) {
            this.timers[name].stop();
            this.timers[name]=undefined;
        }
    }
    static makeFilteredValue=(name,value)=> {
        let filteredValue={};
        let parts=this.countdowns[name].map(element=>element.props.part);
        let sequentialParts=this.sequencePartsDes(parts);
        let rest=value;
        sequentialParts.forEach(part=>{
            switch (part) {
                case "day":
                    filteredValue.day=parseInt(rest/(day_weight));
                    rest=rest%(day_weight);
                    break;
                case "hour":
                    filteredValue.hour=parseInt(rest/(hour_weight));
                    rest=rest%(hour_weight);
                    break;
                case "minute":
                    filteredValue.minute=parseInt(rest/(minute_weight));
                    rest=rest%(minute_weight);
                    break;
                case "second":
                    filteredValue.second=parseInt(rest/(second_weight));
                    rest=rest%(second_weight);
                    break;
                case "tenth":
                    filteredValue.tenth=parseInt(rest/(tenth_weight));
                    rest=rest%(tenth_weight);
                    break;
                case "hundredth":
                    filteredValue.hundredth=parseInt(rest/(hundredth_weight));
                    rest=rest%(hundredth_weight);
                    break;
                case "milisecond":
                    filteredValue.milisecond=parseInt(rest);
                    break;
                default:
                    break;
            }
        });
        return filteredValue;
    }
    static callManager=(eventName, data)=> {
        if (eventName==="init_from_timer") {
            const {name,value}=data;
            const filteredValue=this.makeFilteredValue(name,value);
            for (let i = 0; i < this.countdowns[name].length; i++) {
                const element = this.countdowns[name][i];
                element.updateValue(filteredValue);
            }
        } else if (eventName==="update_from_timer") {
            const {name,value}=data;
            const filteredValue=this.makeFilteredValue(name,value);
            for (let i = 0; i < this.countdowns[name].length; i++) {
                const element = this.countdowns[name][i];
                element.updateValue(filteredValue);
                if (element.state.previous_value !== element.state.value && element.state.value === 0) {
                    if (element.props.zeroHandler) {
                        element.props.zeroHandler();
                    }
                }
            }
        } else if (eventName==="timesup_from_timer") {
            const {name}=data;
            for (let i = 0; i < this.countdowns[name].length; i++) {
                const element = this.countdowns[name][i];
                if (element.props.timesUpHandler) {
                    element.props.timesUpHandler();
                }
            }
        } else if (eventName==="create_from_component") {
            const component=data;
            const { name, circular, days,hours,minutes,seconds,tenths,hundredths,miliseconds }=component.props;

            // update countdowns
            if (!this.countdowns[name]) {
                this.countdowns[name]=[component];
            } else {
                this.countdowns[name].push(component);
            }

            // update timers
            if (!this.timers[name]) {
                let parts=this.countdowns[name].map(element=>element.props.part);
                let gap_new=this.makeGap(parts,{days,hours,minutes,seconds,tenths,hundredths,miliseconds});
                let timer_new=this.createTimer(name);
                timer_new.setGap(gap_new);
                timer_new.setCircular(circular);
                timer_new.addCount(this.makeCount({days,hours,minutes,seconds,tenths,hundredths,miliseconds}));

                this.timers[name] =timer_new;
            } else {
                let parts=this.countdowns[name].map(element=>element.props.part);
                let gap=this.makeGap(parts,{days,hours,minutes,seconds,tenths,hundredths,miliseconds});
                this.timers[name].setGap(gap);
                this.timers[name].setCircular(circular);
                this.timers[name].addCount(this.makeCount({days,hours,minutes,seconds,tenths,hundredths,miliseconds}));
            }
        } else if (eventName==="mount_from_component") {
            const component=data;
            const { name }=component.props;

            component.ready=true;

            let allComponentsReady=true;
            let startAfterMount=true;
            for (let i = 0; i < this.countdowns[name].length; i++) {
                const element = this.countdowns[name][i];
                allComponentsReady=allComponentsReady&&element.ready;
                startAfterMount=startAfterMount&&element.props.startAfterMount;
            }

            if (allComponentsReady) {
                if (startAfterMount) {
                    this.timers[name].start();
                } else {
                    this.timers[name].init();
                }
            }
        } else if (eventName==="destroy_from_component") {
            const component=data;
            const { name }=component.props;

            // update countdowns and timers
            this.countdowns[name]=this.countdowns[name].filter(element=>element!==component);
            if (this.countdowns[name].length===0) {
                this.countdowns[name]=undefined;
                this.removeTimer(name);
            }

        } else {
            throw new Error('unknown eventName in method "callManager"');
        }
    }
    static createTimer=(name)=> {
        return new Timer(this.callManager,name);
    }
    static sequencePartsDes=(parts)=> {
        let partDescentedSeq=["day","hour","minute","second","tenth","hundredth","milisecond"];
        let result=partDescentedSeq.filter(element=>parts.indexOf(element)>=0);
        return result;
    }
    static makeGap=(parts,time_object)=> {
        let sequentialParts=this.sequencePartsDes(parts);
        return Math.min(this.make_gap_process_1(sequentialParts),this.make_gap_process_2(time_object));
    }
    static make_gap_process_1=(sequentialParts)=> {
        switch (sequentialParts[sequentialParts.length-1]) {
            case "day":
                return day_weight;
            case "hour":
                return hour_weight;
            case "minute":
                return minute_weight;
            case "second":
                return second_weight;
            case "tenth":
                return tenth_weight;
            case "hundredth":
                return hundredth_weight;
            case "milisecond":
                return milisecond_weight;
            default:
                break;
        }
        return second_weight;
    }
    static make_gap_process_2=({days,hours,minutes,seconds,tenths,hundredths,miliseconds})=> {
        if (miliseconds) return milisecond_weight;
        if (hundredths) return hundredth_weight;
        if (tenths) return tenth_weight;
        if (seconds) return second_weight;
        if (minutes) return minute_weight;
        if (hours) return hour_weight;
        if (days) return day_weight;
        return second_weight;
    }
    static makeCount=({days,hours,minutes,seconds,tenths,hundredths,miliseconds})=> {
        let result=0;
        if (days) result+=days*day_weight;
        if (hours) result+=hours*hour_weight;
        if (minutes) result+=minutes*minute_weight;
        if (seconds) result+=seconds*second_weight;
        if (tenths) result+=tenths*tenth_weight;
        if (hundredths) result+=hundredths*hundredth_weight;
        if (miliseconds) result+=miliseconds*milisecond_weight;
        return result;
    }
}