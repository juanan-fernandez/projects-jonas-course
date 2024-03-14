import styles from './Calendar.module.css'
import {
	daysInMonth,
	getMonthName,
	getMonthNumber,
	getCurrentNumberDay,
	getRandomKey,
	firstDayOfDate,
	isValidDate
} from './date-module'
import { useEffect, useState } from 'react'

type Day = {
	day: number
	isCurrentMonth: boolean
}

type CalendarProps = {
	width?: string
	updateDate?: (date: string) => void
	selectDate?: string
}

export default function Calendar({ width = '50%', updateDate, selectDate = '' }: CalendarProps) {
	const initMonth = () => (isValidDate(selectDate) ? getMonthNumber(new Date(selectDate)) : getMonthNumber(new Date()))
	const initYear = () => (isValidDate(selectDate) ? new Date(selectDate).getFullYear() : new Date().getFullYear())

	const [month, setMonth] = useState(initMonth)
	const [year, setYear] = useState(initYear)
	const [days, setDays] = useState<Day[]>([])

	const setUpCalendar = () => {
		let calDays: Day[] = []
		const firstDay = firstDayOfDate(new Date(year, month))
		const lastDay = daysInMonth(new Date(year, month + 1, 0))
		const lastDayPrevMonth = daysInMonth(new Date(year, month, 0))
		let firsDayOfCalendar = lastDayPrevMonth - firstDay + 1
		let dayOfMonth = 1

		while (firsDayOfCalendar <= lastDayPrevMonth) {
			calDays.push({ day: firsDayOfCalendar, isCurrentMonth: false })
			firsDayOfCalendar++
		}

		while (dayOfMonth <= lastDay) {
			calDays.push({ day: dayOfMonth, isCurrentMonth: true })
			dayOfMonth++
		}

		setDays(calDays)
		calDays = []
		return
	}

	const itsTodaysDate = (dayCal: number) => {
		const today = new Date(new Date().getFullYear(), getMonthNumber(new Date()), getCurrentNumberDay(new Date()))
		const calDay = new Date(year, month, dayCal)

		return today.getTime() === calDay.getTime()
	}

	const itsSelectedDate = (dayCal: number) => {
		if (!isValidDate(selectDate)) return false
		const selected = new Date(selectDate)
		const calDay = new Date(year, month, dayCal)

		return selected.getTime() === calDay.getTime()
	}

	useEffect(() => {
		setUpCalendar()
	}, [month, year])

	useEffect(() => {
		if (isValidDate(selectDate)) {
			const convertSelectedDate = new Date(selectDate).toISOString()
			setMonth(getMonthNumber(new Date(convertSelectedDate)))
			setYear(new Date(convertSelectedDate).getFullYear())
		}
	}, [selectDate])

	const prevMonth = (ev: React.MouseEvent) => {
		ev.preventDefault()
		if (month === 0) {
			setMonth(11)
			setYear(year - 1)
			return
		}
		setMonth(prv => prv - 1)
		return
	}

	const nextMonth = (ev: React.MouseEvent) => {
		ev.preventDefault()
		if (month === 11) {
			setMonth(0)
			setYear(prv => prv + 1)
			return
		}
		setMonth(prv => prv + 1)
		return
	}

	const onSelectDay = (day: number) => {
		const selectedDate = new Date(year, month, day).toISOString()
		if (typeof updateDate === 'function') updateDate(selectedDate)
	}

	const styleInLine = { width: width }

	const renderCalendar = () => {
		const calendar = days.map((day, idx) => {
			return (
				<div
					style={{ cursor: 'pointer' }}
					onClick={() => onSelectDay(day.day)}
					key={getRandomKey() + idx + day.day}
					className={`${itsTodaysDate(day.day) ? styles.today : ''} ${
						day.isCurrentMonth ? '' : styles['day--not-current-month']
					} ${itsSelectedDate(day.day) ? styles.selected : ''}`}
				>
					{day.day}
				</div>
			)
		})
		return calendar
	}

	return (
		<div className={styles.calendar} style={styleInLine}>
			<div className={styles.calendar__date}>
				<button onClick={prevMonth}>
					<svg width='23' height='28' viewBox='0 0 23 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M17.1119 34.4854L0.150391 17.5319L17.1119 0.582153L22.5454 6.0119L11.0174 17.5319L22.5454 29.0518L17.1119 34.4854Z'
							fill='#00c46a'
						/>
					</svg>
				</button>
				{getMonthName(month)} - {year}
				<button onClick={nextMonth}>
					<svg width='23' height='28' viewBox='0 0 23 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M5.88191 34.4854L0.448395 29.0518L11.9764 17.5319L0.448395 6.0119L5.88191 0.582153L22.8434 17.5319L5.88191 34.4854Z'
							fill='#00c46a'
						/>
					</svg>
				</button>
			</div>
			<div className={styles.calendar__days}>
				<div>Su</div>
				<div>Mo</div>
				<div>Tu</div>
				<div>Wd</div>
				<div>Th</div>
				<div>Fr</div>
				<div>Sa</div>
			</div>
			<div className={styles.calendar__numbers}>{renderCalendar()}</div>
		</div>
	)
}
