declare class Easing {
    static extend(name: string, easing: (x: number) => number): void;
    static find(name: string): (x: number) => number;
}

declare type EasingCallback = string | ((x: number) => number);
interface Options {
    cycle?: number;
    duration?: number;
    delayTime?: number;
}
declare type eventCallback = null | ((data?: Record<string, number>, an?: OAnimation) => void);
declare class OAnimation {
    private static oans;
    private static countOanLength;
    private static add;
    private static remove;
    private static start;
    private static update;
    static pause(): void;
    static Easing: typeof Easing;
    private id;
    private endDataCopy;
    private startDataCopy;
    private currentData;
    private duration;
    private playing;
    private cycle;
    private delayTime;
    private countCycle;
    private currentTime;
    private startTime;
    private isPause;
    private easingCallback;
    private startEvent;
    private endEvent;
    private updateEvent;
    private cycleEndEvent;
    private cycleStartEvent;
    private pauseEvent;
    private stopEvent;
    private playEvent;
    constructor(startObject: Record<string, number>, options?: Options);
    /**
     * 返回id
     * @returns {Number}
     */
    getId(): number;
    startData(data: Record<string, number>): this;
    /**
     * 动画是否执行
     * @returns {Boolean}
     */
    isPlaying(): Boolean;
    setDuration(duration: number): this;
    easing(easingCallback: EasingCallback): this;
    /**
     * 动画开始
     * @returns
     */
    start(): this;
    /**
     * 添加动画结束时数据
     * @param data 动画结束数据
     * @returns
     */
    to(data: Record<string, number>): this;
    play(): this;
    cycleStart(): this;
    hasPause(): boolean;
    pause(): this;
    stop(): this;
    end(): this;
    cycleEnd(): this;
    update(time: number): this;
    private updateData;
    /**
     * 添加动画开始事件
     * @param {Function} startEventCallback 动画开始
     * @returns
     */
    onStart(startEventCallback: eventCallback): this;
    /**
     * 添加动画结束事件
     * @param {Function} endEventCallback 动画结束
     * @returns
     */
    onEnd(endEventCallback: eventCallback): this;
    /**
     * 添加动画更新事件
     * @param {Function} updateEventCallback 动画更新
     * @returns
     */
    onUpdaye(updateEventCallback: eventCallback): this;
    onCycleStart(cycleStartEventCallback: eventCallback): this;
    /**
     * 添加动画次数结束时事件
     * @param {Function} cycleEventCallback 动画第N次结束
     * @returns
     */
    onCycleEnd(cycleEventCallback: eventCallback): this;
    /**
     * 添加动画暂停时事件
     * @param {Function} pauseEventCallback 动画暂停
     * @returns
     */
    onPause(pauseEventCallback: eventCallback): this;
    /**
     * 添加动画停止时事件
     * @param {Function}} stopEventCallback 动画停止
     * @returns
     */
    onStop(stopEventCallback: eventCallback): this;
    onPlay(playEventCallback: eventCallback): this;
    onUpdate(updateEventCallback: eventCallback): this;
}

export default OAnimation;
