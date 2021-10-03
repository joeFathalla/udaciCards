const NOTIFICATION_KEY = "joeUdaciCards:notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.dismissAllNotificationsAsync()
  );
}

export function createNotification() {
  return {
    title: "Complete the quiz",
    body: "👋 Don't forget to complete the quiz!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "hight",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true
          }
        }).then(({ status }) => {
          if (status === "granted") {
            Notifications.dismissAllNotificationsAsync();

            Notifications.scheduleNotificationAsync({
              content: createNotification(),
              trigger: {
                hour: 12,
                minute: 0,
                repeats: true
              }
            });
            // Notifications.scheduleNotificationAsync({
            //   content: createNotification(),
            //   trigger: null
            // });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
