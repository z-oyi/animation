(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.OAnimation = factory());
}(this, (function () { 'use strict';

	var now$1;
	if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
	    now$1 = function () {
	        var time = process.hrtime();
	        return time[0] * 1000 + time[1] / 1000000;
	    };
	}
	else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
	    now$1 = self.performance.now.bind(self.performance);
	}
	else if (Date.now !== undefined)
	    { now$1 = Date.now; }
	else {
	    now$1 = function () {
	        return new Date().getTime();
	    };
	}
	var _now = now$1;

	var now = _now;

	var pow = Math.pow, sqrt = Math.sqrt, sin = Math.sin, cos = Math.cos, PI = Math.PI, c1 = 1.70158, c2 = c1 * 1.525, c3 = c1 + 1, c4 = (2 * PI) / 3, c5 = (2 * PI) / 4.5;
	var bounceOut = function (x) {
	    var n1 = 7.5625, d1 = 2.75;
	    if (x < 1 / d1) {
	        return n1 * x * x;
	    }
	    else if (x < 2 / d1) {
	        return n1 * (x -= (1.5 / d1)) * x + .75;
	    }
	    else if (x < 2.5 / d1) {
	        return n1 * (x -= (2.25 / d1)) * x + .9375;
	    }
	    else {
	        return n1 * (x -= (2.625 / d1)) * x + .984375;
	    }
	};
	var easings = {
	    swing: function (x) {
	        return x;
	    },
	    easeInQuad: function (x) {
	        return x * x;
	    },
	    easeOutQuad: function (x) {
	        return 1 - (1 - x) * (1 - x);
	    },
	    easeInOutQuad: function (x) {
	        return x < 0.5 ?
	            2 * x * x :
	            1 - pow(-2 * x + 2, 2) / 2;
	    },
	    easeInCubic: function (x) {
	        return x * x * x;
	    },
	    easeOutCubic: function (x) {
	        return 1 - pow(1 - x, 3);
	    },
	    easeInOutCubic: function (x) {
	        return x < 0.5 ?
	            4 * x * x * x :
	            1 - pow(-2 * x + 2, 3) / 2;
	    },
	    easeInQuart: function (x) {
	        return x * x * x * x;
	    },
	    easeOutQuart: function (x) {
	        return 1 - pow(1 - x, 4);
	    },
	    easeInOutQuart: function (x) {
	        return x < 0.5 ?
	            8 * x * x * x * x :
	            1 - pow(-2 * x + 2, 4) / 2;
	    },
	    easeInQuint: function (x) {
	        return x * x * x * x * x;
	    },
	    easeOutQuint: function (x) {
	        return 1 - pow(1 - x, 5);
	    },
	    easeInOutQuint: function (x) {
	        return x < 0.5 ?
	            16 * x * x * x * x * x :
	            1 - pow(-2 * x + 2, 5) / 2;
	    },
	    easeInSine: function (x) {
	        return 1 - cos(x * PI / 2);
	    },
	    easeOutSine: function (x) {
	        return sin(x * PI / 2);
	    },
	    easeInOutSine: function (x) {
	        return -(cos(PI * x) - 1) / 2;
	    },
	    easeInExpo: function (x) {
	        return x === 0 ? 0 : pow(2, 10 * x - 10);
	    },
	    easeOutExpo: function (x) {
	        return x === 1 ? 1 : 1 - pow(2, -10 * x);
	    },
	    easeInOutExpo: function (x) {
	        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
	            pow(2, 20 * x - 10) / 2 :
	            (2 - pow(2, -20 * x + 10)) / 2;
	    },
	    easeInCirc: function (x) {
	        return 1 - sqrt(1 - pow(x, 2));
	    },
	    easeOutCirc: function (x) {
	        return sqrt(1 - pow(x - 1, 2));
	    },
	    easeInOutCirc: function (x) {
	        return x < 0.5 ?
	            (1 - sqrt(1 - pow(2 * x, 2))) / 2 :
	            (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
	    },
	    easeInElastic: function (x) {
	        return x === 0 ? 0 : x === 1 ? 1 :
	            -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
	    },
	    easeOutElastic: function (x) {
	        return x === 0 ? 0 : x === 1 ? 1 :
	            pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
	    },
	    easeInOutElastic: function (x) {
	        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
	            -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 :
	            pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
	    },
	    easeInBack: function (x) {
	        return c3 * x * x * x - c1 * x * x;
	    },
	    easeOutBack: function (x) {
	        return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
	    },
	    easeInOutBack: function (x) {
	        return x < 0.5 ?
	            (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
	            (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	    },
	    easeInBounce: function (x) {
	        return 1 - bounceOut(1 - x);
	    },
	    easeOutBounce: bounceOut,
	    easeInOutBounce: function (x) {
	        return x < 0.5 ?
	            (1 - bounceOut(1 - 2 * x)) / 2 :
	            (1 + bounceOut(2 * x - 1)) / 2;
	    }
	};
	var Easing = function Easing () {};

	Easing.extend = function extend (name, easing) {
	    easings[name] = easing;
	};
	Easing.find = function find (name) {
	    if (easings[name])
	        { return easings[name]; }
	    return easings.swing;
	};

	var nextId = 0;
	var defaultEasingCallback = function (progress) { return progress; };
	var OAnimation = function OAnimation(startObject, options) {
	    this.id = nextId++;
	    this.endDataCopy = {};
	    this.startDataCopy = {};
	    this.currentData = {};
	    this.duration = 3000;
	    this.playing = false;
	    this.cycle = 1;
	    this.delayTime = 0;
	    this.countCycle = 0; //当前动画循环了几次
	    this.currentTime = 0; //当前动画执行到第几毫秒
	    this.startTime = 0; //动画开始时间
	    this.isPause = false; //是否动画暂停
	    this.startEvent = null;
	    this.endEvent = null;
	    this.updateEvent = null;
	    this.cycleEndEvent = null;
	    this.cycleStartEvent = null;
	    this.pauseEvent = null;
	    this.stopEvent = null;
	    this.playEvent = null;
	    this.startDataCopy = Object.assign({}, startObject);
	    this.duration = (options === null || options === void 0 ? void 0 : options.duration) || 3000;
	    this.cycle = (options === null || options === void 0 ? void 0 : options.cycle) === undefined ? 1 : options === null || options === void 0 ? void 0 : options.cycle;
	    this.delayTime = (options === null || options === void 0 ? void 0 : options.delayTime) || 0;
	    this.easingCallback = defaultEasingCallback;
	    console.log(this.duration);
	    console.log(this.cycle);
	};
	OAnimation.add = function add (oan) {
	    if (OAnimation.oans[oan.getId()])
	        { return; }
	    OAnimation.oans[oan.getId()] = oan;
	    OAnimation.countOanLength++;
	    if (OAnimation.countOanLength === 1)
	        { OAnimation.start(now()); }
	};
	OAnimation.remove = function remove (oan) {
	    delete OAnimation.oans[oan.getId()];
	    OAnimation.countOanLength--;
	};
	OAnimation.start = function start (time) {
	    if (OAnimation.countOanLength === 0)
	        { return; }
	    OAnimation.update(time);
	    requestAnimationFrame(OAnimation.start);
	};
	OAnimation.update = function update (time) {
	    Object.values(OAnimation.oans).forEach(function (oan) { return oan.update(time); });
	};
	OAnimation.pause = function pause () {
	    Object.values(OAnimation.oans).forEach(function (oan) { return oan.pause(); });
	};
	/**
	 * 返回id
	 * @returns {Number}
	 */
	OAnimation.prototype.getId = function getId () {
	    return this.id;
	};
	OAnimation.prototype.startData = function startData (data) {
	    this.startDataCopy = Object.assign({}, data);
	    return this;
	};
	/**
	 * 动画是否执行
	 * @returns {Boolean}
	 */
	OAnimation.prototype.isPlaying = function isPlaying () {
	    return this.playing;
	};
	OAnimation.prototype.setDuration = function setDuration (duration) {
	    this.duration = duration;
	    return this;
	};
	OAnimation.prototype.easing = function easing (easingCallback) {
	    if (typeof easingCallback === 'string') {
	        this.easingCallback = OAnimation.Easing.find(easingCallback);
	    }
	    else {
	        this.easingCallback = easingCallback;
	    }
	    return this;
	};
	/**
	 * 动画开始
	 * @returns
	 */
	OAnimation.prototype.start = function start () {
	    if (this.playing)
	        { return this; }
	    this.currentData = Object.assign({}, this.startDataCopy);
	    this.startEvent && this.startEvent(this.currentData, this);
	    this.play();
	    return this;
	};
	/**
	 * 添加动画结束时数据
	 * @param data 动画结束数据
	 * @returns
	 */
	OAnimation.prototype.to = function to (data) {
	    this.endDataCopy = Object.assign({}, data);
	    return this;
	};
	OAnimation.prototype.play = function play () {
	    if (this.playing)
	        { return this; }
	    this.playing = true;
	    this.playEvent && this.playEvent(this.currentData, this);
	    if (!this.isPause) {
	        this.cycleStart();
	        return this;
	    }
	    if (this.isPause) {
	        this.isPause = false;
	        this.startTime = now() - this.currentTime;
	    }
	    OAnimation.add(this);
	    this.isPause = false;
	    return this;
	};
	OAnimation.prototype.cycleStart = function cycleStart () {
	    this.playing = true;
	    this.currentData = Object.assign({}, this.startDataCopy);
	    this.cycleStartEvent && this.cycleStartEvent(this.currentData, this);
	    this.startTime = now() + this.delayTime;
	    OAnimation.add(this);
	    return this;
	};
	OAnimation.prototype.hasPause = function hasPause () {
	    return this.isPause;
	};
	OAnimation.prototype.pause = function pause () {
	    OAnimation.remove(this);
	    this.playing = false;
	    this.isPause = true;
	    this.pauseEvent && this.pauseEvent(this.currentData, this);
	    return this;
	};
	OAnimation.prototype.stop = function stop () {
	    OAnimation.remove(this);
	    this.playing = false;
	    this.currentData = Object.assign({}, this.startDataCopy);
	    this.countCycle = 0;
	    this.isPause = false;
	    this.stopEvent && this.stopEvent(this.currentData, this);
	    return this;
	};
	OAnimation.prototype.end = function end () {
	    OAnimation.remove(this);
	    this.playing = false;
	    this.endEvent && this.endEvent();
	    this.countCycle = 0;
	    return this;
	};
	OAnimation.prototype.cycleEnd = function cycleEnd () {
	    this.currentData = Object.assign({}, this.endDataCopy);
	    this.updateEvent && this.updateEvent(this.currentData, this);
	    this.cycleEndEvent && this.cycleEndEvent(this.currentData, this);
	    this.countCycle++;
	    if (this.countCycle === this.cycle) {
	        this.end();
	    }
	    else {
	        this.currentTime = 0;
	        this.cycleStart();
	        return this;
	    }
	    return this;
	};
	OAnimation.prototype.update = function update (time) {
	    var hasStart = time > this.startTime;
	    if (!hasStart)
	        { return this; }
	    if (time - this.startTime > this.duration) {
	        this.cycleEnd();
	        return this;
	    }
	    this.currentTime = time - this.startTime;
	    this.updateData(time);
	    this.updateEvent && this.updateEvent(this.currentData, this);
	    return this;
	};
	OAnimation.prototype.updateData = function updateData (time) {
	        var this$1$1 = this;

	    var progress = (time - this.startTime) / this.duration;
	    progress = this.duration === 0 || progress > 1 ? 1 : progress;
	    progress = this.easingCallback(progress);
	    Object.keys(this.endDataCopy).forEach(function (key) {
	        var endData = this$1$1.endDataCopy[key];
	        var startData = this$1$1.startDataCopy[key];
	        this$1$1.currentData[key] = (endData - startData) * progress + startData;
	    });
	    return this;
	};
	/**
	 * 添加动画开始事件
	 * @param {Function} startEventCallback 动画开始
	 * @returns
	 */
	OAnimation.prototype.onStart = function onStart (startEventCallback) {
	    this.startEvent = startEventCallback;
	    return this;
	};
	/**
	 * 添加动画结束事件
	 * @param {Function} endEventCallback 动画结束
	 * @returns
	 */
	OAnimation.prototype.onEnd = function onEnd (endEventCallback) {
	    this.endEvent = endEventCallback;
	    return this;
	};
	/**
	 * 添加动画更新事件
	 * @param {Function} updateEventCallback 动画更新
	 * @returns
	 */
	OAnimation.prototype.onUpdaye = function onUpdaye (updateEventCallback) {
	    this.updateEvent = updateEventCallback;
	    return this;
	};
	OAnimation.prototype.onCycleStart = function onCycleStart (cycleStartEventCallback) {
	    this.cycleStartEvent = cycleStartEventCallback;
	    return this;
	};
	/**
	 * 添加动画次数结束时事件
	 * @param {Function} cycleEventCallback 动画第N次结束
	 * @returns
	 */
	OAnimation.prototype.onCycleEnd = function onCycleEnd (cycleEventCallback) {
	    this.cycleEndEvent = cycleEventCallback;
	    return this;
	};
	/**
	 * 添加动画暂停时事件
	 * @param {Function} pauseEventCallback 动画暂停
	 * @returns
	 */
	OAnimation.prototype.onPause = function onPause (pauseEventCallback) {
	    this.pauseEvent = pauseEventCallback;
	    return this;
	};
	/**
	 * 添加动画停止时事件
	 * @param {Function}} stopEventCallback 动画停止
	 * @returns
	 */
	OAnimation.prototype.onStop = function onStop (stopEventCallback) {
	    this.stopEvent = stopEventCallback;
	    return this;
	};
	OAnimation.prototype.onPlay = function onPlay (playEventCallback) {
	    this.playEvent = playEventCallback;
	    return this;
	};
	OAnimation.prototype.onUpdate = function onUpdate (updateEventCallback) {
	    this.updateEvent = updateEventCallback;
	    return this;
	};
	OAnimation.oans = {};
	OAnimation.countOanLength = 0;
	OAnimation.Easing = Easing;

	new OAnimation({ x: 0 }, {});

	return OAnimation;

})));
