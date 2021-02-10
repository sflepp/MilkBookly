import React from "react";
import "./NumberCard.css"
import { IonCard, IonCardContent } from "@ionic/react";

interface Props {
  title: string
  number: number
  unit: string
  fractionDigits?: number
}

const NumberCard: React.FC<Props> = (props) => {

  const fractionDigits = props.fractionDigits || 2

  return <IonCard>
    <IonCardContent>
      <div className={ 'number-card' }>
        <div className={ 'title' }>
          { props.title }
        </div>
        <div>
          <span className={ 'number' }>{ props.number.toFixed(fractionDigits)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, "'") }&nbsp;</span>
          <span className={ 'unit' }>{ props.unit }</span>
        </div>
      </div>
    </IonCardContent>
  </IonCard>
}

export default NumberCard

