let now: () => number
if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
	now = function (): number {
		const time = process.hrtime()
		return time[0] * 1000 + time[1] / 1000000
	}
}
else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
	now = self.performance.now.bind(self.performance)
}
else if (Date.now !== undefined) now = Date.now
else {
	now = function (): number {
		return new Date().getTime()
	}
}

export default now