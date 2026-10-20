import {
  Component, OnInit, OnDestroy,
  ChangeDetectorRef, ChangeDetectionStrategy,
  ElementRef, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teaser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TeaserComponent implements OnInit, OnDestroy {

  currentScreen = 0;
  torchActive = false;
  torchStyle = 'background: radial-gradient(circle 0px at 50% 50%, transparent 0%, #05080f 1%)';
  glitchStep = 0;

  eggs = [
    { icon: '🎮', name: 'Konami Code' },
    { icon: '👁',  name: 'Click secret' },
    { icon: '⌨️', name: 'Console dev' },
  ];

  private timers: any[] = [];
  private torchEl: HTMLElement | null = null;

  constructor(private cdr: ChangeDetectorRef, private elRef: ElementRef) {}

  ngOnInit() {
    console.log('%c👾 Hey toi, le dev curieux !', 'color:#00e0ff;font-size:18px;font-weight:bold');
    console.log('%cTu as trouvé le secret console. Bien joué.', 'color:#ffffff99;font-size:13px');
    console.log('%cMaintenant trouve les 2 autres easter eggs 👉 https://manal-kerroumi.vercel.app/', 'color:#00e0ff88;font-size:12px');
  }

  ngOnDestroy() { this.timers.forEach(t => clearTimeout(t)); }

  goTo(n: number) {
    this.currentScreen = n;
    this.cdr.detectChanges();
    if (n === 1) this.startGlitch();
  }

  // ── TORCH ──
  onMouseEnter() {
    this.torchActive = true;
    this.cdr.detectChanges();
  }

  onMouseLeave() {
    this.torchActive = false;
    this.torchStyle = 'background: radial-gradient(circle 0px at 50% 50%, transparent 0%, #05080f 1%)';
    this.cdr.detectChanges();
  }

  onMouseMove(event: MouseEvent) {
    const el = (event.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    this.torchStyle = `background: radial-gradient(circle 130px at ${x} ${y}, transparent 0%, transparent 55%, #05080f 100%)`;
    this.cdr.detectChanges();
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    const touch = event.touches[0];
    const el = (event.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const y = ((touch.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    this.torchStyle = `background: radial-gradient(circle 100px at ${x} ${y}, transparent 0%, transparent 55%, #05080f 100%)`;
    this.cdr.detectChanges();
  }

  // ── GLITCH REVEAL ──
  startGlitch() {
    this.glitchStep = 0;
    this.cdr.detectChanges();
    [800, 1600, 2600].forEach((delay, i) => {
      const t = setTimeout(() => {
        this.glitchStep = i + 1;
        this.cdr.detectChanges();
      }, delay);
      this.timers.push(t);
    });
  }
}
