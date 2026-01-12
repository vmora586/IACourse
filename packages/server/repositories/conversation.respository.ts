const conversations = new Map<string, string>();

export const conversationRepository = {
    addConversation: (conversationId: string, responseId: string) => {
        conversations.set(conversationId, responseId);
    },

    getConversation: (conversationId: string) => {
        return conversations.get(conversationId);
    },
};