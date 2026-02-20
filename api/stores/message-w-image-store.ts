import { create } from "zustand";

interface SendMessageState {
  isProcessing: boolean;
  currentStep: "idle" | "uploading" | "sending" | "complete" | "error";
  error: string | null;
  setProcessing: (isProcessing: boolean) => void;
  setStep: (step: SendMessageState["currentStep"]) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useSendMessageWithImageStore = create<SendMessageState>((set) => ({
  isProcessing: false,
  currentStep: "idle",
  error: null,
  setProcessing: (isProcessing) => set({ isProcessing }),
  setStep: (currentStep) => set({ currentStep }),
  setError: (error) => set({ error }),
  reset: () => set({ isProcessing: false, currentStep: "idle", error: null }),
}));
