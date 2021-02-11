import React from "react";
import { RootState } from "../../../store/reducer";
import { connect } from "react-redux";
import { selectCurrentTimeFrameRate } from "../../../store/finance/finance.selectors";
import { MonetaryAmountRate } from "../../../model/MonetaryAmountRate.model";
import { TimeFrameTranslationsNoun } from "../../../model/TimeFrame.model";
import NumberCard from "./NumberCard";

interface Props {
  rate: MonetaryAmountRate
}

const mapStateToProps = (state: RootState): Props => {
  return {
    rate: selectCurrentTimeFrameRate(state)
  }
}

const TotalIncomeRate: React.FC<Props> = (props) => {
  return <NumberCard
      title={ 'Sparquote' }
      number={ props.rate.amount }
      unit={ `${ props.rate.currency } pro ${ TimeFrameTranslationsNoun[props.rate.timeFrame] }` }/>
}

export default connect(mapStateToProps)(TotalIncomeRate)

