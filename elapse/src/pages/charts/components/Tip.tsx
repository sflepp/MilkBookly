import { InAppPurchase } from '@ionic-native/in-app-purchase'
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect } from "react";
import { setShowTip } from "../../../store/settings/settings.actions";
import store from "../../../store/store";

const Tip: React.FC = () => {

  const buy = () => {
    InAppPurchase.buy('tip_1_chf')
      .then((data) => console.log(data))
      .catch((data) => console.error(data))
  }

  useEffect(() => {
    InAppPurchase.getProducts(['tip_1_chf'])
      .then((data) => console.log('iap products', data) )
      .catch((error) => console.error('iap error', error))
  })

  return <IonCard>
    <IonCardHeader>
      <IonCardTitle>Trinkgeld ❤️
        <IonButtons slot="end">
          <IonButton onClick={() => store.dispatch(setShowTip(false))}>
            <IonIcon icon={close}/>
          </IonButton>
        </IonButtons>
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      Diese App ist kostenlos, verwendet kein Tracking und blendet keine
      Werbung ein. Das wird auch immer so bleiben.
      <br/><br/>
      Wenn dir diese App gefällt und sie dir etwas bringt, würde sich der Entwickler
      dieser App über ein kleines Trinkgeld freuen, sodass er seine Freundin zu einem
      Abendessen einladen kann.

      <IonButton expand="block"
                 style={{ marginTop: '32px' }}
                 onClick={buy}>Trinkgeld geben️</IonButton>
      <IonButton expand="block"
                 color="light"
                 onClick={() => store.dispatch(setShowTip(false))}>Nein Danke.</IonButton>
    </IonCardContent>
  </IonCard>
}

export default Tip
