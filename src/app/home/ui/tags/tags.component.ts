import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { HomeStore } from '../../home.store';

@Component({
    selector: 'app-tags',
    imports: [NgFor],
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit, OnDestroy {
  readonly #homeStore = inject(HomeStore);
  readonly tags = this.#homeStore.selectors.tags;
  @Output() selectTag = new EventEmitter<string>();
  #refreshInterval: any;

  ngOnInit(): void {
    this.#homeStore.getTags();
    this.#refreshInterval = setInterval(() => {
      this.#homeStore.getTags();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.#refreshInterval);
  }

  onTagClick(tag: string): void {
    this.#homeStore.getTags();
    this.selectTag.emit(tag);
  }
}
