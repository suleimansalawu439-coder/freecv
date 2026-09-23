import type { ComponentType } from 'react';
import type { ResumeData } from '@/store/useResumeStore';

import Academic from './Academic';
import AcademicJournal from './AcademicJournal';
import Atelier from './Atelier';
import Caliber from './Caliber';
import Classic from './Classic';
import Clarity from './Clarity';
import Condensed from './Condensed';
import CorporateBlue from './CorporateBlue';
import Counsel from './Counsel';
import Diplomat from './Diplomat';
import Elegant from './Elegant';
import ElegantEditorial from './ElegantEditorial';
import Executive from './Executive';
import ExecutiveSplit from './ExecutiveSplit';
import Forge from './Forge';
import Founder from './Founder';
import Gigfolio from './Gigfolio';
import Launchpad from './Launchpad';
import Maitre from './Maitre';
import Marketing from './Marketing';
import Mentor from './Mentor';
import MinimalistSplit from './MinimalistSplit';
import ModernGradient from './ModernGradient';
import NightShift from './NightShift';
import Noir from './Noir';
import Nomad from './Nomad';
import ParsePerfect from './ParsePerfect';
import Pivot from './Pivot';
import Polyglot from './Polyglot';
import Portrait from './Portrait';
import Rainmaker from './Rainmaker';
import Reentry from './Reentry';
import Showcase from './Showcase';
import Sovereign from './Sovereign';
import SwissDesign from './SwissDesign';
import SwissGrid from './SwissGrid';
import SwissMinimal from './SwissMinimal';
import TechPro from './TechPro';
import Timeline from './Timeline';
import TypographyFirst from './TypographyFirst';
import Valor from './Valor';
import Vivid from './Vivid';
import ZenJapanese from './ZenJapanese';

export const templates = {
  Academic,
  AcademicJournal,
  Atelier,
  Caliber,
  Classic,
  Clarity,
  Condensed,
  CorporateBlue,
  Counsel,
  Diplomat,
  Elegant,
  ElegantEditorial,
  Executive,
  ExecutiveSplit,
  Forge,
  Founder,
  Gigfolio,
  Launchpad,
  Maitre,
  Marketing,
  Mentor,
  MinimalistSplit,
  ModernGradient,
  NightShift,
  Noir,
  Nomad,
  ParsePerfect,
  Pivot,
  Polyglot,
  Portrait,
  Rainmaker,
  Reentry,
  Showcase,
  Sovereign,
  SwissDesign,
  SwissGrid,
  SwissMinimal,
  TechPro,
  Timeline,
  TypographyFirst,
  Valor,
  Vivid,
  ZenJapanese,
} satisfies Record<string, ComponentType<{ data: ResumeData }>>;

export type TemplateKey = keyof typeof templates;
