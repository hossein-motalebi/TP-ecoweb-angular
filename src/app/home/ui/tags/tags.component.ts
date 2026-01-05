import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
  inject,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { HomeStore } from '../../home.store';

@Component({
    selector: 'app-tags',
    imports: [NgFor],
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit, OnDestroy, AfterViewChecked {
  readonly #homeStore = inject(HomeStore);
  readonly #elementRef = inject(ElementRef);
  readonly tags = this.#homeStore.selectors.tags;
  @Output() selectTag = new EventEmitter<string>();
  #refreshInterval: any;

  ngOnInit(): void {
    this.#homeStore.getTags();
    this.#refreshInterval = setInterval(() => {
      this.#homeStore.getTags();
    }, 5000);
  }

  ngAfterViewChecked(): void {
    const tagElements = this.#elementRef.nativeElement.querySelectorAll('.tag-default');
    tagElements.forEach((el: HTMLElement) => {
      el.style.color = el.style.color || 'white';
      el.setAttribute('data-processed', Date.now().toString());
      el.innerHTML = el.innerHTML;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.#refreshInterval);
  }

  onTagClick(tag: string): void {
    this.#homeStore.getTags();
    this.selectTag.emit(tag);
  }
}
