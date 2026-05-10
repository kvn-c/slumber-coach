const SLEEP_ONSET_MINUTES = 14
const CYCLE_MINUTES = 90

/**
 * Given a desired wake-up time, returns 6 optimal bedtimes.
 * Sorted from most sleep (6 cycles) to least sleep (1 cycle).
 * Top 2 (indices 0–1) are the most ideal.
 */
export function getIdealBedtimes(wakeHour, wakeMinute) {
  const wakeMinutes = wakeHour * 60 + wakeMinute
  const times = []

  for (let cycles = 6; cycles >= 1; cycles--) {
    let bed = wakeMinutes - cycles * CYCLE_MINUTES - SLEEP_ONSET_MINUTES
    bed = ((bed % 1440) + 1440) % 1440
    times.push({
      hour: Math.floor(bed / 60),
      minute: bed % 60,
      cycles,
    })
  }

  return times
}

/**
 * Based on current time, returns 6 optimal wake times.
 * Sorted from least sleep (1 cycle) to most sleep (6 cycles).
 * Bottom 2 (indices 4–5) are the most ideal.
 */
export function getIdealWakeTimes() {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const times = []

  for (let cycles = 1; cycles <= 6; cycles++) {
    const wake = (currentMinutes + SLEEP_ONSET_MINUTES + cycles * CYCLE_MINUTES) % 1440
    times.push({
      hour: Math.floor(wake / 60),
      minute: wake % 60,
      cycles,
    })
  }

  return times
}

export function formatTime(hour, minute) {
  const h = hour % 12 || 12
  const m = minute.toString().padStart(2, '0')
  const ampm = hour < 12 ? 'AM' : 'PM'
  return `${h}:${m} ${ampm}`
}
