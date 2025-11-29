import type { User, TrainingConfig, TrainingSession, ChatSessionResponse } from "@/types";

class Storage {
  private currentUser: User | null = null;
  private currentConfig: TrainingConfig | null = null;
  private currentSession: ChatSessionResponse | null = null;
  private sessions: TrainingSession[] = [];

  setCurrentUser(user: User | null) {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentConfig(config: TrainingConfig | null) {
    this.currentConfig = config;
  }

  getCurrentConfig(): TrainingConfig | null {
    return this.currentConfig;
  }

  setCurrentSession(session: ChatSessionResponse | null) {
    this.currentSession = session;
  }

  getCurrentSession(): ChatSessionResponse | null {
    return this.currentSession;
  }

  addSession(session: TrainingSession) {
    this.sessions.push(session);
  }

  getSessions(): TrainingSession[] {
    return this.sessions;
  }

  getLastSession(): TrainingSession | null {
    return this.sessions.length > 0
      ? this.sessions[this.sessions.length - 1]
      : null;
  }
}

export const storage = new Storage();
