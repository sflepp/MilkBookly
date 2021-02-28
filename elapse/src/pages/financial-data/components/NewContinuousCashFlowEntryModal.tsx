import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonModal
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import CashFlowEntryTypeInput from "../../../components/CashFlowEntryTypeInput";
import MonetaryInput from "../../../components/MonetaryInput";
import TimeFrameInput from "../../../components/TimeFrameInput";
import { CashFlowEntryType } from "../../../model/CashFlowEntryType.model";
import { CustomDate } from "../../../model/CustomDate";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import { TimeFrame } from "../../../model/TimeFrame.model";
import { addCashFlowEntry } from "../../../store/finance/finance.actions";
import store from "../../../store/store";

interface Props {
  currentTime: CustomDate,
  onClose: () => void
}

interface FormData {
  description: string
  type: CashFlowEntryType
  period: TimeFrame
  amount: MonetaryAmount
}

const NewContinuousCashFlowEntryModal: React.FC<Props> = (props) => {

  const [title, setTitle] = useState<string>();
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      description: '',
      type: 'expense',
      amount: {
        amount: 0,
        currency: 'CHF'
      },
      period: 'MONTH',
    }
  });

  const firstOfYear = new Date(new Date(props.currentTime).getFullYear(), 0, 1).toISOString()

  const onSubmit = (data: FormData) => {
    store.dispatch(addCashFlowEntry({
      description: data.description,
      start: firstOfYear,
      type: data.type,
      category: 'unknown',
      amount: data.amount,
      recurrence: {
        type: 'continuous',
        repetition: data.period
      },
    }))

    props.onClose()
  }

  const descriptionRef = useRef<HTMLIonInputElement>(null)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (descriptionRef.current) {
        descriptionRef.current.setFocus()
      }
    }, 1100)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <IonModal isOpen={true} cssClass={"small-modal"}>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Wiederholend</IonCardSubtitle>
            <IonCardTitle>{title || 'Beschreibung'}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="description"
                control={control}
                render={({ onChange, value }) =>
                  <IonItem>
                    <IonLabel>Beschreibung</IonLabel>
                    <IonInput style={{ textAlign: 'right' }} value={value}
                              ref={descriptionRef}
                              onIonChange={(e) => {
                                setTitle(e.detail.value!)
                                onChange(e.detail.value!)
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
                  <MonetaryInput value={value} onChange={onChange}/>
                }
              />
              <Controller
                name="period"
                control={control}
                render={({ onChange, value }) =>
                  <IonItem>
                    <IonLabel>Wiederholung</IonLabel>
                    <TimeFrameInput translation="adjective" value={value} onChange={onChange}/>
                  </IonItem>
                }
              />

              <IonButton type="submit" className="ok-button">
                Hinzufügen
              </IonButton>

              <IonButton expand="block"
                         color="light"
                         onClick={() => {
                           props.onClose()
                         }}>Abbrechen</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonModal>
    </>
  );
};

export default NewContinuousCashFlowEntryModal