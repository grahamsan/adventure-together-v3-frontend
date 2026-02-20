import { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

type UseWebSocketsOptions = {
  enableChat?: boolean;
  enableNotif?: boolean;
};

export const useWebSockets = (
  userId: string | undefined,
  options: UseWebSocketsOptions = { enableChat: true, enableNotif: true },
) => {
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [notifSocket, setNotifSocket] = useState<Socket | null>(null);
  const chatSocketRef = useRef<Socket | null>(null);
  const notifSocketRef = useRef<Socket | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (hasInitialized.current) return;

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("ACCESS_TOKEN") ||
          localStorage.getItem("REFRESH_TOKEN")
        : null;

    if (!token || !userId) {
      console.warn("⚠️ Missing token or userId for WebSocket connection");
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const socketOptions = {
      auth: { token },
      transports: ["websocket"], // Uniquement websocket comme recommandé
      autoConnect: false, // Contrôle manuel de la connexion
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    };

    // 1. Setup Chat Socket (Namespace /tripMessage)
    if (options.enableChat) {
      const chat = io(`${baseUrl}tripMessage`, socketOptions);

      chat.on("connect", () => {
        console.log("✅ Connected to chat socket:", chat.id);
      });

      chat.on("connect_error", (err) => {
        console.error("❌ Chat socket connection error:", err.message, err);
      });

      chat.on("disconnect", (reason) => {
        console.log("🔌 Chat socket disconnected:", reason);
        if (reason === "io server disconnect") {
          // Le serveur a déconnecté le socket, reconnexion manuelle
          chat.connect();
        }
      });

      chat.on("error", (err) => {
        console.error("❌ Chat socket error:", err);
      });

      // Connexion manuelle
      chat.connect();

      chatSocketRef.current = chat;
      setChatSocket(chat);
    }

    // 2. Setup Notification Socket (Namespace /notifications)
    if (options.enableNotif) {
      const notif = io(`${baseUrl}notifications`, socketOptions);

      notif.on("connect", () => {
        console.log("✅ Connected to notifications socket:", notif.id);
        // IMPORTANT: Envoyer l'ID utilisateur en STRING, pas d'objet
        notif.emit("joinNotifications", userId);
      });

      notif.on("connect_error", (err) => {
        console.error(
          "❌ Notification socket connection error:",
          err.message,
          err,
        );
      });

      notif.on("disconnect", (reason) => {
        console.log("🔌 Notification socket disconnected:", reason);
        if (reason === "io server disconnect") {
          notif.connect();
        }
      });

      notif.on("error", (err) => {
        console.error("❌ Notification socket error:", err);
      });

      // Connexion manuelle
      notif.connect();

      notifSocketRef.current = notif;
      setNotifSocket(notif);
    }

    hasInitialized.current = true;

    // Cleanup
    return () => {
      console.log("🧹 Cleaning up WebSocket connections");

      if (chatSocketRef.current) {
        chatSocketRef.current.removeAllListeners();
        chatSocketRef.current.disconnect();
        chatSocketRef.current = null;
      }

      if (notifSocketRef.current) {
        // Quitter la room avant de déconnecter
        if (userId) {
          notifSocketRef.current.emit("leaveNotifications", userId);
        }
        notifSocketRef.current.removeAllListeners();
        notifSocketRef.current.disconnect();
        notifSocketRef.current = null;
      }

      setChatSocket(null);
      setNotifSocket(null);
      hasInitialized.current = false;
    };
  }, [userId, options.enableChat, options.enableNotif]);

  const joinConversation = useCallback((conversationId: string) => {
    const socket = chatSocketRef.current;

    if (!socket) {
      console.warn("⚠️ Chat socket not initialized");
      return;
    }

    if (socket.connected) {
      console.log("📥 Joining conversation:", conversationId);
      socket.emit("joinRoom", conversationId);
    } else {
      console.log("⏳ Waiting for connection to join room:", conversationId);
      // Attendre la connexion puis rejoindre
      socket.once("connect", () => {
        console.log("📥 Joining conversation after connect:", conversationId);
        socket.emit("joinRoom", conversationId);
      });
      // Forcer la connexion si pas encore connecté
      socket.connect();
    }
  }, []);

  const leaveConversation = useCallback((conversationId: string) => {
    const socket = chatSocketRef.current;

    if (socket?.connected) {
      console.log("📤 Leaving conversation:", conversationId);
      socket.emit("leaveRoom", conversationId);
    }
  }, []);

  return {
    chatSocket,
    notifSocket,
    joinConversation,
    leaveConversation,
    // Exposer l'état de connexion pour debugging
    isChatConnected: chatSocket?.connected ?? false,
    isNotifConnected: notifSocket?.connected ?? false,
  };
};
