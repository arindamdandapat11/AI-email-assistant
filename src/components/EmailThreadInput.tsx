import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EmailThreadInputProps {
  sender: string;
  setSender: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  body: string;
  setBody: (value: string) => void;
}

const EmailThreadInput = ({
  sender,
  setSender,
  subject,
  setSubject,
  body,
  setBody,
}: EmailThreadInputProps) => {
  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">Email Thread</CardTitle>
        <CardDescription>Enter the email you want to reply to</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sender" className="text-sm font-medium">
            From
          </Label>
          <Input
            id="sender"
            placeholder="sender@example.com"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="border-border/50 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-border/50 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body" className="text-sm font-medium">
            Email Body
          </Label>
          <Textarea
            id="body"
            placeholder="Paste the email content here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[200px] border-border/50 focus:ring-primary resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailThreadInput;
