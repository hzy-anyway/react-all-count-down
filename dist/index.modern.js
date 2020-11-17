import React, { Component } from 'react';
import PropTypes from 'prop-types';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var Timer = /*#__PURE__*/function () {
  function Timer(callManager, timerName) {
    this.callManager = callManager;
    this.timerName = timerName;
    this.gap = 1;
    this.count = 0;
    this.count_origin = 0;
    this.circular = false;
    this.intervalId = undefined;
  }

  var _proto = Timer.prototype;

  _proto.setCount = function setCount(count) {
    if (count) {
      this.isCountLessThanZero(count);
      this.count = count;
      this.count_origin = count;
    }
  };

  _proto.addCount = function addCount(count) {
    if (count) {
      this.isCountLessThanZero(count);
      this.count += count;
      this.count_origin += count;
    }
  };

  _proto.setGap = function setGap(gap) {
    if (gap) {
      this.isGapLessThanZero(gap);
      this.gap = gap;
    }
  };

  _proto.setCircular = function setCircular(circular) {
    this.circular = circular;
  };

  _proto.start = function start(count) {
    var _this = this;

    this.setCount(count);
    this.init_or_update("init_from_timer");

    if (this.count > 0) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(function () {
        _this.count -= _this.gap;

        _this.init_or_update("update_from_timer");
      }, this.gap);
    }
  };

  _proto.stop = function stop() {
    clearInterval(this.intervalId);
  };

  _proto.init = function init() {
    this.init_or_update("init_from_timer");
  };

  _proto.init_or_update = function init_or_update(tag) {
    if (this.count === 0) {
      this.callManager(tag, {
        name: this.timerName,
        value: this.count
      });

      if (this.circular) {
        this.count = this.count_origin;
      } else {
        clearInterval(this.intervalId);
      }

      this.callManager("timesup_from_timer", {
        name: this.timerName
      });
    } else {
      this.callManager(tag, {
        name: this.timerName,
        value: this.count
      });
    }
  };

  _proto.isCountLessThanZero = function isCountLessThanZero(count) {
    if (count < 0) {
      throw new Error("'count' can not be less than zero !");
    }
  };

  _proto.isGapLessThanZero = function isGapLessThanZero(gap) {
    if (gap < 0) {
      throw new Error("'gap' can not be less than zero !");
    }
  };

  return Timer;
}();

var day_weight = 24 * 60 * 60 * 1000;
var hour_weight = 60 * 60 * 1000;
var minute_weight = 60 * 1000;
var second_weight = 1000;
var tenth_weight = 100;
var hundredth_weight = 10;
var milisecond_weight = 1;

var Manager = function Manager() {};

Manager.countdowns = {};
Manager.timers = {};

Manager.start = function (name, time) {
  if (!Manager.timers[name]) throw new Error("there's no countdown named '" + name + "'");

  if (name && Manager.timers[name]) {
    if (time) {
      Manager.timers[name].start(Manager.makeCount(time));
    } else {
      Manager.timers[name].start();
    }
  }
};

Manager.stop = function (name) {
  if (!Manager.timers[name]) throw new Error("there's no countdown named '" + name + "'");

  if (name && Manager.timers[name]) {
    Manager.timers[name].stop();
  }
};

Manager.removeTimer = function (name) {
  if (name && Manager.timers[name]) {
    Manager.timers[name].stop();
    Manager.timers[name] = undefined;
  }
};

Manager.makeFilteredValue = function (name, value) {
  var filteredValue = {};
  var parts = Manager.countdowns[name].map(function (element) {
    return element.props.part;
  });
  var sequentialParts = Manager.sequencePartsDes(parts);
  var rest = value;
  sequentialParts.forEach(function (part) {
    switch (part) {
      case "day":
        filteredValue.day = parseInt(rest / day_weight);
        rest = rest % day_weight;
        break;

      case "hour":
        filteredValue.hour = parseInt(rest / hour_weight);
        rest = rest % hour_weight;
        break;

      case "minute":
        filteredValue.minute = parseInt(rest / minute_weight);
        rest = rest % minute_weight;
        break;

      case "second":
        filteredValue.second = parseInt(rest / second_weight);
        rest = rest % second_weight;
        break;

      case "tenth":
        filteredValue.tenth = parseInt(rest / tenth_weight);
        rest = rest % tenth_weight;
        break;

      case "hundredth":
        filteredValue.hundredth = parseInt(rest / hundredth_weight);
        rest = rest % hundredth_weight;
        break;

      case "milisecond":
        filteredValue.milisecond = parseInt(rest);
        break;
    }
  });
  return filteredValue;
};

