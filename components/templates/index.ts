import Academic from './Academic';
import AcademicJournal from './AcademicJournal';
import ArtDeco from './ArtDeco';
import AvantGarde from './AvantGarde';
import Bauhaus from './Bauhaus';
import BauhausModern from './BauhausModern';
import BoldHeader from './BoldHeader';
import Brutalist from './Brutalist';
import BrutalistMinimal from './BrutalistMinimal';
import Classic from './Classic';
import CleanSlate from './CleanSlate';
import Compact from './Compact';
import Corporate from './Corporate';
import CorporateBlue from './CorporateBlue';
import Creative from './Creative';
import CreativeAsymmetrical from './CreativeAsymmetrical';
import CyberDark from './CyberDark';
import DarkModeTech from './DarkModeTech';
import Designer from './Designer';
import Developer from './Developer';
import EditorialMagazine from './EditorialMagazine';
import Elegant from './Elegant';
import ElegantEditorial from './ElegantEditorial';
import ElegantSerif from './ElegantSerif';
import Engineering from './Engineering';
import Executive from './Executive';
import ExecutiveSplit from './ExecutiveSplit';
import Finance from './Finance';
import HandDrawn from './HandDrawn';
import Healthcare from './Healthcare';
import Legal from './Legal';
import Magazine from './Magazine';
import Marketing from './Marketing';
import Minimalist from './Minimalist';
import MinimalistSerif from './MinimalistSerif';
import MinimalistSplit from './MinimalistSplit';
import ModernBlock from './ModernBlock';
import ModernClean from './ModernClean';
import ModernGradient from './ModernGradient';
import ModernSplit from './ModernSplit';
import Monochrome from './Monochrome';
import MonospaceTech from './MonospaceTech';
import NatureOrganic from './NatureOrganic';
import NotionStyle from './NotionStyle';
import PastelDream from './PastelDream';
import RetroVintage from './RetroVintage';
import Sales from './Sales';
import Startup from './Startup';
import StrictGrid from './StrictGrid';
import SubtleColor from './SubtleColor';
import SwissDesign from './SwissDesign';
import SwissGrid from './SwissGrid';
import SwissMinimal from './SwissMinimal';
import TechPro from './TechPro';
import Terminal from './Terminal';
import Timeline from './Timeline';
import TypographyFirst from './TypographyFirst';
import ZenJapanese from './ZenJapanese';

export const templates: Record<string, React.FC<any>> = {
  Academic,
  AcademicJournal,
  ArtDeco,
  AvantGarde,
  Bauhaus,
  BauhausModern,
  BoldHeader,
  Brutalist,
  BrutalistMinimal,
  Classic,
  CleanSlate,
  Compact,
  Corporate,
  CorporateBlue,
  Creative,
  CreativeAsymmetrical,
  CyberDark,
  DarkModeTech,
  Designer,
  Developer,
  EditorialMagazine,
  Elegant,
  ElegantEditorial,
  ElegantSerif,
  Engineering,
  Executive,
  ExecutiveSplit,
  Finance,
  HandDrawn,
  Healthcare,
  Legal,
  Magazine,
  Marketing,
  Minimalist,
  MinimalistSerif,
  MinimalistSplit,
  ModernBlock,
  ModernClean,
  ModernGradient,
  ModernSplit,
  Monochrome,
  MonospaceTech,
  NatureOrganic,
  NotionStyle,
  PastelDream,
  RetroVintage,
  Sales,
  Startup,
  StrictGrid,
  SubtleColor,
  SwissDesign,
  SwissGrid,
  SwissMinimal,
  TechPro,
  Terminal,
  Timeline,
  TypographyFirst,
  ZenJapanese,
};

export type TemplateKey = keyof typeof templates;