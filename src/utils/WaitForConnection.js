export const waitForConnection = (stompClient, callback) => {
  setTimeout(function () {
    if (stompClient.ws.readyState === 1) {
      callback();
    } else {
      waitForConnection(stompClient, callback);
    }
  }, 0.1);
};
