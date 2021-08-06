import { now } from "./utils"
import Easing from './Easing'

type EasingCallback = string | ((x:number) => number)
let nextId = 0
let defaultEasingCallback = (progress:number) => progress
interface Options {
    cycle?: number,
    duration?: number,
    delayTime?: number,
}
class OAnimation {

    static oans:{[key: string]: OAnimation} = {};
    static countOanLength: number = 0

    static add(oan: OAnimation) {
        if (OAnimation.oans[oan.getId()]) return
        OAnimation.oans[oan.getId()] = oan
        OAnimation.countOanLength++
        if (OAnimation.countOanLength === 1) OAnimation.start(now())
    }

    static remove(oan: OAnimation) {
        delete OAnimation.oans[oan.getId()]
        OAnimation.countOanLength--
    }

    static start(time: number) {
        if (OAnimation.countOanLength === 0) return
        OAnimation.update(time)
        requestAnimationFrame(OAnimation.start)
    }

    static update(time: number) {
        Object.values(OAnimation.oans).forEach(oan => oan.update(time))
    }

    static pause() {
        Object.values(OAnimation.oans).forEach(oan => oan.pause())
    }
    
    static Easing = Easing

    

    private id = nextId++

    private endDataCopy: Record<string, number> = {}
    private startDataCopy: Record<string, number> = {}
    private currentData: Record<string, number> = {}
    private duration: number
    private playing: Boolean = false
    private cycle: number
    private delayTime: number
    private countCycle: number = 0 //当前动画循环了几次
    private currentTime: number = 0 //当前动画执行到第几毫秒
    private startTime: number = 0 //动画开始时间
    private isPause: boolean = false //是否动画暂停
    private easingCallback: (progress:number) => number

    private startEvent?: Function
    private endEvent?: Function
    private updateEvent?: Function
    private cycleEndEvent?: Function
    private cycleStartEvent?: Function
    private pauseEvent?: Function
    private stopEvent?: Function
    private playEvent?: Function
    
    
    /**
     * 创建动画对象
     * @param {Object} startObject 
     * @param {Object} options 
     * @param {String|Boolean} options.cycle 循环次数，0为无限循环，默认为1
     * @param {Number} options.timeLength 动画时长
     * @param {Number} options.delay 动画延迟时长
     */
    constructor (startObject: Record<string, number>, options?:Options) {
        this.startDataCopy = {...startObject}
        this.duration = options?.duration || 3000
        this.cycle = options?.cycle || 1
        this.delayTime = options?.delayTime || 0
        this.easingCallback = defaultEasingCallback
    }

    /**
     * 返回id
     * @returns {Number}
     */
    getId(): number {
        return this.id
    }

    startData(data: Record<string, number>) {
        this.startDataCopy = {...data}
        return this
    }

    /**
     * 动画是否执行
     * @returns {Boolean}
     */
    isPlaying(): Boolean {
        return this.playing
    }
    
    setDuration(duration: number): this {
        this.duration = duration
        return this
    }

    easing(easingCallback: EasingCallback): this {
        if (typeof easingCallback === 'string') {
            this.easingCallback = OAnimation.Easing.find(easingCallback)
        } else {
            this.easingCallback = easingCallback
        }
        return this
    }

    /**
     * 动画开始
     * @returns 
     */
    start(): this {
        if (this.playing) return this
        this.currentData = {...this.startDataCopy}
        this.startEvent && this.startEvent(this.currentData, this)
        this.play()
        return this
    }

    

    /**
     * 添加动画结束时数据
     * @param data 动画结束数据
     * @returns 
     */
    to(data: Record<string, number>): this{
        this.endDataCopy = {...data}
        return this
    }

    play(): this {
        if (this.playing) return this
        this.playing = true
        this.playEvent && this.playEvent(this.currentData, this)
        
        if (!this.isPause) {
            this.cycleStart()
            return this
        }
        if (this.isPause) {
            this.isPause = false
            this.startTime = now() - this.currentTime
        }
        
        OAnimation.add(this)
        this.isPause = false
        return this
    }

