import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
    const {granted } = await Notifications.getPermissionsAsync()

    if (!granted) {
        await Notifications.getPermissionsAsync()
    } 

    if (granted) {
        const pushToken = await Notifications.getExpoPushTokenAsync()
        console.log("Notification Token =>", pushToken.data)

        return pushToken.data
    }
}