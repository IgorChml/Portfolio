/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'ecommerce' | 'services' | 'portfolio';
  categoryLabel: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  localVideo: string;
  fallbackVideo: string;
  siteUrl: string;
  features: string[];
  thumbnailGradient: string;
  completedYear: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
