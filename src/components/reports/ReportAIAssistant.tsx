
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Report {
  id: string;
  name: string;
  path: string;
}

interface ReportAIAssistantProps {
  currentReport: Report;
  onSelectReport: (reportId: string) => void;
}

export function ReportAIAssistant({ 
  currentReport, 
  onSelectReport 
}: ReportAIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const handleAIRequest = () => {
    if (!prompt.trim()) return;
    
    setProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false);
      setResult("I've created a custom report based on your request. The report focuses on the key metrics you mentioned and includes the visualizations you requested. Would you like to export this report now?");
      // In a real implementation, we would receive a report ID from the API
      // and set it as the selected report
      onSelectReport(currentReport.id);
    }, 2000);
  };
  
  const handleReset = () => {
    setPrompt('');
    setResult(null);
  };
  
  return (
    <div className="space-y-4">
      <Card className="border-blue-900/30 bg-black/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-200">AI Report Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-4">
            Describe what kind of report you need and our AI will create a custom report for you.
          </p>
          
          <Textarea
            placeholder="For example: Create a report focusing on project delays in the past month with cost impact analysis..."
            className="h-24 resize-none bg-gray-900 border-gray-700"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={processing}
          />
          
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300"
              onClick={handleReset}
              disabled={processing}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              className="bg-blue-700 hover:bg-blue-600 text-white"
              onClick={handleAIRequest}
              disabled={!prompt.trim() || processing}
            >
              {processing ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-t-transparent border-blue-200"></div>
                  Processing...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {result && (
        <Card className="border-green-900/30 bg-black/40">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <CardTitle className="text-lg text-green-300">AI Response</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{result}</p>
            
            <Separator className="my-4 bg-gray-800" />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Generated from {currentReport.name}</div>
              <Button size="sm" variant="outline" className="border-green-800 bg-green-900/20 text-green-300 hover:bg-green-800/30 hover:text-green-200">
                <CheckCircle className="h-3 w-3 mr-1" /> Ready to Export
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="border-blue-900/30 bg-black/40">
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
            <CardTitle className="text-lg text-blue-200">AI Report Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-400 list-disc list-inside">
            <li>Specify the time period you want the report to cover</li>
            <li>Mention specific metrics or data points you're interested in</li>
            <li>Ask for specific visualizations if you have preferences</li>
            <li>Request comparisons with previous periods if needed</li>
            <li>Mention if you need executive summaries or detailed analysis</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
