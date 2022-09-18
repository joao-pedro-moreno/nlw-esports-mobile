import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black} from '@expo-google-fonts/inter'

import { Routes } from './src/routes'
import { Loading } from './src/components/Loading'

import './src/services/notificationConfigs'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

import { Background } from './src/components/Background'
import { useRef, useEffect } from 'react'

import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications';


export default function App() {
    
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_900Black
    })
    
    const getNotificationListener = useRef<Subscription>()
    const resposeNotificationListener = useRef<Subscription>()
    
    useEffect(() => {
        getPushNotificationToken()
    })

    useEffect(() => {
        getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification)
        })

        resposeNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response)
        })

        return () => {
            if (getNotificationListener.current && resposeNotificationListener.current) {
                Notifications.removeNotificationSubscription(getNotificationListener.current)
                Notifications.removeNotificationSubscription(resposeNotificationListener.current)
            }
        }
    }, [])

    return (
        <Background >
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            { fontsLoaded ? <Routes /> : <Loading /> }

        </Background>
    );
}
