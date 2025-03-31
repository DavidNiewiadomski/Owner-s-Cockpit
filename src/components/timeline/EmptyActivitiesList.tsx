
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EmptyActivitiesList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent & Upcoming Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-12">
          Detailed activity timeline will be displayed here.
        </p>
      </CardContent>
    </Card>
  );
}
