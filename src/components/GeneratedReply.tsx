import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GeneratedReplyProps {
  reply: string;
  onEdit: (newReply: string) => void;
}

const GeneratedReply = ({ reply, onEdit }: GeneratedReplyProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReply, setEditedReply] = useState(reply);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(isEditing ? editedReply : reply);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The reply has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    onEdit(editedReply);
    setIsEditing(false);
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Generated Reply</CardTitle>
        <CardDescription>Review and edit your AI-generated response</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <Textarea
            value={editedReply}
            onChange={(e) => setEditedReply(e.target.value)}
            className="min-h-[300px] border-border/50 focus:ring-primary font-sans resize-none"
          />
        ) : (
          <div className="min-h-[300px] rounded-lg border border-border/50 bg-muted/30 p-4">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {reply}
            </pre>
          </div>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setEditedReply(reply);
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit Reply
              </Button>
              <Button
                onClick={handleCopy}
                className="bg-accent hover:bg-accent/90"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneratedReply;
