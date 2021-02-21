import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRange,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { close } from "ionicons/icons";
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from 'react-redux'
import CashFlowEntryTypeInput from "../../../components/CashFlowEntryTypeInput";
import MonetaryInput from "../../../components/MonetaryInput";
import SecondsFormatter from '../../../components/SecondsFormatter'
import TimeFrameAmountFormatter from '../../../components/TimeFrameAmountFormatter';
import { CashFlowEntryType } from "../../../model/CashFlowEntryType.model";
import { addNTimeFrames, CustomDate } from "../../../model/CustomDate";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import { MonetaryAmountRate, secondsUntilAmortized } from '../../../model/MonetaryAmountRate.model'
import { TimeFrameAmount, timeFrameAmountCeil } from "../../../model/TimeFrame.model";
import { addCashFlowEntry } from "../../../store/finance/finance.actions";
import { selectCurrentTimeFrameRate } from '../../../store/finance/finance.selectors'
import { RootState } from '../../../store/reducer'
import store from "../../../store/store";

interface Props {
  onClose: () => void
}

interface FormData {
  description: string
  type: CashFlowEntryType
  amount: MonetaryAmount,
  amortization: number // seconds
  amortizationSlider: number
}

const logSlider = (position: number) => {
  // position will be between 0 and 100
  var minp = 1;
  var maxp = 100;

  var minv = Math.log(1)
  var maxv = Math.log(750)

  var scale = (maxv - minv) / (maxp - minp);

  return Math.exp(minv + scale * (position - minp))
}

const NewOneTimeCashFlowEntryModal: React.FC<Props> = (props) => {
  const currentRate = useSelector<RootState, MonetaryAmountRate>((state) => selectCurrentTimeFrameRate(state))
  const currentTime = useSelector<RootState, CustomDate>(state => state.environment.currentTime)

  const [title, setTitle] = useState<string>();
  const [amortization, setAmortization] = useState<TimeFrameAmount>({ timeFrame: 'DAY', amount: 0 })
  const [untilAmortized, setUntilAmortized] = useState<number>(0)
  const { handleSubmit, control, setValue } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      description: '',
      type: 'expense',
      amount: {
        amount: 0,
        currency: 'CHF'
      },
      amortization: 0,
      amortizationSlider: 50
    }
  });

  const onSubmit = (data: FormData) => {
    store.dispatch(addCashFlowEntry({
      description: data.description,
      type: data.type,
      category: 'unknown',
      amount: data.amount,
      start: currentTime,
      end: addNTimeFrames(currentTime, amortization.timeFrame, amortization.amount),
      recurrence: {
        type: 'one-time',
        amortization: amortization
      },
    }))

    props.onClose()
  }


  return (
    <>
      <IonModal isOpen={true} cssClass='my-custom-class'>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Neuer Eintrag</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={props.onClose}>
                <IonIcon icon={close}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Einmalig</IonCardSubtitle>
                <IonCardTitle>{title || 'Beschreibung'}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>

                <IonList>

                  <Controller
                    name="description"
                    control={control}
                    render={({ onChange, value }) =>
                      <IonItem>
                        <IonLabel>Beschreibung</IonLabel>
                        <IonInput style={{ textAlign: 'right' }} value={value}
                                  onIonChange={(e) => {
                                    onChange(e.detail.value!)
                                    setTitle(e.detail.value!)
                                  }}/>
                      </IonItem>
                    }
                  />
                  <Controller
                    name="type"
                    control={control}
                    render={({ onChange, value }) =>
                      <IonItem>
                        <IonLabel>Typ</IonLabel>
                        <CashFlowEntryTypeInput value={value} onChange={onChange}/>
                      </IonItem>
                    }
                  />
                  <Controller
                    name="amount"
                    control={control}
                    render={({ onChange, value }) =>
                      <MonetaryInput value={value} onChange={(value) => {
                        const untilAmortized = currentRate.amount > 0 ? secondsUntilAmortized(value, currentRate, currentTime) :  24 * 60 * 60; // one day
                        onChange(value)
                        setUntilAmortized(untilAmortized)
                        setAmortization(timeFrameAmountCeil(untilAmortized * logSlider(50)))
                        setValue('amortization', untilAmortized * logSlider(50))
                        setValue('amortizationSlider', 50)
                      }}/>
                    }
                  />

                  {!isNaN(untilAmortized) && untilAmortized !== 0 && <>
                      <IonListHeader style={{ marginTop: '16px' }}>
                          Amortisation <br/>
                      </IonListHeader>
                      <IonItem>
                        {currentRate.amount > 0 && <p style={{ margin: '16px 0' }}>
                            Mit Ihrer aktuellen Sparquote benötigen Sie mindestens&nbsp;
                            <b><SecondsFormatter amountOfSeconds={untilAmortized}/></b>
                            für die Amortisation.
                        </p>}
                        {currentRate.amount < 0 && <p style={{ margin: '16px 0', color: 'red' }}>
                            Sie können es sich eigentlich nicht leisten. Sie haben eine negative
                            Sparquote. {title} wirkt sich negativ auf Ihr Erspartes aus.
                        </p>}
                      </IonItem>

                      <IonItem>
                          <IonLabel>Amortisation</IonLabel>
                          <IonLabel style={{ textAlign: 'right' }}><TimeFrameAmountFormatter
                              value={amortization}/></IonLabel>
                      </IonItem>

                      <IonItem>

                          <Controller
                              name={"amortizationSlider"}
                              control={control}
                              render={({ onChange, value }) =>
                                <IonRange value={value} min={1} max={100} step={1}
                                          onIonChange={(event) => {
                                            const value = event.detail.value as number;
                                            onChange(value)
                                            setValue('amortization', untilAmortized * logSlider(value))
                                            setAmortization(timeFrameAmountCeil(untilAmortized * logSlider(value)))
                                          }}/>
                              }
                          />

                      </IonItem>
                  </>}
                </IonList>


                <IonButton type="submit" className="ok-button">
                  Hinzufügen
                </IonButton>

              </IonCardContent>
            </IonCard>
          </form>
        </IonContent>
      </IonModal>
    </>
  )
};

export default NewOneTimeCashFlowEntryModal