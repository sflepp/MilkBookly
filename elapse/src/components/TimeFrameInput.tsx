import { IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import { SelectChangeEventDetail } from "@ionic/core";
import {
  AllTimeFrames,
  TimeFrame,
  TimeFrameTranslationsAdjective,
  TimeFrameTranslationsNoun, TimeFrameTranslationsNounPlural
} from "../model/TimeFrame.model";

interface Props {
  translation?: 'adjective' | 'noun' | 'noun-plural'
  defaultValue?: TimeFrame
  value: TimeFrame
  onChange: (value: TimeFrame) => void
}

const TimeFrameInput: React.FC<Props> = (props) => {

  const defaultValue = props.defaultValue || 'MONTH'

  const onCurrencyChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    props.onChange(e.detail.value)
  }


  let translations: { [x: string]: string; };
  switch (props.translation) {
    case "adjective":
      translations = TimeFrameTranslationsAdjective;
      break;
    case "noun":
      translations = TimeFrameTranslationsNoun;
      break;
    case "noun-plural":
      translations = TimeFrameTranslationsNounPlural
      break;
    default:
      translations = TimeFrameTranslationsAdjective
  }

  return (
      <IonSelect value={ props.value || defaultValue }
                 interface="action-sheet"
                 onIonChange={ onCurrencyChange }>
        { AllTimeFrames.map(c =>
            <IonSelectOption key={ c } value={ c }>{ translations[c] }</IonSelectOption>
        ) }
      </IonSelect>
  );
};

export default TimeFrameInput;
