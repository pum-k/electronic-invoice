import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const Notification = (type, message) => {
  switch (type) {
    case "success": {
      NotificationManager.success(message, "Thành Công",2000);
      break;
    }
    case "error": {
      NotificationManager.error(message, "Thất bại");
      break;
    }
  }
};

export default Notification;
