import React from "react";
import { RootState } from "../../../store/reducer";
import { connect } from "react-redux";
import { selectIncomeSinceStartOfPreferredTimeFrame } from "../../../store/finance/finance.selectors";
import NumberCard from "./NumberCard";
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
  const income = selectIncomeSinceStartOfPreferredTimeFrame(props.state)
  return <NumberCard
      title={ StartOfTimeFrameTranslations[props.state.settings.preferredTimeFrame] + ' gespart' }
      number={ income.amount }
      unit={ `${ income.currency }` }
      fractionDigits={ 2 }/>
}

export default connect(mapStateToProps)(LiveIncome)

