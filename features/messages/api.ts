// api.ts
import { Trip, Message } from './types';

export async function fetchTrips(): Promise<Trip[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: "trip1",
          title: "Cotonou → Parakou",
          date: "12 Mars 2025",
          chats: [
            {
              id: "c1",
              user: {
                name: "Sophie Durand",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
              },
              lastMessage: "Super, merci pour les infos !",
              unread: 2,
              timestamp: "Il y a 2h",
            },
            {
              id: "c2",
              user: {
                name: "Ahmed Belkacem",
                avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
              },
              lastMessage: "On part bien à 14h, c'est ça ?",
              unread: 0,
              timestamp: "Hier",
            },
          ],
        },
        {
          id: "trip2",
          title: "Cotonou → Ouidah",
          date: "27 Avril 2025",
          chats: [
            {
              id: "c3",
              user: {
                name: "Julie Nguyen",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
              },
              lastMessage: "Parfait, à très vite !",
              unread: 1,
              timestamp: "3 min",
            },
          ],
        },
      ]);
    }, 600)
  );
}

export async function fetchMessages(chatId: string): Promise<Message[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const messageData: { [key: string]: Message[] } = {
        c1: [
          {
            id: '1',
            sender: 'Sophie Durand',
            message: "Salut ! Tu as vu l'heure de départ ?",
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
            timestamp: "Aujourd'hui 10:30",
            isOwn: false,
          },
          {
            id: '2',
            sender: 'Vous',
            message: "Oui, on part à 14h de la gare !",
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
            timestamp: "Aujourd'hui 10:32",
            isOwn: true,
          },
          {
            id: '3',
            sender: 'Sophie Durand',
            message: "Super, merci pour les infos !",
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
            timestamp: "Aujourd'hui 10:35",
            isOwn: false,
          },
        ],
        c2: [
          {
            id: '1',
            sender: 'Ahmed Belkacem',
            message: "On part bien à 14h, c'est ça ?",
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
            timestamp: 'Hier 18:20',
            isOwn: false,
          },
        ],
        c3: [
          {
            id: '1',
            sender: 'Julie Nguyen',
            message: "Parfait, à très vite !",
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            timestamp: 'Il y a 3 min',
            isOwn: false,
          },
        ],
      };
      resolve(messageData[chatId] || []);
    }, 400)
  );
}

export async function sendMessage(chatId: string, message: string): Promise<Message> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        sender: 'Vous',
        message,
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
        timestamp: "À l'instant",
        isOwn: true,
      });
    }, 300)
  );
}