

import { Message } from '@/interfaces/chat.interfaces'
import { create } from 'zustand'

interface BasicPromptState {
    geminiWriting: boolean
    messages: Message[]
    addMessage: (message: Message) => void
    setGeminiWriting: (isWriting: boolean) => void
}

const useBasicPromptStore = create<BasicPromptState>()((set) => ({
    geminiWriting: false,
    messages: [],
    addMessage: (message) => 
        set((state) => ({ messages: [...state.messages, message] })
),
    setGeminiWriting: (isWriting) =>
        set(() => ({ geminiWriting: isWriting })
    ),
}))