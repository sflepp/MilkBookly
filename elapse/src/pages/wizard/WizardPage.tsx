import {IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React, {FC, useState} from 'react'
import {setWizardComplete} from '../../store/enviornment/enviornment.actions'
import store from '../../store/store'
import WizardContinuous from "./components/WizardContinuous";

const WizardPage: FC = () => {

    const steps = ['wage', 'rent', 'health-insurance', 'food', 'tax', 'mobile', 'public-transport', 'gasoline']

    const [step, setStep] = useState<string>(steps[0])

    const nextStep = () => {
        const currentIndex = steps.indexOf(step);

        if(currentIndex === steps.length - 1) {
            store.dispatch(setWizardComplete(true))
        } else {
            setStep(steps[steps.indexOf(step) + 1])
        }
    }

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Einrichten</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Einrichten</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={() => {
                            store.dispatch(setWizardComplete(true))
                        }}>
                            Später
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {step === 'wage' && <WizardContinuous
                onComplete={nextStep}
                type={'income'}
                defaultPeriod={'MONTH'}
                description={'Lohn'}
                question={'Wie hoch ist Dein Lohn/Einkommen?'}/>}
            {step === 'rent' && <WizardContinuous
                onComplete={nextStep}
                type={'expense'}
                defaultPeriod={'MONTH'}
                description={'Miete'}
                question={'Wie viel Miete bezahlst Du?'}/>}
            {step === 'health-insurance' && <WizardContinuous
                onComplete={nextStep}
                type={'expense'}
                defaultPeriod={'MONTH'}
                description={'Krankenkasse'}
                question={'Wie viel bezahlst Du für die Krankenkasse?'}/>}
            {step === 'food' && <WizardContinuous
                onComplete={nextStep}
                type={'expense'}
                defaultPeriod={'WEEK'}
                description={'Essen'}
                question={'Wie viel gibst Du für Essen aus?'}/>}
            {step === 'tax' && <WizardContinuous
                onComplete={nextStep}
                type={'expense'}
                defaultPeriod={'YEAR'} description={'Steuern'}
                question={'Wie viel Steuern bezahlst Du?'}/>}
            {step === 'mobile' && <WizardContinuous
                onComplete={nextStep}
                type={'expense'}
                defaultPeriod={'MONTH'}
                description={'Mobiltelefon'}
                question={'Wie viel bezahlst Du für Dein Mobil-Abo?'}/>}
            {step === 'public-transport' && <WizardContinuous
                onComplete={nextStep}
                type={'expense'}
                defaultPeriod={'MONTH'}
                description={'ÖV-Ticket'}
                question={'Wie viel bezahlst Du für Dein ÖV-Ticket?'}/>}
            {step === 'gasoline' && <WizardContinuous
                onComplete={nextStep}
                type={'expense'}
                defaultPeriod={'MONTH'}
                description={'Benzin'}
                question={'Wie viel gibst Du für Benzin aus?'}/>}
        </IonContent>
    </IonPage>
}

export default WizardPage