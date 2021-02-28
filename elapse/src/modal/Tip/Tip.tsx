import { InAppPurchase } from '@ionic-native/in-app-purchase'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { setShowTip } from "../../store/settings/settings.actions";
import store from "../../store/store";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

const Tip: React.FC = () => {

  const showTip = useSelector<RootState, boolean>((state) => state.settings.showTip)
  const cashFlowLength = useSelector<RootState, number>((state) => state.finance.cashFlow.length);

  const [threshold, setThreshold] = useState<boolean>(false)

  useEffect(() => {
    if(cashFlowLength > 5) {
      setTimeout(() => {
        setThreshold(true)
      }, 2000)
    }
  }, [cashFlowLength])

  const buy = () => {
    InAppPurchase.buy('tip_1_chf')
        .then((data) => console.log(data))
        .catch((data) => console.error(data))
  }

  return <IonModal isOpen={ threshold && showTip }
                   showBackdrop={ true }
                   cssClass={ "small-modal" }>
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Trinkgeld ❤️</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        Diese App ist kostenlos, verwendet kein Tracking und blendet keine
        Werbung ein. Das wird auch immer so bleiben.
        <br/><br/>
        Wenn dir diese App gefällt und sie dir etwas bringt, würde sich der Entwickler
        dieser App über ein kleines Trinkgeld freuen, sodass er seine Freundin zu einem
        Abendessen einladen kann.

        <IonButton expand="block"
                   style={ { marginTop: '32px' } }
                   onClick={ buy }>Trinkgeld geben️</IonButton>
        <IonButton expand="block"
                   color="light"
                   onClick={ () => {
                     store.dispatch(setShowTip(false))
                   } }>Nein Danke.</IonButton>
      </IonCardContent>
    </IonCard>
  </IonModal>
}

export default Tip
