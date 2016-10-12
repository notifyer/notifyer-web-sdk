var notificationUrl = '';

self.addEventListener('push', function (event) {
    console.log("Push event: ", event.data.text());
    var _data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = (typeof _data.url === 'undefined' || _data.url == "")? "/": _data.url;
    event.waitUntil(
        self.registration.showNotification(_data.title, {
            body: _data.message,
            icon: _data.icon,
            tag: _data.tag
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
            .then(function (clientList) {
                if (clients.openWindow) {
                    return clients.openWindow(notificationUrl);
                }
            })
    );
});