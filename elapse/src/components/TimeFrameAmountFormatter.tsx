import { FC } from 'react'
import { TimeFrameAmount } from '../model/TimeFrame.model'
import './ExploreContainer.css';

interface ContainerProps {
  value: TimeFrameAmount;
}

const TimeFrameAmountFormatter: FC<ContainerProps> = ({ value }) => {

  if (value.timeFrame === 'YEAR') {
    return <span>{value.amount} {value.amount === 1 ? 'Jahr' : 'Jahre'}</span>
  }
  if (value.timeFrame === 'MONTH') {
    return <span>{value.amount} {value.amount === 1 ? 'Monat' : 'Monate'}</span>
  }
  if (value.timeFrame === 'WEEK') {
    return <span>{value.amount} {value.amount === 1 ? 'Woche' : 'Wochen'}</span>
  }
  if (value.timeFrame === 'DAY') {
    return <span>{value.amount} {value.amount === 1 ? 'Tag' : 'Tage'}</span>
  }

  return <></>

};

export default TimeFrameAmountFormatter;
