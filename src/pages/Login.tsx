import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/types";
import { mockUsers } from "@/data/mockData";
import { storage } from "@/lib/storage";
import { Sparkles } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("sales-rep");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      storage.setCurrentUser(user);
      if (role === "sales-rep") {
        navigate("/dashboard");
      } else {
        navigate("/manager");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <Card className="w-full max-w-md shadow-custom-lg border-border/50">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-custom-md">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-heading">SalesTwin</CardTitle>
          <CardDescription className="text-base">
            Trenuj sprzedaż z AI-klientem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2">
                <Label className="text-base mb-3 block">
                  Zaloguj jako (demo):
                </Label>
                <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="sales-rep" id="sales-rep" />
                    <Label htmlFor="sales-rep" className="cursor-pointer flex-1">
                      Handlowiec
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="manager" id="manager" />
                    <Label htmlFor="manager" className="cursor-pointer flex-1">
                      Manager / Trener
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-medium">
              Zaloguj się
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Nie pamiętasz hasła?
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
