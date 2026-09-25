import type { ComponentType } from 'react';
import type { ResumeData } from '@/store/useResumeStore';

import Academic from './Academic';
import AcademicJournal from './AcademicJournal';
import Arsenal from './Arsenal';
import Atelier from './Atelier';
import Caliber from './Caliber';
import Chevron from './Chevron';
import Classic from './Classic';
import Clarity from './Clarity';
import Condensed from './Condensed';
import CorporateBlue from './CorporateBlue';
import Counsel from './Counsel';
import Density from './Density';
import Diplomat from './Diplomat';
import Elegant from './Elegant';
import ElegantEditorial from './ElegantEditorial';
import Ember from './Ember';
import Executive from './Executive';
import ExecutiveSplit from './ExecutiveSplit';
import Forge from './Forge';
import Founder from './Founder';
import Gauge from './Gauge';
import Gigfolio from './Gigfolio';
import Glyph from './Glyph';
import Launchpad from './Launchpad';
import Maitre from './Maitre';
import Marketing from './Marketing';
import Mentor from './Mentor';
import MinimalistSplit from './MinimalistSplit';
import ModernGradient from './ModernGradient';
import Mono from './Mono';
import NightShift from './NightShift';
import Noir from './Noir';
import Nomad from './Nomad';
import ParsePerfect from './ParsePerfect';
import Pivot from './Pivot';
import Polyglot from './Polyglot';
import Portrait from './Portrait';
import Rail from './Rail';
import Rainmaker from './Rainmaker';
import Reentry from './Reentry';
import Showcase from './Showcase';
import Sovereign from './Sovereign';
import SwissDesign from './SwissDesign';
import SwissGrid from './SwissGrid';
import SwissMinimal from './SwissMinimal';
import Summit from './Summit';
import TechPro from './TechPro';
import Timeline from './Timeline';
import Triad from './Triad';
import TypographyFirst from './TypographyFirst';
import Valor from './Valor';
import Vivid from './Vivid';
import ZenJapanese from './ZenJapanese';

export const templates = {
  Academic,
  AcademicJournal,
  Arsenal,
  Atelier,
  Caliber,
  Chevron,
  Classic,
  Clarity,
  Condensed,
  CorporateBlue,
  Counsel,
  Density,
  Diplomat,
  Elegant,
  ElegantEditorial,
  Ember,
  Executive,
  ExecutiveSplit,
  Forge,
  Founder,
  Gauge,
  Gigfolio,
  Glyph,
  Launchpad,
  Maitre,
  Marketing,
  Mentor,
  MinimalistSplit,
  ModernGradient,
  Mono,
  NightShift,
  Noir,
  Nomad,
  ParsePerfect,
  Pivot,
  Polyglot,
  Portrait,
  Rail,
  Rainmaker,
  Reentry,
  Showcase,
  Sovereign,
  SwissDesign,
  SwissGrid,
  SwissMinimal,
  Summit,
  TechPro,
  Timeline,
  Triad,
  TypographyFirst,
  Valor,
  Vivid,
  ZenJapanese,
} satisfies Record<string, ComponentType<{ data: ResumeData }>>;

export type TemplateKey = keyof typeof templates;
