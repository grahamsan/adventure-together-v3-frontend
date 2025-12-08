export const fetchTrips = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: "trip1",
        title: "Paris → Lyon",
        date: "12 Mars 2025",
        chats: [
          { id: "c1", user: { name: "Sophie Durand", avatar: "[https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150](https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150)" }, lastMessage: "Super, merci !", unread: 2, timestamp: "14:30" },
          { id: "c2", user: { name: "Ahmed Belkacem", avatar: "[https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150](https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150)" }, lastMessage: "On part à 14h ?", unread: 0, timestamp: "Hier" },
        ]
      },
      {
        id: "trip2",
        title: "Nice → Marseille",
        date: "27 Avril 2025",
        chats: [
          { id: "c3", user: { name: "Julie Nguyen", avatar: "[https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150](https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150)" }, lastMessage: "Parfait !", unread: 1, timestamp: "Lun" },
        ]
      }
    ]);
  }, 600);
});

export const MOCK_MESSAGES = [
  { id: '1', sender: 'other', text: "Salut ! Prêt pour le départ ?", timestamp: '10:00' },
  { id: '2', sender: 'me', text: "Carrément ! J'ai hâte. Tu as vu la météo ?", timestamp: '10:02' },
  { id: '3', sender: 'other', text: "Oui grand soleil tout le week-end ☀️", timestamp: '10:03' },
];

export const fakeApiCall = (data : any, delay = 500) => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));
