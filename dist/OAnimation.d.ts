import Easing from './Easing';
declare type EasingCallback = string | ((x: number) => number);
declare class OAnimation {
    static oans: {
        [key: string]: OAnimation;
    };
    static countOanLength: number;
    static add(oan: OAnimation): void;
    static remove(oan: OAnimation): void;
    static start(time: number): void;
    static update(time: number): void;
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
    private startEvent?;
    private endEvent?;
    private updateEvent?;
    private cycleEndEvent?;
    private cycleStartEvent?;
    private pauseEvent?;
    private stopEvent?;
    private playEvent?;
    /**
     * 创建动画对象
     * @param {Object} startObject
     * @param {Object} options
     * @param {String|Boolean} options.cycle 循环次数，0为无限循环，默认为1
     * @param {Number} options.timeLength 动画时长
     * @param {Number} options.delay 动画延迟时长
     */
    constructor(startObject: Record<string, number>, { cycle, duration, delayTime, }: {
        cycle?: number;
        duration?: number;
        delayTime?: number;
    });
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
    onStart(startEventCallback: Function): this;
    /**
     * 添加动画结束事件
     * @param {Function} endEventCallback 动画结束
     * @returns
     */
    onEnd(endEventCallback: Function): this;
    /**
     * 添加动画更新事件
     * @param {Function} updateEventCallback 动画更新
     * @returns
     */
    onUpdaye(updateEventCallback: Function): this;
    onCycleStart(cycleStartEventCallback: Function): this;
    /**
     * 添加动画次数结束时事件
     * @param {Function} cycleEventCallback 动画第N次结束
     * @returns
     */
    onCycleEnd(cycleEventCallback: Function): this;
    /**
     * 添加动画暂停时事件
     * @param {Function} pauseEventCallback 动画暂停
     * @returns
     */
    onPause(pauseEventCallback: Function): this;
    /**
     * 添加动画停止时事件
     * @param {Function}} stopEventCallback 动画停止
     * @returns
     */
    onStop(stopEventCallback: Function): this;
    onPlay(playEventCallback: Function): this;
    onUpdate(updateEventCallback: Function): this;
}
export default OAnimation;
//# sourceMappingURL=OAnimation.d.ts.map