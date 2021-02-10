import React, { useEffect, useState } from "react";
import { RootState } from "../../../store/reducer";
import { connect } from "react-redux";
import {
  selectCurrentTimeFrameRate,
  selectIncomeSinceStartOfPreferredTimeFrame
} from "../../../store/finance/finance.selectors";
import { convertRate, MonetaryAmountRate } from "../../../model/MonetaryAmountRate.model";
import NumberCard from "./NumberCard";
import { Currency, devide, MonetaryAmount, sum } from "../../../model/MonetaryAmount.model";
import { StartOfTimeFrameTranslations } from "../../../model/TimeFrame.model";

interface Props {
  state: RootState
}

const mapStateToProps = (state: RootState): Props => {
  return {
    state: state
  }
}

const LiveIncome: React.FC<Props> = (props) => {
  const [income, setIncome] = useState<MonetaryAmount>(selectIncomeSinceStartOfPreferredTimeFrame(props.state))

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIncome(selectIncomeSinceStartOfPreferredTimeFrame(props.state))
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [setIncome, income, props.state])

  return <NumberCard
      title={ StartOfTimeFrameTranslations[props.state.settings.preferredTimeFrame] + ' gespart' }
      number={ income.amount }
      unit={ `${income.currency}` }
      fractionDigits={ 2 }/>
}

export default connect(mapStateToProps)(LiveIncome)

