import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { IonCard, IonCardContent } from "@ionic/react";
import "./ProjectedRate.css"
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import { addNTimeFrames, CustomDate } from "../../../model/CustomDate";
import { TimeFrame } from "../../../model/TimeFrame.model";
import { rateAt } from "../../../store/finance/finance.selectors";
import { CashFlowEntry } from "../../../store/finance/finance.state";
import { Currency } from "../../../model/MonetaryAmount.model";

const ProjectedRate: React.FC = () => {

  const cashFlows = useSelector<RootState, CashFlowEntry[]>(state => state.finance.cashFlow)
  const currentTime = useSelector<RootState, CustomDate>(state => state.environment.currentTime)
  const preferredTimeFrame = useSelector<RootState, TimeFrame>(state => state.settings.preferredTimeFrame)
  const preferredCurrency = useSelector<RootState, Currency>(state => state.settings.preferredCurrency)

  let positive: { x: Date, y: number | null }[] = [];
  let negative: { x: Date, y: number | null }[] = [];


  for (let i = -2; i <= 6; i++) {
    const time = addNTimeFrames(currentTime, preferredTimeFrame, i)
    const rate = rateAt(cashFlows, preferredTimeFrame, preferredCurrency, time)
    const dataPoint = {
      x: new Date(time),
      y: rate.amount
    }
    const emptyPoint = {
      x: new Date(time),
      y: 0
    }
    if (dataPoint.y >= 0) {
      positive.push(dataPoint)
      negative.push(emptyPoint)
    } else {
      negative.push(dataPoint)
      positive.push(emptyPoint)
    }
  }

  const max = Math.max(...[...positive, ...negative].map(c => c.y || 0))
  const min = Math.min(...[...positive, ...negative].map(c => c.y || 0))

  console.log(max, min);

  return <IonCard>
    <IonCardContent>
      <div className={ 'chart' }>
        <ResponsiveLine
            curve={ 'monotoneX' }
            colors={ ['rgb(97, 205, 187)', 'rgb(244, 117, 96)'] }
            data={ [
              {
                id: "positive",
                data: positive
              },
              {
                id: 'negative',
                data: negative
              }
            ] }
            yScale={ {
              type: "linear",
              stacked: false,
              max: max + (Math.abs(max - min) * 0.1),
              min: min - (Math.abs(max - min) * 0.1)
            } }
            xScale={ {
              type: "time",
              precision: "day",
              format: "native"
            } }
            axisBottom={ {
              format: "%b %d"
            } }
            lineWidth={ 6 }
            enablePoints={ false }
            enableGridX={ false }
            enableGridY={ false }
            enableArea={ true }
        />
      </div>
    </IonCardContent>
  </IonCard>
}

export default ProjectedRate
