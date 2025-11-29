import { useState, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { storage } from "@/lib/storage";
import { mockOffers, mockInsights } from "@/data/mockData";
import {
  clientTypeLabels,
  difficultyLabels,
  goalLabels,
} from "@/data/mockData";
import {
  Mic,
  MicOff,
  Send,
  StopCircle,
  Lightbulb,
  User,
  Target,
  TrendingUp,
} from "lucide-react";
import { Message } from "@/types";

const Conversation = () => {
  const navigate = useNavigate();
  const config = storage.getCurrentConfig();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "client",
      content:
        "Dzień dobry! Dziękuję za spotkanie. Jakie rozwiązanie chce mi Pan dzisiaj zaprezentować?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  if (!config) {
    navigate("/offers");
    return null;
  }

  const selectedOffers = mockOffers.filter((offer) =>
    config.selectedOffers.includes(offer.id)
  );

  const relevantInsights = mockInsights.filter((insight) =>
    config.selectedOffers.includes(insight.offerId)
  );

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "rep",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInput("");
    resetTranscript();
    setProgress(Math.min(progress + 10, 85));

    setTimeout(() => {
      const clientResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "client",
        content:
          "To brzmi interesująco. Czy mógłby Pan podać więcej szczegółów na temat integracji z naszym obecnym systemem?",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, clientResponse]);
    }, 1500);
  };

  const handleEndConversation = () => {
    const session = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      config,
      score: 85,
      metrics: {
        productKnowledge: 88,
        needsAnalysis: 82,
        valueArgumentation: 85,
      },
      usedInsights: relevantInsights.slice(0, 2),
      messages,
      feedback: {
        strengths: [
          "Świetnie przedstawiłeś wartość produktu",
          "Dobra reakcja na pytania klienta",
          "Wykorzystałeś insighty w odpowiednim momencie",
        ],
        improvements: [
          "Możesz zadawać więcej pytań odkrywających potrzeby",
          "Spróbuj doprowadzić rozmowę do konkretnych next steps",
        ],
      },
    };

    storage.addSession(session);
    navigate(`/summary/${session.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-heading font-bold">Trening w toku</h1>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEndConversation}
              className="gap-2"
            >
              <StopCircle className="w-4 h-4" />
              Zakończ rozmowę
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border bg-card px-4 py-3">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="lg"
                onClick={isListening ? stopListening : startListening}
                className="gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    Zatrzymaj nagrywanie
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Start / Mów
                  </>
                )}
              </Button>
              <div className="text-sm text-muted-foreground">
                {isSpeaking ? (
                  <span className="text-primary font-medium">
                    🎤 Klient mówi...
                  </span>
                ) : isListening ? (
                  <span className="text-accent font-medium">
                    🎙️ Słucham Twojej odpowiedzi...
                  </span>
                ) : (
                  "Oczekiwanie na start"
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "rep" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${message.role === "rep"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium opacity-80">
                      {message.role === "rep" ? "Ty" : "Klient AI"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-card p-4 shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Lub wpisz swoją odpowiedź..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-96 border-l border-border bg-card overflow-y-auto shrink-0 hidden lg:block">
          <div className="p-4 space-y-6">
            <Card className="shadow-custom-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Ustawienia treningu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Klient:</span>
                  <span className="font-medium ml-auto">
                    {clientTypeLabels[config.clientType]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Trudność:</span>
                  <span className="font-medium ml-auto">
                    {difficultyLabels[config.difficulty]}
                  </span>
                </div>
                {config.goal && (
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Cel:</span>
                    <span className="font-medium ml-auto">
                      {goalLabels[config.goal]}
                    </span>
                  </div>
                )}
                <div className="pt-2">
                  <Badge variant="outline" className="text-xs">
                    {config.isPreset
                      ? "Preset managera"
                      : "Konfiguracja własna"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-custom-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Postęp treningu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {progress}% ukończone
                </p>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-sm">Insighty na żywo</h3>
              </div>
              <div className="space-y-3">
                {relevantInsights.slice(0, 3).map((insight) => (
                  <Card
                    key={insight.id}
                    className="shadow-custom-sm border-accent/30 hover:border-accent/50 transition-colors"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{insight.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <CardDescription className="text-xs leading-relaxed">
                        {insight.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1">
                        {insight.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