Manager.callManager = function (eventName, data) {
  if (eventName === "init_from_timer") {
    var name = data.name,
        value = data.value;
    var filteredValue = Manager.makeFilteredValue(name, value);

    for (var i = 0; i < Manager.countdowns[name].length; i++) {
      var element = Manager.countdowns[name][i];
      element.updateValue(filteredValue);
    }
  } else if (eventName === "update_from_timer") {
    var _name = data.name,
        _value = data.value;

    var _filteredValue = Manager.makeFilteredValue(_name, _value);

    for (var _i = 0; _i < Manager.countdowns[_name].length; _i++) {
      var _element = Manager.countdowns[_name][_i];

      _element.updateValue(_filteredValue);

      if (_element.state.previous_value !== _element.state.value && _element.state.value === 0) {
        if (_element.props.zeroHandler) {
          _element.props.zeroHandler();
        }
      }
    }
  } else if (eventName === "timesup_from_timer") {
    var _name2 = data.name;

    for (var _i2 = 0; _i2 < Manager.countdowns[_name2].length; _i2++) {
      var _element2 = Manager.countdowns[_name2][_i2];

      if (_element2.props.timesUpHandler) {
        _element2.props.timesUpHandler();
      }
    }
  } else if (eventName === "create_from_component") {
    var component = data;
    var _component$props = component.props,
        _name3 = _component$props.name,
        circular = _component$props.circular,
        days = _component$props.days,
        hours = _component$props.hours,
        minutes = _component$props.minutes,
        seconds = _component$props.seconds,
        tenths = _component$props.tenths,
        hundredths = _component$props.hundredths,
        miliseconds = _component$props.miliseconds;

    if (!Manager.countdowns[_name3]) {
      Manager.countdowns[_name3] = [component];
    } else {
      Manager.countdowns[_name3].push(component);
    }

    if (!Manager.timers[_name3]) {
      var parts = Manager.countdowns[_name3].map(function (element) {
        return element.props.part;
      });

      var gap_new = Manager.makeGap(parts, {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: tenths,
        hundredths: hundredths,
        miliseconds: miliseconds
      });
      var timer_new = Manager.createTimer(_name3);
      timer_new.setGap(gap_new);
      timer_new.setCircular(circular);
      timer_new.addCount(Manager.makeCount({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: tenths,
        hundredths: hundredths,
        miliseconds: miliseconds
      }));
      Manager.timers[_name3] = timer_new;
    } else {
      var _parts = Manager.countdowns[_name3].map(function (element) {
        return element.props.part;
      });

      var gap = Manager.makeGap(_parts, {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: tenths,
        hundredths: hundredths,
        miliseconds: miliseconds
      });

      Manager.timers[_name3].setGap(gap);

      Manager.timers[_name3].setCircular(circular);

      Manager.timers[_name3].addCount(Manager.makeCount({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: tenths,
        hundredths: hundredths,
        miliseconds: miliseconds
      }));
    }
  } else if (eventName === "mount_from_component") {
    var _component = data;
    var _name4 = _component.props.name;
    _component.ready = true;
    var allComponentsReady = true;
    var startAfterMount = true;

    for (var _i3 = 0; _i3 < Manager.countdowns[_name4].length; _i3++) {
      var _element3 = Manager.countdowns[_name4][_i3];
      allComponentsReady = allComponentsReady && _element3.ready;
      startAfterMount = startAfterMount && _element3.props.startAfterMount;
    }

    if (allComponentsReady) {
      if (startAfterMount) {
        Manager.timers[_name4].start();
      } else {
        Manager.timers[_name4].init();
      }
    }
  } else if (eventName === "destroy_from_component") {
    var _component2 = data;
    var _name5 = _component2.props.name;
    Manager.countdowns[_name5] = Manager.countdowns[_name5].filter(function (element) {
      return element !== _component2;
    });

    if (Manager.countdowns[_name5].length === 0) {
      Manager.countdowns[_name5] = undefined;
      Manager.removeTimer(_name5);
    }
  } else {
    throw new Error('unknown eventName in method "callManager"');
  }
};

Manager.createTimer = function (name) {
  return new Timer(Manager.callManager, name);
};

