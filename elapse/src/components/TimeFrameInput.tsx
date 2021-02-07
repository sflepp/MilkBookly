import { IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import './TimeFrameInput.css';
import { SelectChangeEventDetail } from "@ionic/core";
import { AllTimeFrames, TimeFrame, TimeFrameTranslations } from "../model/TimeFrame.model";

interface Props {
  defaultValue?: TimeFrame
  value: TimeFrame
  onChange: (value: TimeFrame) => void
}

const TimeFrameInput: React.FC<Props> = (props) => {

  const defaultValue = props.defaultValue || 'MONTH'

  const onCurrencyChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    props.onChange(e.detail.value)
  }

  return (
      <IonSelect value={ props.value || defaultValue }
                 okText="OK"
                 cancelText="Abbrechen"
                 onIonChange={ onCurrencyChange }>
        { AllTimeFrames.map(c =>
            <IonSelectOption key={ c } value={ c }>{ TimeFrameTranslations[c] }</IonSelectOption>
        ) }
      </IonSelect>
  );
};

export default TimeFrameInput;