    cycleStart():this {
        this.playing = true
        this.currentData = {...this.startDataCopy}
        this.cycleStartEvent && this.cycleStartEvent(this.currentData, this)
        this.startTime = now() + this.delayTime
        OAnimation.add(this)
        return this
    }

    hasPause():boolean {
        return this.isPause
    }
    pause():this {
        OAnimation.remove(this)
        this.playing = false
        this.isPause = true
        this.pauseEvent && this.pauseEvent(this.currentData, this)
        return this
    }

    stop():this {
        OAnimation.remove(this)
        this.playing = false
        this.currentData = {...this.startDataCopy}
        this.countCycle = 0
        this.isPause = false
        this.stopEvent && this.stopEvent(this.currentData, this)
        return this
    }

    end():this {
        OAnimation.remove(this)
        this.playing = false
        this.endEvent && this.endEvent()
        this.countCycle = 0
        return this
    }

    cycleEnd():this {
        this.currentData = {...this.endDataCopy}
        this.updateEvent && this.updateEvent(this.currentData, this)
        this.cycleEndEvent && this.cycleEndEvent(this.currentData, this)
        this.countCycle++
       
        if (this.countCycle === this.cycle) {
            this.end()
        } else {
            this.currentTime = 0
            this.cycleStart()
            return this
        }
        return this
    }

    update(time: number): this{
        let hasStart = time > this.startTime
        if (!hasStart) return this
        if (time - this.startTime > this.duration) {
            this.cycleEnd()
            return this
        }
        this.currentTime = time - this.startTime
        this.updateData(time)
        this.updateEvent && this.updateEvent(this.currentData, this)
        return this
    }

    private updateData(time: number):this {
        let progress = ( time - this.startTime ) / this.duration
		progress = this.duration === 0 || progress > 1 ? 1 : progress
        progress = this.easingCallback(progress)

        Object.keys(this.endDataCopy).forEach(key => {
            let endData = this.endDataCopy[key]
            let startData = this.startDataCopy[key]
            this.currentData[key] = (endData - startData) * progress + startData
        })
        return this
    }
    /**
     * 添加动画开始事件
     * @param {Function} startEventCallback 动画开始
     * @returns
     */
    onStart(startEventCallback: Function):this {
        this.startEvent = startEventCallback
        return this
    }

    /**
     * 添加动画结束事件
     * @param {Function} endEventCallback 动画结束
     * @returns
     */
    onEnd(endEventCallback: Function):this {
        this.endEvent = endEventCallback
        return this
    }

    /**
     * 添加动画更新事件
     * @param {Function} updateEventCallback 动画更新
     * @returns
     */
    onUpdaye(updateEventCallback: Function):this {
        this.updateEvent = updateEventCallback
        return this
    }
    
    onCycleStart(cycleStartEventCallback: Function) {
        this.cycleStartEvent = cycleStartEventCallback
        return this
    }

    /**
     * 添加动画次数结束时事件
     * @param {Function} cycleEventCallback 动画第N次结束
     * @returns
     */
    onCycleEnd(cycleEventCallback: Function):this {
        this.cycleEndEvent = cycleEventCallback
        return this
    }

    /**
     * 添加动画暂停时事件
     * @param {Function} pauseEventCallback 动画暂停
     * @returns 
     */
    onPause(pauseEventCallback: Function):this {
        this.pauseEvent = pauseEventCallback
        return this
    }

    /**
     * 添加动画停止时事件
     * @param {Function}} stopEventCallback 动画停止
     * @returns 
     */
    onStop(stopEventCallback: Function):this {
        this.stopEvent = stopEventCallback
        return this
    }

    onPlay(playEventCallback: Function):this {
        this.playEvent = playEventCallback
        return this
    }

    onUpdate(updateEventCallback: Function):this {
        this.updateEvent = updateEventCallback
        return this
    }
}
export default OAnimation