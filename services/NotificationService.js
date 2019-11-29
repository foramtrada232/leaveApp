const FCM = require('fcm-node')
const serverKey = "AAAANEmAX6k:APA91bEinOCCVtll_WH6qtxZHArIY6KafN_lK47dznDTkyrbMRUFZatgM6RQ4QU1qdcagDfKOjgayQSeG1zzNfahzJuCKnp1uyg1aTRx61ILQOjMniI818u6yuZAZp040a6lDHF2PT-q";
const fcm = new FCM(serverKey)
const NotificationModel = require("../models/notification.model");


// const message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: 'dUzs8pLYycQ:APA91bF-te6FIHDjSg6bbUBUtpNfrjd6OHWqiNXAwlrVJPbom7RQTM1xiRh1_wvlpxPTc3F4AOtL0M9GChJSunI7XB5JiucsECsi7xvEDEYctSTwhi7lU8xZkTr3oRlM2GTTSSXK2jmv',
//     // collapse_key: 'AIzaSyBCNCtszUkbcgOURxvWFS_py4bs61HvfGk',

//     notification: {
//         title: 'Title of your push notification',
//         body: 'Body of your push notification'
//     }
// }
module.exports.sendNotification = (message) => {
    console.log("MESSAGE:", message)
    if (message.notification.title == "Tomorrow Absent user" || message.notification.title == "Leave Application") {
            console.log("==============else if calling=============")
            var currentTime = new Date();
            let date = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate();

            var currentOffset = currentTime.getTimezoneOffset();

            var ISTOffset = 330;   // IST offset UTC +5:30 

            var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

            // ISTTime now represents the time in IST coordinates

            var hoursIST = ISTTime.getHours()
            var minutesIST = ISTTime.getMinutes()
            console.log("TIME:", hoursIST + ":" + minutesIST)

            message.notification['createdTime'] = hoursIST + ":" + minutesIST;
            message.notification['createdAt'] = date;
            NotificationModel.create(message.notification).then((user) => {
                console.log("Notificatoin data===========>", user);
            }).catch((error) => {
                console.log("error: ", error);
            })
        }

    fcm.send(message, function (err, response) {
        console.log("ERROR:", err);
        console.log("RESPONSE:", response)
        if (err) {
            console.log("Something has gone wrong!", err)
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })
}



