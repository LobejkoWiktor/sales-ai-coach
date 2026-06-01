import { useState, useEffect, useCallback, useRef } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
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
import { reportChatSession, sendMessage } from "@/lib/api";
import { mockOffers, mockInsights } from "@/data/mockData";
import {
  Mic,
  MicOff,
  Send,
  StopCircle,
  Lightbulb,
  User,
  Target,
  TrendingUp,
  Volume2,
  VolumeX,
  Radio,
} from "lucide-react";
import { Message } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";

const Conversation = () => {
  const navigate = useNavigate();
  const config = storage.getCurrentConfig();
  const sessionData = storage.getCurrentSession();
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState<Message[]>(() => {
    // Use the initial message from the API if available, otherwise use fallback
    const initialContent = sessionData?.message ||
      (language === "pl"
        ? "Dzień dobry! Dziękuję za spotkanie. Jakie rozwiązanie chce mi Pan dzisiaj zaprezentować?"
        : "Hello! Thank you for the meeting. What solution would you like to present to me today?");

    return [
      {
        id: "1",
        role: "client",
        content: initialContent,
        timestamp: new Date().toISOString(),
      },
    ];
  });
  const [input, setInput] = useState("");
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Use refs to access latest values in silence detection callback
  const inputRef = useRef("");
  const isLiveModeRef = useRef(false);
  const sendMessageRef = useRef<() => void>();

  // Keep refs in sync with state
  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  useEffect(() => {
    isLiveModeRef.current = isLiveMode;
  }, [isLiveMode]);

  // Callback for silence detection in live mode
  const handleSilenceDetected = useCallback(() => {
    if (isLiveModeRef.current && inputRef.current.trim()) {
      sendMessageRef.current?.();
    }
  }, []);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    onSilenceDetected: handleSilenceDetected,
    silenceThreshold: 2000,
  });
  const {
    isTTSEnabled,
    toggleTTS,
    speak,
  } = useTextToSpeech();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Handle live mode toggle
  useEffect(() => {
    if (isLiveMode) {
      // Enable TTS when live mode is activated
      if (!isTTSEnabled) {
        toggleTTS();
      }
      // Start listening when live mode is activated
      if (!isListening) {
        startListening();
      }
    } else {
      // Stop listening when live mode is deactivated
      if (isListening) {
        stopListening();
      }
      // Disable TTS when live mode is deactivated
      if (isTTSEnabled) {
        toggleTTS();
      }
    }
  }, [isLiveMode]);

  // Auto-speak AI client messages when TTS is enabled
  useEffect(() => {
    if (isTTSEnabled && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Only speak client messages, not rep messages
      if (lastMessage.role === "client") {
        speak(lastMessage.content);
      }
    }
  }, [messages, isTTSEnabled, speak]);

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

  // Helper function to translate static mock insights in UI
  const getInsightText = (insightId: string, field: "title" | "description", defaultVal: string) => {
    const translationsMap: Record<string, { title: { pl: string; en: string }; description: { pl: string; en: string } }> = {
      i1: {
        title: { pl: "Podkreśl ROI dla CFO", en: "Emphasize ROI for CFO" },
        description: {
          pl: "CFO koncentruje się na zwrocie z inwestycji. Podaj konkretne liczby: średnio 35% wzrost efektywności w ciągu 6 miesięcy.",
          en: "CFO focuses on return on investment. Give concrete numbers: average 35% efficiency increase within 6 months."
        }
      },
      i2: {
        title: { pl: "Integracje z systemami finansowymi", en: "Integrations with financial systems" },
        description: {
          pl: "Podkreśl łatwą integrację z SAP, Oracle Financials i popularnymi systemami księgowymi.",
          en: "Emphasize easy integration with SAP, Oracle Financials, and popular accounting systems."
        }
      },
      i3: {
        title: { pl: "Bezpieczeństwo danych", en: "Data security" },
        description: {
          pl: "Certyfikaty ISO 27001, SOC 2, zgodność z GDPR. Dane szyfrowane end-to-end.",
          en: "ISO 27001, SOC 2 certificates, GDPR compliance. Data is encrypted end-to-end."
        }
      },
      i4: {
        title: { pl: "Prostota wdrożenia", en: "Ease of implementation" },
        description: {
          pl: "Wdrożenie w 48h bez pomocy IT. Intuicyjny interfejs, który nie wymaga szkoleń.",
          en: "Deployment in 48h without IT help. Intuitive interface that requires no training."
        }
      },
      i5: {
        title: { pl: "Customowe dashboardy", en: "Custom dashboards" },
        description: {
          pl: "Nieograniczone możliwości dostosowania widoków do potrzeb różnych działów.",
          en: "Unlimited customization options for views tailored to the needs of different departments."
        }
      }
    };
    return translationsMap[insightId]?.[field]?.[language] ?? defaultVal;
  };

  const getInsightTags = (insightId: string, defaultTags: string[]) => {
    const tagsMap: Record<string, { pl: string[]; en: string[] }> = {
      i1: { pl: ["ROI", "Finanse", "Wartość"], en: ["ROI", "Finance", "Value"] },
      i2: { pl: ["Integracja", "Finanse"], en: ["Integration", "Finance"] },
      i3: { pl: ["Bezpieczeństwo", "Compliance"], en: ["Security", "Compliance"] },
      i4: { pl: ["Onboarding", "UX"], en: ["Onboarding", "UX"] },
      i5: { pl: ["Customizacja", "Funkcje"], en: ["Customization", "Features"] }
    };
    return tagsMap[insightId]?.[language] ?? defaultTags;
  };

  const handleSendMessage = useCallback(async () => {
    // Capture the current input value immediately
    const messageContent = inputRef.current.trim();
    if (!messageContent) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "rep",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    // Clear input immediately after capturing
    setInput("");
    inputRef.current = "";
    resetTranscript();

    setMessages((prev) => [...prev, newMessage]);
    setProgress((prev) => Math.min(prev + 10, 85));

    // DEMO MODE: Use mock response instead of API call
    // Simulate a delay for more realistic conversation flow
    setTimeout(() => {
      const mockClientResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "client",
        content: language === "pl"
          ? "Dziękuję za Twoją odpowiedź. To jest wersja demonstracyjna aplikacji SalesTwin - pełna wersja z AI-klientem będzie dostępna wkrótce. W pełnej wersji otrzymasz realistyczne odpowiedzi od AI-klienta, który będzie reagował na Twoje argumenty sprzedażowe i pomagał Ci doskonalić umiejętności."
          : "Thank you for your response. This is a demo version of the SalesTwin application - the full version with an AI client will be available soon. In the full version, you will receive realistic responses from the AI client, which will react to your sales arguments and help you improve your skills.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, mockClientResponse]);
    }, 800);

    // Original API call - COMMENTED OUT FOR DEMO MODE
    // if (sessionData?.sessionId) {
    //   try {
    //     const response = await sendMessage({
    //       sessionId: sessionData.sessionId,
    //       content: messageContent,
    //     });
    // 
    //     console.log("API Response from /chat-sessions/messages:", response);
    //     console.log("Message content:", response.message);
    // 
    //     const clientResponse: Message = {
    //       id: (Date.now() + 1).toString(),
    //       role: "client",
    //       content: response.message,
    //       timestamp: new Date().toISOString(),
    //     };
    //     setMessages((prev) => [...prev, clientResponse]);
    //   } catch (error) {
    //     console.error("Failed to send message:", error);
    //     // Fallback to a generic error message if API fails
    //     const errorResponse: Message = {
    //       id: (Date.now() + 1).toString(),
    //       role: "client",
    //       content: language === "pl"
    //         ? "Przepraszam, wystąpił problem z połączeniem. Spróbuj ponownie."
    //         : "Sorry, there was a connection problem. Please try again.",
    //       timestamp: new Date().toISOString(),
    //     };
    //     setMessages((prev) => [...prev, errorResponse]);
    //   }
    // }
  }, [sessionData?.sessionId, resetTranscript, language]);

  // Assign to ref for silence detection callback
  sendMessageRef.current = handleSendMessage;

  const handleEndConversation = async () => {
    // Report session completion to the API if we have a session ID
    if (sessionData?.sessionId) {
      try {
        console.log("Reporting session completion with sessionId:", sessionData.sessionId);
        const reportResponse = await reportChatSession({ sessionId: sessionData.sessionId });
        console.log("Session reported successfully, received report:", reportResponse);

        // Check if we have valid report data
        if (reportResponse.report) {
          const session = {
            id: reportResponse.sessionId,
            date: new Date().toISOString().split("T")[0],
            config,
            score: reportResponse.report.overallScore,
            metrics: {
              productKnowledge: reportResponse.report.offerKnowledgeScore,
              needsAnalysis: reportResponse.report.needsAnalysisScore,
              valueArgumentation: reportResponse.report.valueArgumentationScore,
            },
            usedInsights: relevantInsights.slice(0, 2),
            messages,
            feedback: {
              strengths: reportResponse.report.positiveComments,
              improvements: reportResponse.report.improvementComments,
            },
          };

          storage.addSession(session);
          navigate(`/summary/${session.id}`);
        } else {
          console.error("No report data received from API");
          // Fallback to mock data if no report is available
          createMockSessionAndNavigate();
        }
      } catch (error) {
        console.error("Failed to report session:", error);
        // Continue to show summary with mock data even if reporting fails
        createMockSessionAndNavigate();
      }
    } else {
      // No session ID, use mock data
      createMockSessionAndNavigate();
    }
  };

  const createMockSessionAndNavigate = () => {
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
        strengths: language === "pl"
          ? [
              "Świetnie przedstawiłeś wartość produktu",
              "Dobra reakcja na pytania klienta",
              "Wykorzystałeś insighty w odpowiednim momencie",
            ]
          : [
              "You presented the product value excellently",
              "Good response to client questions",
              "You used insights at the right moment",
            ],
        improvements: language === "pl"
          ? [
              "Możesz zadawać więcej pytań odkrywających potrzeby",
              "Spróbuj doprowadzić rozmowę do konkretnych next steps",
            ]
          : [
              "You could ask more questions to discover needs",
              "Try to guide the conversation to concrete next steps",
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
            <h1 className="text-xl font-heading font-bold">{t("conversation", "trainingInProgress")}</h1>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEndConversation}
              className="gap-2"
            >
              <StopCircle className="w-4 h-4" />
              {t("conversation", "endConversation")}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border bg-card px-4 py-3">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isLiveMode ? "default" : "outline"}
                size="lg"
                onClick={() => setIsLiveMode(!isLiveMode)}
                className={`gap-2 ${isLiveMode ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                <Radio className={`w-5 h-5 ${isLiveMode ? 'animate-pulse' : ''}`} />
                {isLiveMode ? t("conversation", "liveMode") : t("conversation", "enableLive")}
              </Button>
              <Button
                variant={isListening ? "destructive" : "default"}
                size="lg"
                onClick={isListening ? stopListening : startListening}
                disabled={isLiveMode}
                className="gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    {t("conversation", "stopRecording")}
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    {t("conversation", "startSpeak")}
                  </>
                )}
              </Button>
              <Button
                variant={isTTSEnabled ? "default" : "outline"}
                size="lg"
                onClick={toggleTTS}
                disabled={isLiveMode}
                className="gap-2"
              >
                {isTTSEnabled ? (
                  <>
                    <Volume2 className="w-5 h-5" />
                    {t("conversation", "ttsOn")}
                  </>
                ) : (
                  <>
                    <VolumeX className="w-5 h-5" />
                    {t("conversation", "ttsOff")}
                  </>
                )}
              </Button>
              <div className="text-sm text-muted-foreground">
                {isLiveMode ? (
                  <span className="text-green-600 font-medium">
                    {t("conversation", "liveConversation")}
                  </span>
                ) : isSpeaking ? (
                  <span className="text-primary font-medium">
                    {t("conversation", "clientSpeaking")}
                  </span>
                ) : isListening ? (
                  <span className="text-accent font-medium">
                    {t("conversation", "listeningToYou")}
                  </span>
                ) : (
                  t("conversation", "waitingForStart")
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
                      {message.role === "rep" ? t("conversation", "you") : t("conversation", "aiClient")}
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
                placeholder={t("conversation", "inputPlaceholder")}
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
                  {t("conversation", "trainingSettings")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{t("common", "client")}</span>
                  <span className="font-medium ml-auto">
                    {t("clientTypeLabels", config.clientType)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{t("common", "difficulty")}</span>
                  <span className="font-medium ml-auto">
                    {t("difficultyLabels", config.difficulty)}
                  </span>
                </div>
                {config.goal && (
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{t("common", "goal")}</span>
                    <span className="font-medium ml-auto">
                      {t("goalLabels", config.goal)}
                    </span>
                  </div>
                )}
                <div className="pt-2">
                  <Badge variant="outline" className="text-xs">
                    {config.isPreset
                      ? t("common", "presetManager")
                      : t("common", "ownConfigBadge")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-custom-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  {t("conversation", "trainingProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {progress}% {t("conversation", "completed")}
                </p>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-sm">{t("conversation", "liveInsights")}</h3>
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
                        <span>{getInsightText(insight.id, "title", insight.title)}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <CardDescription className="text-xs leading-relaxed">
                        {getInsightText(insight.id, "description", insight.description)}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1">
                        {getInsightTags(insight.id, insight.tags).map((tag) => (
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
