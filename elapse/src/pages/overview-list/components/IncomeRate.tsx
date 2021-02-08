import React from "react";
import { TimeFrame, TimeFrameAbbrevations } from "../../../model/TimeFrame.model";
import { CashFlowEntry } from "../../../store/finance/finance.state";
import { rate } from "../../../model/MonetaryAmountRate.model";
import './IncomeRate.css'

interface Props {
  others: CashFlowEntry[]
  timeFrame: TimeFrame
  cashFlow: CashFlowEntry
}

const IncomeRate: React.FC<Props> = (props) => {
  const max = props.others
      .filter(c => c.type === props.cashFlow.type)
      .map(c => rate(props.timeFrame, c))
      .sort((a, b) => b.amount - a.amount)[0]
  const incomeRate = rate(props.timeFrame, props.cashFlow)
  const ratio = (incomeRate.amount / max.amount);
  const colorCode = Math.min(255.0, 155.0 + (ratio * 100.0))
  const color = props.cashFlow.type === 'income' ? `rgba(80, ${ colorCode }, 80, 1)` : `rgba(${ colorCode }, 80, 80, 1)`

  return (
      <>
        <span className="rate-badge" style={ { color: color, fontSize: '0.75em' } }>
          { props.cashFlow.type === 'income' ? '+' : '-' }
          { incomeRate.amount.toFixed(2) } &nbsp;
          <span className="frac">
            <sup>{ incomeRate.currency }</sup>
            <span>&frasl;</span>
            <sub>{ TimeFrameAbbrevations[incomeRate.timeFrame] }</sub>
          </span>
        </span>
      </>
  );
};

export default IncomeRate