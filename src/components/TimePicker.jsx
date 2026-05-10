import './TimePicker.css'

export default function TimePicker({ hour, minute, onHourChange, onMinuteChange }) {
  const incHour = () => onHourChange((hour + 1) % 24)
  const decHour = () => onHourChange((hour + 23) % 24)
  const incMin = () => onMinuteChange((minute + 5) % 60)
  const decMin = () => onMinuteChange((minute + 55) % 60)

  const displayHour = (hour % 12 || 12).toString().padStart(2, '0')
  const displayMin = minute.toString().padStart(2, '0')
  const ampm = hour < 12 ? 'AM' : 'PM'

  return (
    <div className="tp" role="group" aria-label="Wake-up time">
      <div className="tp__unit">
        <button className="tp__arrow" onClick={incHour} aria-label="Increase hour"><i className="fa-solid fa-caret-up" /></button>
        <span className="tp__digit" aria-live="polite">{displayHour}</span>
        <button className="tp__arrow" onClick={decHour} aria-label="Decrease hour"><i className="fa-solid fa-caret-down" /></button>
      </div>

      <span className="tp__colon" aria-hidden="true">:</span>

      <div className="tp__unit">
        <button className="tp__arrow" onClick={incMin} aria-label="Increase minute"><i className="fa-solid fa-caret-up" /></button>
        <span className="tp__digit" aria-live="polite">{displayMin}</span>
        <button className="tp__arrow" onClick={decMin} aria-label="Decrease minute"><i className="fa-solid fa-caret-down" /></button>
      </div>

      {/* <span className="tp__ampm" aria-live="polite">{ampm}</span> */}
    </div>
  )
}
