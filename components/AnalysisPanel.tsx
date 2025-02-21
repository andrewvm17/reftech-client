import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function AnalysisPanel() {
  return (
    <Card className="glass-panel w-80">
      <CardHeader>
        <CardTitle className="text-lg">Current Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Draw vertical lines to determine offside positions. Use red for the defensive line and blue for the attacking
          player.
        </p>
      </CardContent>
    </Card>
  )
}

