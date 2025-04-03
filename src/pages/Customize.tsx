
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';

export default function Customize() {
  return (
    <DashboardLayout projectContext="Customize">
      <CustomizablePageLayout pageId="customize" />
    </DashboardLayout>
  );
}
