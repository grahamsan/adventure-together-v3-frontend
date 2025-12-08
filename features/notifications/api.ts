// notification-api.ts
import { Notification } from './types';

export async function fetchNotifications(): Promise<Notification[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 'n1',
          type: 'alerte',
          title: "Your ride to 'Mountain View' has been cancelled by the driver.",
          description: '',
          timestamp: '5m ago',
          isRead: false,
        },
        {
          id: 'n2',
          type: 'rappel',
          title: "Rappel: Your trip to 'Lakefront trail' starts in 1 hour.",
          description: '',
          timestamp: '1h ago',
          isRead: false,
        },
        {
          id: 'n3',
          type: 'info',
          title: "Alex B. has joined your upcoming trip to the 'City Museum'",
          description: '',
          timestamp: '1d ago',
          isRead: false,
        },
        {
          id: 'n4',
          type: 'info',
          title: 'You have a new message from Sarah',
          description: '',
          timestamp: '2d ago',
          isRead: false,
        },
        {
          id: 'n5',
          type: 'info',
          title: "New message in 'Paris Road Trip'",
          description: "Hey everyone 👋 I've just booked the tickets for the Eiffel Tower!",
          timestamp: '2 hours ago',
          isRead: false,
          tripId: 'trip1',
        },
        {
          id: 'n6',
          type: 'rappel',
          title: 'Your trip to the Alps starts tomorrow!',
          description: "Don't forget to check the weather and pack warm clothes.",
          timestamp: '1 day ago',
          isRead: false,
          tripId: 'trip2',
        },
        {
          id: 'n7',
          type: 'info',
          title: 'Your profile was updated successfully.',
          description: 'Your new profile picture is now live.',
          timestamp: '3 days ago',
          isRead: true,
        },
      ]);
    }, 500)
  );
}

export async function markAsRead(notificationId: string): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 300)
  );
}

export async function markAllAsRead(): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 400)
  );
}