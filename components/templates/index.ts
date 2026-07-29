import type { ComponentType } from 'react';
import type { ResumeData } from '@/store/useResumeStore';

import Academic from './Academic';
import AcademicJournal from './AcademicJournal';
import Classic from './Classic';
import CorporateBlue from './CorporateBlue';
import Diplomat from './Diplomat';
import Elegant from './Elegant';
import ElegantEditorial from './ElegantEditorial';
import Executive from './Executive';
import ExecutiveSplit from './ExecutiveSplit';
import Marketing from './Marketing';
import MinimalistSplit from './MinimalistSplit';
import ModernGradient from './ModernGradient';
import SwissDesign from './SwissDesign';
import SwissGrid from './SwissGrid';
import SwissMinimal from './SwissMinimal';
import TechPro from './TechPro';
import TypographyFirst from './TypographyFirst';
import ZenJapanese from './ZenJapanese';

export const templates = {
  Academic,
  AcademicJournal,
  Classic,
  CorporateBlue,
  Diplomat,
  Elegant,
  ElegantEditorial,
  Executive,
  ExecutiveSplit,
  Marketing,
  MinimalistSplit,
  ModernGradient,
  SwissDesign,
  SwissGrid,
  SwissMinimal,
  TechPro,
  TypographyFirst,
  ZenJapanese,
} satisfies Record<string, ComponentType<{ data: ResumeData }>>;

export type TemplateKey = keyof typeof templates;
