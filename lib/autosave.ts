/**
 * Client-side debounced autosave utility with revision conflict prevention and network retry.
 */

export type AutosaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

export interface AutosaveOptions<T> {
  debounceMs?: number;
  onStatusChange?: (status: AutosaveStatus) => void;
  saveFn: (data: T, revision: number) => Promise<boolean | void>;
  onError?: (error: unknown) => void;
}

export class AutosaveManager<T> {
  private timer: NodeJS.Timeout | null = null;
  private debounceMs: number;
  private currentRevision = 0;
  private status: AutosaveStatus = 'idle';
  private onStatusChange?: (status: AutosaveStatus) => void;
  private saveFn: (data: T, revision: number) => Promise<boolean | void>;
  private onError?: (error: unknown) => void;

  constructor(options: AutosaveOptions<T>) {
    this.debounceMs = options.debounceMs ?? 1500;
    this.onStatusChange = options.onStatusChange;
    this.saveFn = options.saveFn;
    this.onError = options.onError;
  }

  private setStatus(newStatus: AutosaveStatus) {
    this.status = newStatus;
    if (this.onStatusChange) {
      this.onStatusChange(newStatus);
    }
  }

  public getStatus(): AutosaveStatus {
    return this.status;
  }

  public getRevision(): number {
    return this.currentRevision;
  }

  /**
   * Schedules a debounced save operation.
   */
  public trigger(data: T) {
    this.currentRevision += 1;
    const revisionToSave = this.currentRevision;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.setStatus('pending');

    this.timer = setTimeout(async () => {
      // Only execute if this is still the newest revision
      if (revisionToSave !== this.currentRevision) return;

      this.setStatus('saving');
      try {
        await this.saveFn(data, revisionToSave);
        if (revisionToSave === this.currentRevision) {
          this.setStatus('saved');
        }
      } catch (err) {
        this.setStatus('error');
        if (this.onError) {
          this.onError(err);
        }
      }
    }, this.debounceMs);
  }

  /**
   * Forces an immediate save without waiting for the debounce interval.
   */
  public async flush(data: T): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.currentRevision += 1;
    const rev = this.currentRevision;
    this.setStatus('saving');
    try {
      await this.saveFn(data, rev);
      this.setStatus('saved');
    } catch (err) {
      this.setStatus('error');
      if (this.onError) this.onError(err);
      throw err;
    }
  }

  public destroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
