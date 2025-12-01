import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ToneSelectorProps {
  tone: string;
  setTone: (value: string) => void;
}

const ToneSelector = ({ tone, setTone }: ToneSelectorProps) => {
  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">Response Tone</CardTitle>
        <CardDescription>Choose the tone for your reply</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={tone} onValueChange={setTone} className="space-y-3">
          <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="formal" id="formal" />
            <Label
              htmlFor="formal"
              className="flex-1 cursor-pointer font-medium"
            >
              <div className="font-semibold">Formal</div>
              <div className="text-sm text-muted-foreground">
                Professional and respectful business tone
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="friendly" id="friendly" />
            <Label
              htmlFor="friendly"
              className="flex-1 cursor-pointer font-medium"
            >
              <div className="font-semibold">Friendly</div>
              <div className="text-sm text-muted-foreground">
                Warm and approachable while professional
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="concise" id="concise" />
            <Label
              htmlFor="concise"
              className="flex-1 cursor-pointer font-medium"
            >
              <div className="font-semibold">Concise</div>
              <div className="text-sm text-muted-foreground">
                Brief and to-the-point responses
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ToneSelector;
