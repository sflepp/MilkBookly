import { FC } from 'react'
import './ExploreContainer.css';

interface ContainerProps {
  amountOfSeconds: number;
}

const SecondsFormatter: FC<ContainerProps> = ({ amountOfSeconds }) => {

  const oneYear = 365 * 24 * 60 * 60
  const oneMonth = (365 / 12) * 24 * 60 * 60
  const oneWeek = 7 * 24 * 60 * 60
  const oneDay = 24 * 60 * 60
  const oneHour = 60 * 60
  const oneMinute = 60

  if (amountOfSeconds > oneYear) {
    const years = Math.floor(amountOfSeconds / oneYear)
    const months = Math.floor((amountOfSeconds - (years * oneYear)) / oneMonth)

    return <>
      <span>{years} {years > 1 ? 'Jahre' : 'Jahr'} </span>
      {months > 0 && <span>{months} {months > 1 ? 'Monate' : 'Monat'} </span>}
    </>
  }

  if (amountOfSeconds > oneMonth) {
    const months = Math.floor(amountOfSeconds / oneMonth);
    const weeks = Math.floor((amountOfSeconds - (months * oneMonth)) / oneWeek)

    return <>
      <span>{months} {months > 1 ? 'Monate' : 'Monat'} </span>
      {weeks > 0 && <span>{weeks} {weeks > 1 ? 'Wochen' : 'Woche'} </span>}
    </>
  }

  if (amountOfSeconds > oneDay) {
    const days = Math.floor(amountOfSeconds / oneDay);
    const hours = Math.floor((amountOfSeconds - (days * oneDay)) / oneHour)

    return <>
      <span>{days} {days > 1 ? 'Tage' : 'Tag'} </span>
      {hours > 0 && <span>{hours} {hours > 1 ? 'Stunden' : 'Stunde'} </span>}
    </>
  }

  const hours = Math.floor(amountOfSeconds / oneHour)
  const minutes = Math.floor((amountOfSeconds - (hours * oneHour)) / oneHour)
  const seconds = Math.floor((amountOfSeconds - (hours * oneHour) - (minutes * oneMinute)) / oneMinute);


  return <>
    <span>{hours} {hours > 1 ? 'Stunden' : 'Stunde'} </span>
    {minutes > 0 && <span>{minutes} {minutes > 1 ? 'Minuten' : 'Minute'} </span>}
    {seconds > 0 && <span>{seconds} {seconds > 1 ? 'Sekunden' : 'Sekunde'} </span>}
  </>
};

export default SecondsFormatter;
