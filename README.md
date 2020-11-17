# react-all-count-down

> Solve all 'countdown' problems with just one component.

## Install
```
npm install --save react-all-count-down
```
## Quick Start
```js
import AllCountDown from 'react-all-count-down';
```

## Usage
I'm going to tell you the usage step by step with the examples below.

### Example 1:
```html
<div className="text-content">
    <AllCountDown name="Example-1-No-1" seconds={10} countDownStyle={count_down_style} timesUpHandler={this.timesUpHandler} /> seconds left !!
</div>
```
The code above functions as displaying text '10 seconds left',and the numeric symbol '10' will down to '0' second by second.<br>
The tag \<AllCountDown\> which represent the component is an inline tag. It displays the numeric symbol only.<br>
#### props
| prop | type | required | default | detail |
| ---- | ---- | ---- | ---- | ---- |
| name | String | Yes | undefined | We use it to identify the timer.This prop is critical,so make sure you had it valued. |
| seconds | Number | No | 60 | The time the countdown starts at,in seconds,the default is 60.|
| minutes | Number | No | 0 | The time the countdown starts at,in minutes. |
| hours | Number | No | 0 | The time the countdown starts at,in hours. |
| days | Number | No | 0 | The time the countdown starts at,in days. |
| tenths | Number | No | 0 | The time the countdown starts at,in tenths of a second. |
| hundredths | Number | No | 0 | The time the countdown starts at,in hundredths of a second. |
| miliseconds | Number | No | 0 | The time the countdown starts at,in miliseconds. |
| countDownStyle | Object | No | {} | The css style of the numeric symbols to be displayed |
| timesUpHandler | Function | No | undefined | The callback when time's up. |
| startAfterMount | Boolean | No | true | Start countdowning after the component is mounted. |
Notice:<br>
* We strongly recommend you to name timers differently in a project,or some errors may happen.
* When it comes with props 'seconds','minutes','hours','days','tenths','hundredths' 'miliseconds' at the same time,the props will add up to a total time.
* Component \<AllCountDown\> starts countdowning immediately after being mounted.Cancel it through prop 'startAfterMount' above.

### Example 2:
```html
<div className="text-content">
    <AllCountDown name="Example-2-No-1" part="day" seconds={5*24*60*60} timesUpHandler={this.timesUpHandler} />
    :<AllCountDown name="Example-2-No-1" part="hour" countDownStyle={count_down_style_1} />
    :<AllCountDown name="Example-2-No-1" part="minute" />
    :<AllCountDown name="Example-2-No-1" part="second" seconds={10} />
</div>
```
The code above functions as displaying a '5 days' countdown.A digital clock you will see,which has got parts showing 'day','hour','minute','second' devided by symbol ':'.<br>
#### props
| prop | type | required | default | detail |
| ---- | ---- | ---- | ---- | ---- |
| part | String | No | "second" | Determine which 'part of time' of a timer to be displayed(for example:hour,minute,second). |

Available value of prop 'part':
| value | detail |
| ---- | ---- |
| day | Display part 'day' of a timer |
| hour | Display part 'hour' of a timer |
| minute | Display part 'minute' of a timer |
| second | Display part 'second' of a timer |
| tenth | Display part 'tenth of a second' of a timer |
| hundredth | Display part 'hundredth of a second' of a timer |
| milisecond | Display part 'milisecond' of a timer |
Notice:<br>
* The prop 'name' is used to identify a timer.When there're several \<AllCountDown\> components with a same value on prop 'name',the props 'seconds' or 'minutes'(or 'hours'...) they have will add up to a total time as a start time of the countdown.
* When there're several \<AllCountDown\> components with a same value on prop 'name',the 'timesUpHandlers' they have will all be called in an unknown sequence when time's up in a countdown.

