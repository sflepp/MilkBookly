import { InAppPurchase } from '@ionic-native/in-app-purchase'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { setShowTip } from "../../store/settings/settings.actions";
import store from "../../store/store";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

const Tip: React.FC = () => {

  const showTip = useSelector<RootState, boolean>((state) => state.settings.showTip)

  const buy = () => {
    InAppPurchase.buy('tip_1_chf')
        .then((data) => {
          console.log(data)
          store.dispatch(setShowTip(false))
        })
        .catch((data) => {
          console.error(data)
          store.dispatch(setShowTip(false))
        })
  }

  return <IonModal isOpen={ showTip }
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
        Wenn Dir diese App gefällt und sie Dir etwas bringt, würde sich der Entwickler
        dieser App über ein kleines Trinkgeld freuen, sodass er seine Freundin zu einem
        Abendessen einladen kann.

        <IonButton expand="block"
                   style={ { marginTop: '32px' } }
                   onClick={ buy }>Trinkgeld geben️</IonButton>
        <IonButton expand="block"
                   color="light"
                   onClick={ () => {
                     store.dispatch(setShowTip(false))
                   } }>Nein, danke.</IonButton>
      </IonCardContent>
    </IonCard>
  </IonModal>
}

export default Tip