Manager.sequencePartsDes = function (parts) {
  var partDescentedSeq = ["day", "hour", "minute", "second", "tenth", "hundredth", "milisecond"];
  var result = partDescentedSeq.filter(function (element) {
    return parts.indexOf(element) >= 0;
  });
  return result;
};

Manager.makeGap = function (parts, time_object) {
  var sequentialParts = Manager.sequencePartsDes(parts);
  return Math.min(Manager.make_gap_process_1(sequentialParts), Manager.make_gap_process_2(time_object));
};

Manager.make_gap_process_1 = function (sequentialParts) {
  switch (sequentialParts[sequentialParts.length - 1]) {
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
  }

  return second_weight;
};

Manager.make_gap_process_2 = function (_ref) {
  var days = _ref.days,
      hours = _ref.hours,
      minutes = _ref.minutes,
      seconds = _ref.seconds,
      tenths = _ref.tenths,
      hundredths = _ref.hundredths,
      miliseconds = _ref.miliseconds;
  if (miliseconds) return milisecond_weight;
  if (hundredths) return hundredth_weight;
  if (tenths) return tenth_weight;
  if (seconds) return second_weight;
  if (minutes) return minute_weight;
  if (hours) return hour_weight;
  if (days) return day_weight;
  return second_weight;
};

Manager.makeCount = function (_ref2) {
  var days = _ref2.days,
      hours = _ref2.hours,
      minutes = _ref2.minutes,
      seconds = _ref2.seconds,
      tenths = _ref2.tenths,
      hundredths = _ref2.hundredths,
      miliseconds = _ref2.miliseconds;
  var result = 0;
  if (days) result += days * day_weight;
  if (hours) result += hours * hour_weight;
  if (minutes) result += minutes * minute_weight;
  if (seconds) result += seconds * second_weight;
  if (tenths) result += tenths * tenth_weight;
  if (hundredths) result += hundredths * hundredth_weight;
  if (miliseconds) result += miliseconds * milisecond_weight;
  return result;
};

var AllCountDown = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AllCountDown, _Component);

  function AllCountDown(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.removeTimer = function () {
      Manager.removeTimer(_this.name);
    };

    _this.updateValue = function (data) {
      var previous_value = _this.state.value;
      var value = data[_this.props.part];

      _this.setState({
        previous_value: previous_value,
        value: value
      });
    };

    _this.tellManagerDestroy = function () {
      Manager.callManager("destroy_from_component", _assertThisInitialized(_this));
    };

    _this.ready = false;
    _this.state = {
      value: 0,
      previous_value: 0,
      vm_valueRender: undefined
    };
    Manager.callManager("create_from_component", _assertThisInitialized(_this));
    return _this;
  }

  AllCountDown.start = function start(name, time) {
    if (Manager) {
      Manager.start(name, time);
    } else {
      throw new Error("there's no timer manager");
    }
  };

  AllCountDown.stop = function stop(name) {
    if (Manager) {
      Manager.stop(name);
    } else {
      throw new Error("there's no timer manager");
    }
  };

  var _proto = AllCountDown.prototype;

  _proto.componentDidMount = function componentDidMount() {
    Manager.callManager("mount_from_component", this);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.tellManagerDestroy();
  };

  _proto.render = function render() {
    var value = this.state.value;
    var _this$props = this.props,
        countDownStyle = _this$props.countDownStyle,
        visible = _this$props.visible;
    var ValueRender = this.props.valueRender;

    if (visible && !ValueRender) {
      return /*#__PURE__*/React.createElement("span", {
        style: countDownStyle
      }, value);
    } else if (visible && ValueRender) {
      return /*#__PURE__*/React.createElement(ValueRender, {
        value: value
      });
    } else {
      return null;
    }
  };

  return AllCountDown;
}(Component);

AllCountDown.propTypes = {
  name: PropTypes.string.isRequired,
  part: PropTypes.string,
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  tenths: PropTypes.number,
  hundredths: PropTypes.number,
  miliseconds: PropTypes.number,
  countDownStyle: PropTypes.object,
  timesUpHandler: PropTypes.func,
  zeroHandler: PropTypes.func,
  valueRender: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  visible: PropTypes.bool,
  circular: PropTypes.bool,
  startAfterMount: PropTypes.bool
};
AllCountDown.defaultProps = {
  part: "second",
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  tenths: 0,
  hundredths: 0,
  miliseconds: 0,
  countDownStyle: {},
  visible: true,
  circular: false,
  startAfterMount: true
};

export default AllCountDown;
//# sourceMappingURL=index.modern.js.map