### Example 3:
```html
<div className="text-content">
    <AllCountDown name="Example-3-No-1" part="day" />
    :<AllCountDown name="Example-3-No-1" part="hour" />
    :<AllCountDown name="Example-3-No-1" part="minute" minutes={1} zeroHandler={this.minuteZeroHandler} />
    :<AllCountDown name="Example-3-No-1" part="second" seconds={5} zeroHandler={this.secondZeroHandler} />
</div>
```
The code above functions as displaying an '1 minute and 5 seconds' countdown.When part 'second' come to '0' each time, the function 'secondZeroHandler' above will be triggered.When part 'minute' come to '0' each time, the function 'minuteZeroHandler' above will be triggered.<br>
| prop | type | required | default | detail |
| ---- | ---- | ---- | ---- | ---- |
| zeroHandler | Function | No | undefined | Callback when relevant 'part' of time come to zero  |
Notice:
* When relevant 'part' of time is '0' initially,the zeroHandler of this 'part' will not be triggered at this time.
* Just like the 'timesUpHandler',when there're duplicate zeroHandlers,they will be triggered in an unknown sequence.

### Example 4:
```js
import ValueRenderExample from "../../components/value-render-example/value-render-example.react";

<div className="text-content">
    <AllCountDown name="Example-4-No-1" part="day" valueRender={ValueRenderExample} />
    :<AllCountDown name="Example-4-No-1" part="hour" valueRender={ValueRenderExample} />
    :<AllCountDown name="Example-4-No-1" part="minute" minutes={1} valueRender={ValueRenderExample} />
    :<AllCountDown name="Example-4-No-1" part="second" seconds={5} valueRender={ValueRenderExample} />
</div>
```
The code above functions as displaying an '1 minute and 5 seconds' countdown.Each 'part' will not being rendered in numeric symbols,but a component from you.The target component is appointed through the prop 'ValueRenderExample'.
| prop | type | required | default | detail |
| ---- | ---- | ---- | ---- | ---- |
| valueRender | Object | No | undefined | Render a component from you instead of numeric symbols.The target component should have a prop named 'value'. |
Notice:The target component should have a prop named 'value' which will be updated with the latest value of the 'part of the time'.For more detail,turn to the [example project](https://github.com/hzy-anyway/react-all-count-down) in Github.

### Example 5:
```html
{/* <!-- timer: time's up in 5 seconds,not circular,the same as function 'setTimeout()' --> */}
{run?<AllCountDown name="Example-5-No-1" visible={false} seconds={5} timesUpHandler={this.timesUpHandler_1} />:null}
{/* <!-- timer: set a 'two seconds' interval --> */}
{run?<AllCountDown name="Example-5-No-2" visible={false} seconds={2} circular={true} timesUpHandler={this.timesUpHandler_2} />:null}
{/* <!-- timer: set an 'one minute' interval --> */}
{run?<AllCountDown name="Example-5-No-3" visible={false} minutes={1} circular={true} timesUpHandler={this.timesUpHandler_3} />:null}
{/* <!-- timer: set a 'tenth of a second' interval --> */}
{run?<AllCountDown name="Example-5-No-4" visible={false} tenths={1} circular={true} timesUpHandler={this.timesUpHandler_4} />:null}
```
The code above shows how to create a traditional timer with \<AllCountDown\> component in its invisible mode.
| prop | type | required | default | detail |
| ---- | ---- | ---- | ---- | ---- |
| visible | Boolean | No | true | Visible or not.Though invisible,it's still mounted. |
| circular | Boolean | No | false | When time's up,restart it at the initial value or not. |

### Example 6:
```js
import AllCountDown from 'react-all-count-down';

/** pause the countdown named "Example-1-No-1" */
AllCountDown.stop("Example-1-No-1");
/** resume the countdown named "Example-1-No-1" */
AllCountDown.start("Example-1-No-1");
/** restart the countdown named "Example-1-No-1" at 120 seconds */
AllCountDown.start("Example-1-No-1",{seconds:120});
```
The code above shows how to control the countdown in command.Below are the methods:
```js
function start(name,time)
```
| attribute | type | required | default | detail |
| ---- | ---- | ---- | ---- | ---- |
| name | String | Yes | undefined | The name of the countdown. |
| time | Object | No | undefined | What time the countdown starts at. It's an 'Object' has one or more attributes include 'seconds','minutes','hours','days','tenths','hundredths','miliseconds'. |
```js
function stop(name)
```
| attribute | type | required | default | detail |
| ---- | ---- | ---- | ---- | ---- |
| name | String | Yes | undefined | The name of the countdown. |

## License

MIT © huo ziyun
