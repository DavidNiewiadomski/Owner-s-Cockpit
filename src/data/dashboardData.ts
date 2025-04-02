
import { documents } from './documents/documentData';
import { dashboardInsights } from './notifications/notificationData';

// Project documents lookup by project ID
export const projectDocuments = {
  'all': documents,
  '1': documents.filter(doc => doc.project === 'Riverfront Tower'),
  '2': documents.filter(doc => doc.project === 'Westview Residences'),
  '3': documents.filter(doc => doc.project === 'Harbor Bridge'),
};

export { dashboardInsights };
