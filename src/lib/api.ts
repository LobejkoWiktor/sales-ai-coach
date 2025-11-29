import type { ChatSessionPayload } from "@/types";

const API_BASE_URL = "https://salestwin-d8fcabg7bedte0ah.polandcentral-01.azurewebsites.net";

export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public response?: any
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export async function createChatSession(payload: ChatSessionPayload): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/chat-sessions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
                `Failed to create chat session: ${response.statusText}`,
                response.status,
                errorData
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            `Network error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}
