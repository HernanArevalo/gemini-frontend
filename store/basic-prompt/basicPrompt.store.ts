
import { Message } from '@/interfaces/chat.interfaces'
import { create } from 'zustand'
import uuid from 'react-native-uuid';
import * as GeminiActions from '@/actions/gemini/basic-prompt.action';

interface BasicPromptState {
    geminiWriting: boolean
    messages: Message[]
    addMessage: (text: string) => Promise<void>
    setGeminiWriting: (isWriting: boolean) => void
}

const createMessage = ( text: string, sender: 'user'|'gemini' ): Message => {

    return {
        id: uuid.v4(),
        text,
        createdAt: new Date(),
        sender,
        type: 'text'
    }
}


export const useBasicPromptStore = create<BasicPromptState>()((set) => ({
    geminiWriting: false,
    messages: [],

    addMessage: async(text) => {

        const userMessage = createMessage(text, 'user')
        set((state) => ({ 
            geminiWriting: true,
            messages: [userMessage, ...state.messages] })
        )
        
        // * GEMINI PETITION
        const geminiResponseText = await GeminiActions.getBasicPrompt(text)
        
        const geminiMessage = createMessage(geminiResponseText, 'gemini')
        set((state) => ({ 
            geminiWriting: false,
            messages: [geminiMessage, ...state.messages] })
        )
    },

    setGeminiWriting: (isWriting) =>
        set(() => ({ geminiWriting: isWriting })
    ),
}))