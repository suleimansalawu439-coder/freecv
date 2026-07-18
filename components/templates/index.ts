import NatureOrganic from './NatureOrganic';
import ModernClean from './ModernClean';
import ArtDeco from './ArtDeco';
import BauhausModern from './BauhausModern';
import PopArt from './PopArt';
import Gothic from './Gothic';
import ZenJapanese from './ZenJapanese';
import FuturisticSciFi from './FuturisticSciFi';
import HandDrawn from './HandDrawn';
import Retro80s from './Retro80s';
import Academic from './Academic';
import AcademicJournal from './AcademicJournal';
import AvantGarde from './AvantGarde';
import Bauhaus from './Bauhaus';
import BoldHeader from './BoldHeader';
import Brutalist from './Brutalist';
import BrutalistDark from './BrutalistDark';
import Classic from './Classic';
import CleanSlate from './CleanSlate';
import Compact from './Compact';
import Corporate from './Corporate';
import Creative from './Creative';
import Cyberpunk from './Cyberpunk';
import DarkKnight from './DarkKnight';
import Designer from './Designer';
import Developer from './Developer';
import Elegant from './Elegant';
import ElegantSerif from './ElegantSerif';
import Engineering from './Engineering';
import Executive from './Executive';
import ExecutiveSplit from './ExecutiveSplit';
import Finance from './Finance';
import Glassmorphism from './Glassmorphism';
import Healthcare from './Healthcare';
import Legal from './Legal';
import Magazine from './Magazine';
import Marketing from './Marketing';
import Minimalist from './Minimalist';
import MinimalistSerif from './MinimalistSerif';
import MinimalistSplit from './MinimalistSplit';
import ModernBlock from './ModernBlock';
import ModernSplit from './ModernSplit';
import Monochrome from './Monochrome';
import MonospaceTech from './MonospaceTech';
import Neumorphic from './Neumorphic';
import NotionStyle from './NotionStyle';
import Retro from './Retro';
import Sales from './Sales';
import Startup from './Startup';
import StrictGrid from './StrictGrid';
import SubtleColor from './SubtleColor';
import SwissGrid from './SwissGrid';
import TechPro from './TechPro';
import Terminal from './Terminal';
import Timeline from './Timeline';
import TypographyFirst from './TypographyFirst';

export const templates: Record<string, React.FC<any>> = {
  NatureOrganic,
  ModernClean,
  ArtDeco,
  BauhausModern,
  PopArt,
  Gothic,
  ZenJapanese,
  FuturisticSciFi,
  HandDrawn,
  Retro80s,
  Academic,
  AcademicJournal,
  AvantGarde,
  Bauhaus,
  BoldHeader,
  Brutalist,
  BrutalistDark,
  Classic,
  CleanSlate,
  Compact,
  Corporate,
  Creative,
  Cyberpunk,
  DarkKnight,
  Designer,
  Developer,
  Elegant,
  ElegantSerif,
  Engineering,
  Executive,
  ExecutiveSplit,
  Finance,
  Glassmorphism,
  Healthcare,
  Legal,
  Magazine,
  Marketing,
  Minimalist,
  MinimalistSerif,
  MinimalistSplit,
  ModernBlock,
  ModernSplit,
  Monochrome,
  MonospaceTech,
  Neumorphic,
  NotionStyle,
  Retro,
  Sales,
  Startup,
  StrictGrid,
  SubtleColor,
  SwissGrid,
  TechPro,
  Terminal,
  Timeline,
  TypographyFirst,
};

export type TemplateKey = keyof typeof templates;
