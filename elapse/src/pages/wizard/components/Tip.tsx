import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import React from "react";
import { close } from "ionicons/icons";
import store from "../../../store";
import { setShowTip } from "../../../store/settings/settings.actions";

const Tip: React.FC = () => {
  return <IonCard style={ { marginTop: '32px' } }>
    <IonCardHeader>
      <IonCardTitle>Trinkgeld ❤️<IonButtons slot="end">
        <IonButton onClick={ () => store.dispatch(setShowTip(false)) }>
          <IonIcon icon={ close }/>
        </IonButton>
      </IonButtons></IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      Diese App ist kostenlos, verwendet kein Tracking und blendet keine
      Werbung ein. Das wird auch immer so bleiben.
      <br/><br/>
      Wenn dir diese App gefällt und sie dir etwas bringt, würde sich der Entwickler
      dieser App über ein kleines Trinkgeld freuen, sodass er seine Freundin zu einem
      Abendessen ausführen kann.

      <IonButton expand="block"
                 style={ { marginTop: '32px' } }
                 onClick={ () => alert('ToDo: InApp purchases') }>Trinkgeld geben️</IonButton>
      <IonButton expand="block"
                 color="light"
                 onClick={ () => store.dispatch(setShowTip(false)) }>Nein Danke.</IonButton>
    </IonCardContent>
  </IonCard>
}

export default Tip
