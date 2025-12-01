import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles } from "lucide-react";
import EmailThreadInput from "@/components/EmailThreadInput";
import ToneSelector from "@/components/ToneSelector";
import GeneratedReply from "@/components/GeneratedReply";

const Index = () => {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tone, setTone] = useState("formal");
  const [generatedReply, setGeneratedReply] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!sender.trim() || !subject.trim() || !body.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before generating a reply.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-reply', {
        body: {
          sender,
          subject,
          body,
          tone,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setGeneratedReply(data.reply);
      toast({
        title: "Reply generated",
        description: "Your AI-powered reply is ready!",
      });
    } catch (error) {
      console.error('Error generating reply:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Assistant</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Email Reply Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate professional email replies in seconds with AI.
            Choose your tone and let our assistant craft the perfect response.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <EmailThreadInput
              sender={sender}
              setSender={setSender}
              subject={subject}
              setSubject={setSubject}
              body={body}
              setBody={setBody}
            />
            <ToneSelector tone={tone} setTone={setTone} />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Reply...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Reply
                </>
              )}
            </Button>
          </div>

          {/* Right Column */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {generatedReply ? (
              <GeneratedReply
                reply={generatedReply}
                onEdit={setGeneratedReply}
              />
            ) : (
              <Card className="border-border/50 shadow-sm bg-muted/30">
                <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Ready to Generate
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in the email details and select a tone to generate your
                    AI-powered reply
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Import Card for the placeholder
import { Card, CardContent } from "@/components/ui/card";

export default Index;
