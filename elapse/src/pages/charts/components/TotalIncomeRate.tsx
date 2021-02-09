import React from "react";
import { RootState } from "../../../store/reducer";
import { connect } from "react-redux";
import "./TotalIncomeRate.css"
import { selectTotalRate } from "../../../store/finance/finance.selectors";
import { MonetaryAmountRate } from "../../../model/MonetaryAmountRate.model";
import { TimeFrameAbbrevations } from "../../../model/TimeFrame.model";

interface Props {
  rate: MonetaryAmountRate
}

const mapStateToProps = (state: RootState): Props => {
  return {
    rate: selectTotalRate(state)
  }
}

const TotalIncomeRate: React.FC<Props> = (props) => {

  return <div>
    Sparquote<br />
     <span className="total-income-rate">
          { props.rate.amount.toFixed(2) } &nbsp;
       <span className="frac">
              <sup>{ props.rate.currency }</sup>
              <span>&frasl;</span>
              <sub>{ TimeFrameAbbrevations[props.rate.timeFrame] }</sub>
            </span>
        </span>
  </div>

}

export default connect(mapStateToProps)(TotalIncomeRate)

