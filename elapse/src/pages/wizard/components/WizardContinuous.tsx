import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonItem,
    IonLabel
} from "@ionic/react";
import {checkmark} from "ionicons/icons";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {connect} from "react-redux";
import MonetaryInput from "../../../components/MonetaryInput";
import TimeFrameInput from "../../../components/TimeFrameInput";
import {CustomDate} from "../../../model/CustomDate";
import {Currency, MonetaryAmount} from "../../../model/MonetaryAmount.model";
import {startOfTimeFrame, TimeFrame} from "../../../model/TimeFrame.model";
import {addCashFlowEntry} from "../../../store/finance/finance.actions";
import {RootState} from "../../../store/reducer";
import store from "../../../store/store";
import './WizardContinuous.css';
import {CashFlowEntryType} from "../../../model/CashFlowEntryType.model";

interface Props {
    currentTime: CustomDate
    preferredCurrency: Currency
    description: string
    question: string
    defaultPeriod: TimeFrame
    type: CashFlowEntryType
    onComplete: () => void
}

interface OwnProps {
    description: string
    question: string
    defaultPeriod: TimeFrame
    type: CashFlowEntryType
    onComplete: () => void
}

interface FormData {
    period: TimeFrame
    amount: MonetaryAmount
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): Props => {
    return {
        ...ownProps,
        currentTime: state.environment.currentTime,
        preferredCurrency: state.settings.preferredCurrency
    }
}

const WizardContinuous: React.FC<Props> = (props) => {
    const {handleSubmit, control} = useForm<FormData>({
        defaultValues: {
            amount: {
                amount: 0,
                currency: props.preferredCurrency
            },
            period: props.defaultPeriod,
        }
    });

    const onSubmit = (data: FormData) => {

        if (data.amount.amount > 0) {
            store.dispatch(addCashFlowEntry({
                description: props.description,
                type: props.type,
                amount: data.amount,
                start: startOfTimeFrame(props.currentTime, 'YEAR'),
                recurrence: {
                    type: 'continuous',
                    repetition: data.period
                },
            }))
        }

        props.onComplete()

    }

    return (<IonCard>
        <IonCardHeader>
            <IonCardSubtitle>{props.description}</IonCardSubtitle>
            <IonCardTitle>{props.question}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"wizard-form"}>
                    <Controller
                        name="amount"
                        control={control}
                        rules={{
                            required: true, validate: (v) => v.amount > 0
                        }}
                        render={({onChange, value}, {invalid}) =>
                            <MonetaryInput invalid={invalid} value={value} onChange={onChange}/>
                        }
                    />
                    <Controller
                        name="period"
                        control={control}
                        rules={{required: true}}
                        render={({onChange, value}, {invalid}) =>
                            <IonItem>
                                <IonLabel color={invalid ? 'danger' : undefined}>Wiederholung</IonLabel>
                                <TimeFrameInput value={value} onChange={onChange}/>
                            </IonItem>
                        }
                    />
                </div>
                <IonButton type="submit" className="ok-button">
                    <IonIcon slot="icon-only" icon={checkmark}/>
                </IonButton>
                <IonButton color="light" className="skip-button" onClick={props.onComplete}>
                    Überspringen
                </IonButton>
            </form>

        </IonCardContent>
    </IonCard>)
};

export default connect(mapStateToProps)(WizardContinuous);