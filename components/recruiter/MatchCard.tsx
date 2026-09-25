"use client";
import React, { useState } from "react";
import { MapPin, Briefcase, Unlock, Loader2, Bookmark, Check, Lock, Mail, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  JdMatch, UnlockContact, MatchTier,
  unlockContact, addToShortlist, removeFromShortlist, ApiError,
} from "@/lib/recruiter-api";
import toast from "react-hot-toast";

const TIER_STYLE: Record<MatchTier, { label: string; border: string; text: string; bg: string }> = {
  excellent: { label: "Excellent", border: "border-[#0E8A4B]", text: "text-[#0E8A4B]", bg: "bg-[#0E8A4B]/10" },
  strong: { label: "Strong", border: "border-[#2233FF]", text: "text-[#2233FF]", bg: "bg-[#2233FF]/10" },
  moderate: { label: "Moderate", border: "border-[#141312]/40", text: "text-[#141312]/70", bg: "bg-[#E8E7E1]" },
};

/**
 * Anonymized candidate card. Pre-unlock: headline, title, years, top skills,
 * location, match reasons — NEVER names, photos, or contact details.
 * Unlock spends 1 credit and reveals contact inline.
 */
export function MatchCard({
  match,
  onCreditsChanged,
  defaultShortlisted = false,
}: {
  match: JdMatch;
  onCreditsChanged: (remaining: number) => void;
  defaultShortlisted?: boolean;
}) {
  const [unlocking, setUnlocking] = useState(false);
  const [contact, setContact] = useState<UnlockContact | null>(null);
  const [shortlisted, setShortlisted] = useState(defaultShortlisted || !!match.shortlisted);
  const [shortlistBusy, setShortlistBusy] = useState(false);
  const p = match.profile;
  const tier = TIER_STYLE[match.tier] ?? TIER_STYLE.moderate;

  const handleUnlock = async () => {
    if (contact || unlocking) return;
    setUnlocking(true);
    try {
      const res = await unlockContact(match.profileId);
      setContact(res.contact);
      onCreditsChanged(res.remainingCredits);
      toast.success(`Contact unlocked — ${res.remainingCredits} credit${res.remainingCredits === 1 ? "" : "s"} left.`);
    } catch (e: any) {
      if (e instanceof ApiError && e.code === "out_of_credits") {
        toast.error("You're out of credits — buy a pack to unlock contacts.", { duration: 5000 });
      } else {
        toast.error(e?.message || "Couldn't unlock this contact.");
      }
    } finally {
      setUnlocking(false);
    }
  };

  const toggleShortlist = async () => {
    if (shortlistBusy) return;
    setShortlistBusy(true);
    try {
      if (shortlisted) {
        await removeFromShortlist(match.profileId);
        setShortlisted(false);
        toast.success("Removed from shortlist.");
      } else {
        await addToShortlist(match.profileId);
        setShortlisted(true);
        toast.success("Shortlisted.");
      }
    } catch (e: any) {
      toast.error(e?.message || "Couldn't update shortlist.");
    } finally {
      setShortlistBusy(false);
    }
  };

  return (
    <article className="flex flex-col border-[3px] border-[#141312] bg-white hs">
      <div className="flex items-start justify-between gap-3 border-b-2 border-[#141312]/10 p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("border-2 px-2 py-0.5 fm text-[10px] font-bold uppercase tracking-[0.16em]", tier.border, tier.text, tier.bg)}>
              {tier.label} · {match.score}%
            </span>
            <span className="border-2 border-[#141312] bg-[#E8E7E1] px-2 py-0.5 fm text-[10px] font-bold uppercase tracking-[0.16em] text-[#141312]/70">
              {p.completenessScore}% profile
            </span>
          </div>
          <h3 className="fh mt-2 text-lg font-extrabold tracking-tight text-[#141312]">{p.headline || "Candidate"}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[#141312]/75">
            <Briefcase size={13} className="text-[#2233FF]" /> {p.currentTitle || "—"}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 fm text-[11px] uppercase tracking-wider text-[#141312]/70">
            {(p.location || p.country) && (
              <span className="flex items-center gap-1"><MapPin size={12} /> {[p.location, p.country].filter(Boolean).join(", ")}</span>
            )}
            {p.yearsExperience != null && <span>{p.yearsExperience} yrs exp</span>}
          </div>
        </div>
        <button
          onClick={toggleShortlist}
          disabled={shortlistBusy}
          aria-label={shortlisted ? "Remove from shortlist" : "Shortlist candidate"}
          title={shortlisted ? "Remove from shortlist" : "Shortlist candidate"}
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center border-[3px] transition-all",
            shortlisted
              ? "border-[#141312] bg-[#FFE14D] text-[#141312]"
              : "border-[#141312]/30 bg-white text-[#141312]/40 hover:border-[#141312] hover:text-[#141312]",
          )}
        >
          {shortlistBusy ? <Loader2 size={16} className="animate-spin" /> : <Bookmark size={16} fill={shortlisted ? "currentColor" : "none"} />}
        </button>
      </div>

      {p.topSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 px-5 pt-4">
          {p.topSkills.slice(0, 8).map((s) => (
            <span key={s} className="border-2 border-[#141312] bg-[#E8E7E1] px-2 py-1 fm text-[9px] font-bold uppercase tracking-[0.16em]">{s}</span>
          ))}
        </div>
      )}

      {match.reasons.length > 0 && (
        <ul className="space-y-1.5 px-5 pt-4">
          {match.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#141312]/75">
              <Check size={14} className="mt-0.5 shrink-0 text-[#0E8A4B]" /> {r}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto px-5 pb-5 pt-5">
        {contact ? (
          <div className="border-[3px] border-[#0E8A4B] bg-[#0E8A4B]/10 p-4">
            <div className="fm mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E8A4B]">
              <Unlock size={12} /> contact unlocked
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2 font-bold text-[#141312]"><User size={14} className="text-[#141312]/50" /> {contact.fullName}</div>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 font-semibold text-[#2233FF] hover:underline">
                <Mail size={14} className="text-[#141312]/50" /> {contact.email}
              </a>
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2 font-semibold text-[#2233FF] hover:underline">
                  <Phone size={14} className="text-[#141312]/50" /> {contact.phone}
                </a>
              )}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleUnlock}
              disabled={unlocking}
              className="flex w-full items-center justify-center gap-2 border-[3px] border-[#141312] bg-[#141312] px-5 py-3 fh text-xs font-extrabold uppercase tracking-wider text-[#E8E7E1] transition-all hover:bg-[#FF4326] hover:border-[#FF4326] disabled:opacity-60"
            >
              {unlocking ? <Loader2 size={15} className="animate-spin" /> : <Lock size={14} />}
              Unlock contact — 1 credit
            </button>
            <p className="mt-2 text-center fm text-[10px] uppercase tracking-[0.14em] text-[#141312]/45">
              name & contact stay hidden until unlock
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
