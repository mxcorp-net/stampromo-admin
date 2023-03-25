import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreService} from '../../services/core.service';
import '../../_helper/string.extensions';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
    @Input() source: DatatableSource;
    @Input() settings: DatatableSettings = new DatatableSettings();
    @Input() title = '';
    @Input() isLoading = false;

    @Output() onRowClick = new EventEmitter<any>();
    @Output() onNewClick = new EventEmitter<any>();

    searchValue = '';
    errorMessage: string;
    showMessage = false;

    constructor() {
    }

    ngOnInit() {
        if (this.source.Service) {
            this.fetch({words: ["*"]});
        }
    }

    fetch(query: {}) {
        this.isLoading = true;
        this.showMessage = false;
        this.source.Service.where(query).subscribe(
            data => {
                this.source.Rows = data;
            }, error => {
                this.errorMessage = error;
                this.isLoading = false;
                this.showMessage = true;
            },
            () => {
                this.isLoading = false;
            });
    }

    formatDate(date: any): string {
        return '';
    }

    search(event: string) {
        this.searchValue = event || '';
        this.fetch({Text: this.searchValue, words: this.searchValue.split(' ')});
    }

    rowClick(row: any) {
        this.onRowClick.emit(row);
    }

    newClick(event: MouseEvent) {
        this.onNewClick.emit(event);
    }

    reloadTable() {
        this.search(this.searchValue);
    }
}

export class DatatableSource {
    TotalPages: number;
    CurrentPage: number;
    Limit = 50;
    Columns: DatatableColumn[];
    Rows: any[];
    Service?: CoreService;
}

export class DatatableSettings {
    ActiveSearch = false;
    Type = SourceType.Local;
}

export enum SourceType {
    Local,
    Service
}

export class DatatableColumn {
    name: string;
    label: string;
    align = 'left';
    type: DatatableColumnType = DatatableColumnType.string;
}

export enum DatatableColumnType {
    string,
    int,
    image,
    date,
    icon,
}
